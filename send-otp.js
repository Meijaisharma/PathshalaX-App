const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'jaisharma572007@gmail.com', pass: 'skiyuiixdnvbcech' }
});

const http = require('http');
http.createServer((req, res) => {
  res.write('PathshalaX Backend Live');
  res.end();
}).listen(process.env.PORT || 3000);

window.sendPathshalaOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Dynamic 6-digit OTP
  try {
    await transporter.sendMail({
      from: '"PathshalaX" <jaisharma572007@gmail.com>',
      to: email,
      subject: "Login Code: " + otp,
      text: "Aapka 6-digit dynamic OTP hai: " + otp
    });
    return true;
  } catch (err) { return false; }
};
