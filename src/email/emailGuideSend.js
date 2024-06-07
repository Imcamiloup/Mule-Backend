import sgMail from "@sendgrid/mail";
import { User } from "../database/db.js";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGuideEmail = async (id, guide_number) => {
  const userEmail = await User.findOne({ where: { id } });

  const message = {
    to: userEmail.email,
    from: process.env.EMAIL_FROM,
    subject: "Número de Guia",
    templateId: "d-0a93a66fcd0e439299b7ff008cd92944",
    dynamicTemplateData: {
      guide_number: guide_number,
    },
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

export { sendGuideEmail };
