import User from "../models/User.js";
// controllers/authController.js
import sendEmail from "../utils/sendEmail.js";

const registerStudent = async (req, res) => {
  try {
    const { name, email, whatsapp, country, course, joinDate, teacherId } =
      req.body;

    // Basic validation
    if (!name || !email || !course) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check for duplicate email
    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const findTeacher = await User.findById(teacherId);

    if (!findTeacher) return res.json("Teacher Not found");

    const teacherName = findTeacher.name;

    const newStudent = new User({
      name,
      email,
      whatsapp,
      teacherId,
      teacherName,
      country,
      course,
      joinDate,
      role: "student",
    });

    await newStudent.save();

    const emailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #004225; color: #ffffff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Al Noor Islamic Education Center</h1>
      <p style="margin: 5px 0 0; font-size: 14px;">Distance Learning Platform</p>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <h2 style="color: #333;">Hi ${name},</h2>
      <p style="font-size: 16px; color: #555;">
        Your registration application has been submitted with our instructor <span style="font-weight:bold;">${teacherName}</span>.
      </p>
      <p style="font-size: 16px; color: #555;">
        We will inform you once it is approved by an instructor. Thank you for joining Noor Islamic Center.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      &copy; ${new Date().getFullYear()} Noor Islamic Center. All rights reserved.
    </div>
  </div>
`;
console.log("Sending registration email to:", email);
await sendEmail(email, "Request For Registration", emailHTML);
console.log("Registration email sent");

    res.status(201).json({
      message: "Student registered successfully.",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default registerStudent;
