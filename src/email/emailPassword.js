import sgMail from "@sendgrid/mail";
import {generatePasswordReset} from "../utils/helperToken/jwt.js";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send password reset email
const sendPasswordResetEmail = async ({ email }) => {
  const token = generatePasswordReset(email);
  const resetUrl = `${process.env.FRONT_END_URL}/auth/reset-password?token=${token}`;
  
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Reset your password",
    templateId: "d-bdbc5b9d5db94f3c8181a90604855b55",
    dynamicTemplateData: {
      resetUrl: resetUrl,
    },
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

export { sendPasswordResetEmail };