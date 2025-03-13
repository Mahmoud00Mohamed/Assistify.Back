// config/env.js
import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;
export const PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH;
export const PUBLIC_KEY_PATH = process.env.PUBLIC_KEY_PATH;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const REDIS_URL = process.env.REDIS_URL;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 5000;
