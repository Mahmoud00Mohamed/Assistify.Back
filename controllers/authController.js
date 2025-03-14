// controllers/authController.js
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyPassword,
  publicKey,
} from "../config/auth.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verifyCaptcha } from "../utils/captchaUtils.js";
import redis from "../config/redisClient.js";
import passport from "passport";

dotenv.config();

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, captchaToken } = req.body;
  if (!(await verifyCaptcha(captchaToken))) {
    return res.status(400).json({ message: "❌ CAPTCHA verification failed." });
  }
  try {
    const verificationCode = crypto.randomBytes(3).toString("hex");
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      verificationCode: await hashPassword(verificationCode),
    });
    await user.save();
    await sendEmail({
      to: email,
      subject: "✅ Email Confirmation",
      type: "emailConfirmation",
      data: { code: verificationCode },
    });

    res.status(201).json({
      message: "📩 Account created. Please check your email to verify.",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const login = async (req, res) => {
  const { email, password, captchaToken } = req.body;
  if (!(await verifyCaptcha(captchaToken))) {
    return res.status(400).json({ message: "❌ CAPTCHA verification failed." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(400).json({ message: "❌ Invalid login credentials." });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "⚠️ Account not verified." });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    await redis.set(
      `refreshToken:${user._id}`,
      refreshToken,
      "EX",
      30 * 24 * 60 * 60
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: !0,
      secure: !0,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email });
    if (
      !user ||
      !(await verifyPassword(verificationCode, user.verificationCode))
    ) {
      return res.status(400).json({ message: "❌ Invalid verification code." });
    }
    user.isVerified = !0;
    user.verificationCode = undefined;
    await user.save();
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    await redis.set(
      `refreshToken:${user._id}`,
      refreshToken,
      "EX",
      30 * 24 * 60 * 60
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: !0,
      secure: !0,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "✅ Email successfully verified.",
      accessToken,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "❌ User not found." });
    }
    const resetToken = generateAccessToken(user._id);
    await redis.set(`resetPassword:${user._id}`, resetToken, "EX", 10 * 60);
    const resetLink = `${process.env.FRONTEND_URL}frontend/authentication/reset-password.html?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "🔒 Password Reset",
      type: "passwordReset",
      data: { resetLink },
    });

    res.status(200).json({ message: "✅ Reset link sent successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const userId = jwt.decode(token)?.userId;
    const storedToken = await redis.get(`resetPassword:${userId}`);
    if (!storedToken || storedToken !== token) {
      return res
        .status(400)
        .json({ message: "❌ The link is invalid or has expired." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "❌ User not found." });
    }
    user.password = await hashPassword(newPassword);
    await user.save();
    await redis.del(`resetPassword:${userId}`);
    res.status(200).json({ message: "✅ Password changed successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const logout = async (req, res) => {
  try {
    console.log("🔄 [SERVER] User logging out...");
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "⚠️ No Refresh Token found." });
    }
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, publicKey, { algorithms: ["RS256"] });
    } catch (err) {
      return res.status(401).json({ message: "❌ Invalid Refresh Token." });
    }
    await redis.del(`refreshToken:${decoded.userId}`);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "✅ Logged out successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "❌ Internal server error." });
  }
};

export const resendCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationCode = await hashPassword(verificationCode);
    await user.save();
    await sendEmail({
      to: email,
      subject: "📧 Email Verification",
      type: "emailVerification",
      data: { code: verificationCode },
    });

    res.status(200).json({ message: "Verification code resent." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const refreshAccessToken = async (req, res) => {
  try {
    console.log("🔄 [SERVER] Access Token refresh request...");
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "⚠️ Refresh Token is required." });
    }
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, publicKey, { algorithms: ["RS256"] });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "❌ Invalid or expired Refresh Token." });
    }
    const storedToken = await redis.get(`refreshToken:${decoded.userId}`);
    if (!storedToken || storedToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "❌ Invalid or expired Refresh Token." });
    }
    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);
    await redis.set(
      `refreshToken:${decoded.userId}`,
      newRefreshToken,
      "EX",
      30 * 24 * 60 * 60
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(500).json({ message: "❌ Internal server error." });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username, userId } = req.query;
    console.log(`🔍 Checking username: ${username}`);
    console.log(`🔍 User ID: ${userId}`);
    await User.isValidUsername(username);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`🔍 User found in database: ${existingUser._id}`);
      if (existingUser._id.toString() === String(userId)) {
        console.log("✅ Username belongs to the same user.");
        return res.status(200).json({
          available: true,
          message: "✅ Username is available for you.",
        });
      }
      return res
        .status(200)
        .json({ available: false, message: "❌ Username is already taken." });
    }
    return res
      .status(200)
      .json({ available: true, message: "✅ Username is available." });
  } catch (error) {
    console.error(`❌ Error checking username: ${error.message}`);
    return res.status(error.status || 500).json({
      available: false,
      message: `❌ ${error.message || "Internal server error."}`,
    });
  }
};

/**
 * توجيه المستخدم إلى تسجيل الدخول عبر جوجل
 */
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

/**
 * استقبال بيانات المستخدم بعد تسجيل الدخول بجوجل
 */
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err || !user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
      );
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await redis.set(
      `refreshToken:${user._id}`,
      refreshToken,
      "EX",
      30 * 24 * 60 * 60
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${accessToken}`
    );
  })(req, res, next);
};
