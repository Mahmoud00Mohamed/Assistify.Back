import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js"; // استيراد نموذج المستخدم
import redisClient from "../config/redisClient.js"; // استيراد Redis

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://c0af-156-198-231-156.ngrok-free.app/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            isVerified: true, // تم التحقق من الحساب تلقائيًا
          });
          await user.save();
        }

        // حفظ بيانات الجلسة في Redis
        await redisClient.set(`session:${user.id}`, JSON.stringify(user), {
          EX: 60 * 60 * 24, // 24 ساعة
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// تسلسل المستخدم لجلسات Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await redisClient.get(`session:${id}`);
    done(null, user ? JSON.parse(user) : null);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
