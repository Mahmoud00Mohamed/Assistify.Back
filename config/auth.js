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
import redis from "../config/redisClient.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName || "",
            email: profile.emails[0].value,
            isVerified: true, // ✅ المستخدم موثوق لأنه سجل باستخدام Google
          });
          await user.save();
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await redis.set(
          `refreshToken:${user._id}`,
          refreshToken,
          "EX",
          30 * 24 * 60 * 60
        );

        return done(null, { user, accessToken, refreshToken });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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
