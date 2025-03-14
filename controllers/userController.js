// controllers/userController.js

import User from "../models/User.js";
import argon2 from "argon2";
import sendEmail from "../utils/sendEmail.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const updateUser = async (req, res) => {
  const { firstName, lastName, username } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username && username !== user.username) {
      try {
        await User.isValidUsername(username);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
      user.username = username;
    }
    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;
    res
      .status(200)
      .json({ message: "User updated successfully.", user: userResponse });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.profilePicture) {
      const oldImagePath = path.join(__dirname, "../", user.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        return res
          .status(400)
          .json({ message: "Only image files are allowed." });
      }
      user.profilePicture = req.file.path.replace(/\\/g, "/");
      await user.save();
      res.status(200).json({
        message: "Profile picture uploaded successfully.",
        profilePicture: user.profilePicture,
      });
    } else {
      res.status(400).json({ message: "No file uploaded." });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error uploading profile picture.",
      error: err.message,
    });
  }
};
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }
    const isMatch = await argon2.verify(user.password, oldPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "The old password is incorrect." });
    }
    user.password = await argon2.hash(newPassword);
    await user.save();
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("❌ Error updating password:", err);
    res.status(500).json({
      error:
        "An unexpected error occurred while updating the password. Please try again later.",
    });
  }
};
export const requestEmailUpdate = async (req, res) => {
  const { newEmail } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!newEmail || newEmail === user.email) {
      return res.status(400).json({ message: "Invalid new email." });
    }
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }
    const attemptDelays = [0, 60, 60, 900, 3600];
    const maxAttempts = attemptDelays.length;
    const now = new Date();
    if (user.lastEmailRequestTime) {
      const lastAttemptTime = new Date(user.lastEmailRequestTime);
      const attempts = user.emailRequestAttempts;
      const delay = attemptDelays[Math.min(attempts, maxAttempts - 1)] * 1000;
      if (now - lastAttemptTime < delay) {
        const remainingTime = Math.ceil(
          (delay - (now - lastAttemptTime)) / 1000
        );
        return res.status(429).json({
          message: `Please wait ${remainingTime} seconds before trying again.`,
        });
      }
    }
    user.emailVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.newEmail = newEmail;
    user.emailRequestAttempts = Math.min(
      user.emailRequestAttempts + 1,
      maxAttempts
    );
    user.lastEmailRequestTime = now;
    await user.save();
    await sendEmail({
      to: newEmail,
      subject: "🔄 Email Update",
      type: "emailUpdate",
      data: { code: user.emailVerificationCode },
    });

    res.status(200).json({
      message: "The verification code has been sent to the new email.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const verifyEmailUpdate = async (req, res) => {
  const { verificationCode, password } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.newEmail) {
      return res.status(400).json({ message: "No email update requested." });
    }
    if (user.emailVerificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }
    user.email = user.newEmail;
    user.newEmail = undefined;
    user.emailVerificationCode = undefined;
    await user.save();
    res.status(200).json({ message: "Email updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password, confirmation } = req.body;

    if (confirmation !== "DELETE") {
      return res
        .status(400)
        .json({ message: "❌ You must type 'DELETE' to confirm." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found." });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "❌ Incorrect password." });
    }

    // 🗑️ حذف جميع البيانات المرتبطة بالمستخدم
    await Task.deleteMany({
      $or: [{ user: userId }, { createdBy: userId }, { assignedTo: userId }],
    });
    await Project.deleteMany({ user: userId });
    await TokenBlacklist.deleteMany({ user: userId });

    // 🖼️ حذف صورة الملف الشخصي إذا كانت موجودة
    if (user.profilePicture) {
      const profilePicPath = path.join("/backend/uploads", user.profilePicture);
      if (fs.existsSync(profilePicPath)) {
        fs.unlinkSync(profilePicPath);
      }
    }

    // 🗑️ حذف الحساب من قاعدة البيانات
    await User.findByIdAndDelete(userId);

    // 🧹 مسح جميع الكوكيز
    Object.keys(req.cookies).forEach((cookieName) => {
      res.clearCookie(cookieName, {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
    });

    // 🧹 إجبار المتصفح على مسح الكوكيز
    res.setHeader("Set-Cookie", [
      "sessionToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ]);

    res.json({
      message:
        "✅ Account and all associated data have been successfully deleted.",
    });
  } catch (error) {
    console.error("🚨 Error while deleting account:", error);
    res
      .status(500)
      .json({ message: "❌ An error occurred while deleting the account." });
  }
};
