import nodemailer from 'nodemailer';
import axios from 'axios';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'jaisharma572007@gmail.com', pass: 'skiyuiixdnvbcech' }
});

export const sendAllOTP = async (target, type) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    // 1. Unlimited Email
    await transporter.sendMail({
      from: 'PathshalaX',
      to: target,
      subject: 'Login OTP: ' + otp,
      text: 'Aapka PathshalaX login code hai: ' + otp
    });
    // 2. Phone SMS (Textbelt)
    await axios.post('https://textbelt.com/text', {
      phone: target,
      message: 'PathshalaX OTP: ' + otp,
      key: 'textbelt'
    });
    return { status: "sent", code: otp };
  } catch (e) { return { status: "failed" }; }
};
