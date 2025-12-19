import dotenv from "dotenv";
dotenv.config(); // MUST be at the top

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const data = await resend.emails.send({
      from: "Al Noor Islamic Education Center <onboarding@resend.dev>",
      to,
      subject,
      html: htmlContent,
    });
    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
