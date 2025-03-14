// config/auth.js
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import argon2 from "argon2";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.join(__dirname, "../keys/private.pem"),
  "utf8"
);
export const publicKey = fs.readFileSync(
  path.join(__dirname, "../keys/public.pem"),
  "utf8"
);

// إعداد استراتيجية Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // أضف Client ID في .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // أضف Client Secret في .env
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`, // URL رد الاتصال
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // البحث عن المستخدم باستخدام البريد الإلكتروني
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // إذا لم يكن موجودًا، أنشئ مستخدمًا جديدًا
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: await hashPassword(
              crypto.randomBytes(16).toString("hex")
            ), // كلمة مرور عشوائية
            isVerified: true, // التحقق تلقائيًا لأن Google يثبت البريد
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// تسلسل/فك تسلسل المستخدم لـ Passport
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, privateKey, {
    algorithm: "RS256",
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, privateKey, {
    algorithm: "RS256",
    expiresIn: "30d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};

export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

export default passport; // تصدير Passport لاستخدامه في ملفات أخرى
