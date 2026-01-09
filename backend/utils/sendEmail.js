import dotenv from "dotenv";
dotenv.config(); // MUST be at the top

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, htmlContent) => {
  // Validate inputs
  if (!to) {
    throw new Error("Recipient email address is required");
  }
  if (!subject) {
    throw new Error("Email subject is required");
  }
  if (!htmlContent) {
    throw new Error("Email content is required");
  }

  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured in environment variables");
  }

  try {
    const data = await resend.emails.send({
      from: "Al Noor Islamic Education Center <no-reply@alnooredu.online>", 
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent successfully to:", to, "Response ID:", data?.id);
    return data;
  } catch (error) {
    // Enhanced error logging
    const errorDetails = {
      message: error?.message || "Unknown error",
      response: error?.response?.data || error?.response,
      status: error?.response?.status,
      to,
      subject,
    };
    console.error("Email sending failed - Full error details:", JSON.stringify(errorDetails, null, 2));
    throw error; // Re-throw the original error with all details
  }
};

export default sendEmail;
