// config/auth.js
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import argon2 from "argon2";

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
