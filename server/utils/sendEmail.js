const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // We can use a dummy transport for local dev, or standard setup
    // Since we don't have real credentials, we might use a simple one
    // But let's build it so it can take credentials from .env
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  if (!process.env.SMTP_HOST || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.log("--- DEVELOPMENT EMAIL LOG ---");
    console.log("To:", options.email);
    console.log("Subject:", options.subject);
    console.log("Content:", options.html);
    console.log("-----------------------------");
    return;
  }

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
