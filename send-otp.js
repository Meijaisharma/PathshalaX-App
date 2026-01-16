import nodemailer from 'nodemailer';
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
  res.write('PathshalaX Backend Live');
  res.end();
}).listen(process.env.PORT || 3000);

// Global function for app
window.sendPathshalaOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit random
  try {
    await transporter.sendMail({
      from: '"PathshalaX" <jaisharma572007@gmail.com>',
      to: email,
      subject: "Verification Code: " + otp,
      text: "Aapka 6-digit login code hai: " + otp
    });
    return true;
  } catch (err) { return false; }
};
