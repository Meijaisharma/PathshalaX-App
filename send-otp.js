import nodemailer from 'nodemailer';
import axios from 'axios';
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('PathshalaX OTP Backend is Running');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: 'jaisharma572007@gmail.com', 
    pass: 'skiyuiixdnvbcech' 
  }
});

export const sendAllOTP = async (target) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    // 1. Unlimited Email OTP
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
  } catch (e) {
    return { status: "failed" };
  }
};

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is active on Render');
});
