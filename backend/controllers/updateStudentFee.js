import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const updateStudentFee = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { days } = req.body;

    // validation
    if (!days || days <= 0) {
      return res.status(400).json({
        message: "Please provide valid number of days",
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const today = new Date();
    const feeEndDate = new Date(today);
    feeEndDate.setDate(feeEndDate.getDate() + Number(days));

    student.feeEndDate = feeEndDate;
    student.feeDays = days;
    await student.save();

    const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Fee Status Cleared - Al Noor Islamic Education Center</title>
      <!--[if mso]>
      <style type="text/css">
        body, table, td {font-family: Arial, sans-serif !important;}
      </style>
      <![endif]-->
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      <!-- Preheader Text (Hidden but shown in email preview) -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Thanyou! we received your fee payment for ${days} days.
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
                  <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Thank you ${
                    student.name
                  } 🎉</h2>
                  <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0 0 15px 0;">
                    we received your fee payment for ${days} days.
                  </p>
                  <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 0;">
                   your fee status is cleared now. your next fee payment date is ${
                     student.feeEndDate
                       ? new Date(student.feeEndDate).toLocaleDateString(
                           "en-US",
                           {
                             day: "2-digit",
                             month: "long",
                             year: "numeric",
                           }
                         )
                       : "N/A"
                   }. keep in mind that you have to pay the fee before the date.
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

    await sendEmail(student.email, "Fee Updated", emailHTML);

    res.json({
      message: "Fee updated successfully",
      studentId: student._id,
      daysAdded: days,
      feeEndDate: student.feeEndDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
