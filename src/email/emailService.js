import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({ email, verificationCode }) => {
  const confirmationUrl = `http://localhost:3000/users/email-confirmation/${verificationCode}`;
  const message = {
    to: email,
    from: "RegisterEmail@Mule.com",
    subject: "Confirma tú correo electronico",
    templateId: "d-55f63bc38cac4d7dab55018d3b9dfa25",
    dynamicTemplateData: {
      confirmationUrl: confirmationUrl,
      email: email,
    },
  };
  try {
    await sgMail.send(message);
    console.log("Confirmation email sent");
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.body);
    } else {
      console.error("Error sending confirmation email:", error);
    }
    throw new Error("Error sending confirmation email");
  }
};

export { sendConfirmationEmail };