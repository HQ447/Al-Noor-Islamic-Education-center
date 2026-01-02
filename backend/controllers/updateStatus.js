import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const updateStatus = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const student = await User.findById(id);
    if (!student) return res.json({ message: "Student not found" });

    student.status = "registered";
    await student.save();

    const emailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #004225; color: #ffffff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Al Noor Islamic Education Center</h1>
      <p style="margin: 5px 0 0; font-size: 14px;">Distance Learning Platform</p>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <h2 style="color: #333;">Congratulaion ${student.name} 🎉,</h2>
      <p style="font-size: 14px; color: #555;">
        We Review Your Registration Application
      </p>
      <p style="font-size: 14px; color: #555;">
       After carefull consideration , Our Instructor successfully Approved Your Registration. Happy Learning. Thank you for joining Al Noor Islamic Education Center.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      &copy; ${new Date().getFullYear()} Al Noor Islamic Education Center. All rights reserved.
    </div>
  </div>
`;

    await sendEmail(student.email, "Registration Successfull", emailHTML);

    res.json({ message: "Student approved by Admin" });
  } catch (error) {
    console.log(error);
  }
};

export default updateStatus;
