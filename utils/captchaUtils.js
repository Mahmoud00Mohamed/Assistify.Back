// captchaUtils.js
import axios from "axios";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // مفتاحك السري من Google reCAPTCHA
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/**
 * ✅ التحقق من صحة كود CAPTCHA
 * @param {string} captchaToken - رمز التحقق من المستخدم
 * @returns {Promise<boolean>} - إرجاع true إذا كان التحقق ناجحًا، وإلا false
 */
export const verifyCaptcha = async (captchaToken) => {
  try {
    const response = await axios.post(RECAPTCHA_VERIFY_URL, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: captchaToken,
      },
    });

    const { success } = response.data;
    return Boolean(success); // يضمن أن القيمة المرجعة دائمًا true أو false
  } catch (error) {
    console.error("❌ خطأ في التحقق من CAPTCHA:", error.message);
    return false;
  }
};
