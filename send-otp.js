const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'jaisharma572007@gmail.com', pass: 'skiyuiixdnvbcech' }
});

window.sendPathshalaOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Har baar naya code
  try {
    await transporter.sendMail({
      from: '"PathshalaX" <jaisharma572007@gmail.com>',
      to: email,
      subject: "PathshalaX Login Code: " + otp,
      text: "Aapka 6-digit verification code hai: " + otp
    });
    return true;
  } catch (err) { return false; }
};
