// controllers/authController.js
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    const emailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #004225; color: #ffffff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Al Noor Islamic Education Center</h1>
      <p style="margin: 5px 0 0; font-size: 14px;">alnooredu.online</p>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <h2 style="color: #333;">Hi ${user.name},</h2>
      <p style="font-size: 14px; color: #555;">
       Your password reset OTP is <span style="font-size:20px; font-weight:bold">${otp}</span>
      </p>
      <p style="font-size: 14px; color: #555;">
        Please keep Your OTP secret this will automatically expire in 5 minutes.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      &copy; ${new Date().getFullYear()} alnooredu.online All rights reserved.
    </div>
  </div>
`;

    await sendEmail(user.email, "Password Reset Request", emailHTML);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
