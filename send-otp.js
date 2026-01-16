import nodemailer from 'nodemailer';
import axios from 'axios';
import http from 'http';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: 'jaisharma572007@gmail.com', 
    pass: 'skiyuiixdnvbcech' 
  }
});

// Render ko active rakhne ke liye server
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('PathshalaX Multi-Channel OTP Live');
  res.end();
}).listen(process.env.PORT || 3000);

export const sendPathshalaOTP = async (email, phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  
  try {
    // 1. Unlimited Email OTP
    await transporter.sendMail({
      from: '"PathshalaX" <jaisharma572007@gmail.com>',
      to: email,
      subject: "Your OTP: " + otp,
      text: "PathshalaX login code: " + otp
    });

    // 2. Phone SMS OTP (Textbelt Free API)
    if (phone) {
      await axios.post('https://textbelt.com/text', {
        phone: phone,
        message: 'PathshalaX OTP: ' + otp,
        key: 'textbelt'
      });
    }
    
    return { success: True, code: otp };
  } catch (err) {
    return { success: False };
  }
};
