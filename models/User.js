// models / user.js
import mongoose from "mongoose";
import argon2 from "argon2";
import validator from "validator";
import Task from "./Task.js";
import Project from "./Project.js";
// 🛡️ تعريف مخطط المستخدم
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: { type: String, required: true },
    username: { type: String, unique: true, trim: true, maxlength: 30 },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    profilePicture: { type: String, default: "" },
    newEmail: { type: String, unique: true, sparse: true },
    emailVerificationCode: { type: String },
    refreshToken: { type: String },
    // ✅ الحقول الجديدة لإدارة تأخير طلبات تغيير البريد الإلكتروني
    emailRequestAttempts: { type: Number, default: 0 }, // عدد المحاولات
    lastEmailRequestTime: { type: Date }, // آخر وقت لطلب تغيير البريد
    // حقل جديد لـ Google
    googleId: { type: String, unique: true, sparse: true }, // معرف Google الفريد
  },
  { timestamps: true }
);
// 🛡️ Validate username
UserSchema.statics.isValidUsername = async function (username, userId = null) {
  if (username.length < 6)
    throw new Error("❌ Username must be at least 6 characters long.");
  if (username.length > 30)
    throw new Error("❌ Username must be 30 characters or fewer.");
  if (/\s/.test(username))
    throw new Error("❌ Spaces are not allowed in the username.");
  if (!/^[a-zA-Z0-9._-]+$/.test(username))
    throw new Error(
      "❌ Only English letters, numbers, dots (.), and hyphens (-, _) are allowed."
    );
  if (!/[a-zA-Z]/.test(username))
    throw new Error("❌ Username must contain at least two English letters.");

  // Prevent non-English characters (including Arabic)
  if (/[^a-zA-Z0-9._-]/.test(username))
    throw new Error("❌ Only English letters are allowed.");

  const existingUser = await this.findOne({ username });
  if (existingUser && (!userId || existingUser._id.toString() !== userId)) {
    throw new Error("❌ Username is already taken.");
  }

  return true;
};

// 🛡️ تحويل الحروف العربية إلى لاتينية
const arabicToEnglishMap = {
  أ: "a",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "dh",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
  ء: "a",
  ئ: "y",
  ؤ: "w",
  ى: "a",
  ة: "h",
};

const transliterateArabic = (text) =>
  text
    .split("")
    .map((char) => arabicToEnglishMap[char] || char)
    .join("");

// 🛡️ التحقق من قوة كلمة المرور
const isStrongPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );

// 🛡️ قبل حفظ المستخدم - تشفير كلمة المرور وإنشاء اسم المستخدم تلقائيًا
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && !this.password.startsWith("$argon2id$")) {
    this.password = await argon2.hash(this.password);
  }

  if (!this.username) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    let firstName = this.firstName.replace(/\s+/g, "");
    let lastName = this.lastName.replace(/\s+/g, "");

    if (/[\u0600-\u06FF]/.test(firstName))
      firstName = transliterateArabic(firstName);
    if (/[\u0600-\u06FF]/.test(lastName))
      lastName = transliterateArabic(lastName);

    firstName = firstName.slice(0, 9);
    lastName = lastName.slice(0, 5);

    let generatedUsername = `${firstName}.${lastName}.${randomNum}`;
    while (
      await mongoose.models.User.findOne({ username: generatedUsername })
    ) {
      generatedUsername = `${firstName}.${lastName}.${Math.floor(
        1000 + Math.random() * 9000
      )}`;
    }

    this.username = generatedUsername;
  }

  next();
}); // ✅ حذف جميع المهام والمشاريع المرتبطة قبل حذف المستخدم
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const userId = this._id;

    try {
      // حذف جميع المهام المرتبطة بالمستخدم
      await Task.deleteMany({ user: userId });

      // حذف جميع المشاريع المرتبطة بالمستخدم
      await Project.deleteMany({ user: userId });

      next(); // استكمال الحذف
    } catch (error) {
      next(error);
    }
  }
);

// 🛡️ مقارنة كلمة المرور باستخدام Argon2
UserSchema.methods.comparePassword = function (password) {
  return argon2.verify(this.password, password);
};

// 🛡️ التحقق من وجود البريد الإلكتروني أو اسم المستخدم
UserSchema.statics.emailExists = function (email) {
  return this.exists({ email: email.toLowerCase() });
};

UserSchema.statics.usernameExists = function (username) {
  return this.exists({ username });
};

// 🛡️ إنشاء نموذج المستخدم وتصديره
const User = mongoose.model("User", UserSchema);
export default User;
