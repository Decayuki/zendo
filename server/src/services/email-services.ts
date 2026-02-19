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
export const sendMail = async (mail: string, token: string) => {
  // Send an email using async/await
  const info = await transporter.sendMail({
    from: '"Zendo" <ima.zieme@ethereal.email>',
    to: { mail },
    subject: "Réinitialiser votre mot de passe",
    text: `Cliquer sur ce lien pour réinitialiser le mot de passe : http://localhost:3000/reset?token=${token}`, // Plain-text version of the message
    html: `<b>Cliquer sur ce lien pour réinitialiser le mot de passe : http://localhost:3000/reset?token=${token}</b>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
