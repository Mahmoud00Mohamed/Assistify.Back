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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // 👤 إنشاء مستخدم جديد إذا لم يكن موجودًا
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName || "",
            email: profile.emails[0].value,
            isVerified: true,
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
/**
 * توليد Access Token صالح لـ 30 دقائق
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, privateKey, {
    algorithm: "RS256",
    expiresIn: "30m",
  });
};

/**
 * توليد Refresh Token صالح لـ 24 ساعة
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, privateKey, {
    algorithm: "RS256",
    expiresIn: "30d",
  });
};

/**
 * التحقق من صحة التوكن
 */
export const verifyToken = (token) => {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};

/**
 * تشفير كلمة المرور باستخدام Argon2
 */
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

/**
 * التحقق من كلمة المرور
 */
export const verifyPassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

export default passport;
