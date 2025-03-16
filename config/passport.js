// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
import { hashPassword } from "./auth.js";
import crypto from "crypto"; // إضافة استيراد crypto

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3002/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            firstName: profile.name.givenName || "User",
            lastName: profile.name.familyName || "Google",
            email: profile.emails[0].value,
            password: await hashPassword(
              crypto.randomBytes(16).toString("hex")
            ),
            isVerified: true,
            googleId: profile.id,
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

// تحويل كائن المستخدم إلى معرف فقط في الجلسة
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// استرجاع المستخدم من المعرف
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
