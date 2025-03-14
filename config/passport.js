import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import { hashPassword } from "./auth.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Client ID من Google Cloud
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Client Secret من Google Cloud
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`, // عنوان URL لإعادة التوجيه
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // البحث عن المستخدم باستخدام البريد الإلكتروني من Google
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // إذا لم يكن المستخدم موجودًا، قم بإنشاء حساب جديد
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: await hashPassword(
              crypto.randomBytes(20).toString("hex")
            ), // كلمة مرور عشوائية
            isVerified: true, // التحقق تلقائيًا لأنه من Google
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

// تسلسل المستخدم لتخزينه في الجلسة
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// استرجاع المستخدم من الجلسة
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
