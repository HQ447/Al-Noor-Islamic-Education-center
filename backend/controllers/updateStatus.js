import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { teacherId } = req.params;

  try {
    const student = await User.findById(id);
    const teacher = await User.findById(teacherId);
    if (!student) return res.json({ message: "Student not found" });
    if (!teacher) return res.json({ message: "Teacher not found" });

    student.status = "registered";
    student.teacherId = teacherId;
    student.teacherName = teacher.name;
    await student.save();

    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Registration Approved - Al Noor Islamic Education Center</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <!-- Preheader Text (Hidden but shown in email preview) -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Congratulations! Your registration has been approved. Your instructor is ${
      teacher.name
    }. Contact them at ${teacher.whatsapp}.
  </div>
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #004425; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Al Noor Islamic Education Center</h1>
              <p style="margin: 5px 0 0; font-size: 14px;">www.alnooredu.online</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Congratulations ${
                student.name
              } 🎉</h2>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0 0 15px 0;">
                We have reviewed your registration application.
              </p>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0;">
                After careful consideration, we have approved your registration request. Your instructor is <strong>${
                  teacher.name
                }</strong>. You can contact with your instructor on WhatsApp: <a href="https://wa.me/${
      teacher.whatsapp
    }?text=Assalam O Alikum! This is regarding your Quran classes." target="_blank" style="color: #004425; text-decoration: underline;">${
      teacher.whatsapp
    }</a>
              </p>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 15px 0 0 0;">
                Happy Learning! Thank you for joining Al Noor Islamic Education Center.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
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
    const emailHTML2 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Student Assigned - Al Noor Islamic Education Center</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <!-- Preheader Text (Hidden but shown in email preview) -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    A new student ${student.name} has been assigned to you for ${
      student.course
    }. Contact: ${student.whatsapp}
  </div>
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #004225; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Al Noor Islamic Education Center</h1>
              <p style="margin: 5px 0 0; font-size: 14px;">www.alnooredu.online</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Assalamualaikum ${
                teacher.name
              } 🎉</h2>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0 0 15px 0;">
                We have assigned a new student to you for the course <strong>${
                  student.course
                }</strong>.
              </p>
              <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0;">
                Student name: <strong>${student.name}</strong><br/>
                Student email: <strong>${student.email}</strong><br/>
                You can contact your student on WhatsApp: <a href="https://wa.me/${
                  student.whatsapp
                }?text=Assalam O Alikum! This is regarding your Quran classes." target="_blank" style="color: #004425; text-decoration: underline;">${
      student.whatsapp
    }</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
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

    await sendEmail(student.email, "Registration Successfull", emailHTML);
    await sendEmail(
      teacher.email,
      "New Student Registration Approved",
      emailHTML2
    );
    res.json({ message: "Student approved by Admin" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default updateStatus;
