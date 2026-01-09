import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const registerStudent = async (req, res) => {
  try {
    const { name, email, whatsapp, country, course, joinDate } = req.body;

    // Basic validation
    if (!name || !email || !course) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check for duplicate email
    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Find teacher
    const findTeacher = await User.findOne({
      role: "superadmin",
      designation: { $ne: "Manager" },
    });
    if (!findTeacher)
      return res.status(404).json({ message: "Teacher not found" });
    const teacherName = findTeacher.name || "Instructor";
    const teacherEmail = findTeacher.email || "";

    // Create new student
    const newStudent = new User({
      name,
      email,
      whatsapp,
      teacherName,
      country,
      course,
      joinDate,
      role: "student",
    });

    await newStudent.save();

    // Build email
    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Registration Submitted - Al Noor Islamic Education Center</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <!-- Preheader Text -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your registration application has been submitted to ${teacherName}. We will inform you once it is approved.
  </div>
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #004225; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Al Noor Islamic Education Center</h1>
              <p style="margin: 5px 0 0; font-size: 14px;">www.alnooredu.online</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Hi ${name},</h2>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0 0 15px 0;">
                Your registration application has been submitted to our superadmin <strong>${teacherName}</strong>.
              </p>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0;">
                We will inform you once it is approved by a superadmin. Thank you for joining Al Noor Islamic Education Center.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              &copy; ${new Date().getFullYear()} Al Noor Islamic Education Center. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    // Build teacher email
    const teacherEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Student Registration Request - Al Noor Islamic Education Center</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <!-- Preheader Text -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    New registration request from ${name} for ${course}. Please review in your dashboard.
  </div>
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #004225; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Al Noor Islamic Education Center</h1>
              <p style="margin: 5px 0 0; font-size: 14px;">www.alnooredu.online</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Hi ${teacherName},</h2>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0 0 15px 0;">
                Student <strong>${name}</strong> has sent a registration request. Please sign in to your dashboard and review the student request to take necessary action.
              </p>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0;">
                <strong>Student Details:</strong><br/>
                Email: ${email}<br/>
                Phone: ${whatsapp}<br/>
                Course: ${course}<br/>
                Country: ${country}<br/>
                Request Date: ${new Date().toLocaleString()}
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              &copy; ${new Date().getFullYear()} Al Noor Islamic Education Center. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send email and catch full Resend error
    try {
      const response = await sendEmail(
        email,
        "Request For Registration",
        emailHTML
      );
      const response2 = await sendEmail(
        teacherEmail,
        "Student Request For Registration",
        teacherEmailHTML
      );
    } catch (emailError) {
      console.error("Resend email failed:", emailError.response || emailError);
    }

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
