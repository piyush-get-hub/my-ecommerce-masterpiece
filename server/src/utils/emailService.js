const nodemailer = require('nodemailer');

// 1. Create the Transporter (The Connection to Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Your 16-character App Password
  },
});

// 2. The Generic Send Function
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email failed to send:", error);
    // In your enterprise app, you could call reportError here!
  }
};

module.exports = { sendEmail };