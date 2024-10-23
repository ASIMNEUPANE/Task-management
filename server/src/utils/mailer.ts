import { createTransport } from "nodemailer";
console.log(process.env.GMAIL_USER);
console.log(process.env.GMAIL_PASS);
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const mailer = async (
  email: string,
  subject: string,
  html: string,
) => {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  });
  return info.messageId;
};
