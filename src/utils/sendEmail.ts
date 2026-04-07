import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 5000, 
});

const sendEmail = async (html: string, text: string) => {
  try {
    const info = await transporter.sendMail({

      from: `"Bloom Admin" <${process.env.EMAIL_USER}>`, 
      to: process.env.DEV_EMAIL,
      subject: "🔐 Dashboard Access Code",
      text: text,
      html: html,
    });

    return { success: info.accepted.length > 0 };
  } catch (error) {
    console.error("Mail Error:", error);
    return { success: false };
  }
};

export default sendEmail;