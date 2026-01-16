import nodemailer from 'nodemailer';
import axios from 'axios';
import http from 'http';

// Render ke liye ek active server banana zaroori hai
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
    // 1. Email OTP
    await transporter.sendMail({
      from: 'PathshalaX',
      to: target,
      subject: 'PathshalaX Login OTP: ' + otp,
      text: 'Aapka dynamic login code hai: ' + otp
    });
    // 2. Phone SMS (Textbelt)
    await axios.post('https://textbelt.com/text', {
      phone: target,
      message: 'PathshalaX OTP: ' + otp,
      key: 'textbelt'
    });
    return { status: "sent", code: otp };
  } catch (e) {
    console.error("OTP Error:", e);
    return { status: "failed" };
  }
};

// Render ka port pakadna zaroori hai taaki 'Exited early' error na aaye
server.listen(process.env.PORT || 3000, () => {
  print('Server is active on Render');
});
