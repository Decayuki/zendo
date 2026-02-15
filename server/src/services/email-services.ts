const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "ima.zieme@ethereal.email",
    pass: "JurYztVAyZETbSsHHV",
  },
});

//fonction pour envoyer un mail
export const sendMail = async (mail: string) => {
  // Send an email using async/await
  const info = await transporter.sendMail({
    from: '"Zendo" <ima.zieme@ethereal.email>',
    to: mail,
    subject: "Reinitialiser votre mot de passe",
    text: "Cliquer sur ce lien pour reinitialiser le mot de passe",
    html: "<b>Cliquer sur ce lien pour reinitialiser le mot de passe</b>",
  });

  console.log("Message sent:", info.messageId);
};
