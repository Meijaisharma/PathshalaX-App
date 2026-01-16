const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'jaisharma572007@gmail.com', pass: 'skiyuiixdnvbcech' }
});

let lastSentTime = 0;

window.sendPathshalaOTP = async (email) => {
  const currentTime = Date.now();
  // 60 seconds ka cooldown timer
  if (currentTime - lastSentTime < 60000) {
    alert("Kripya 1 minute intezar karein naya code bhejne se pehle.");
    return false;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    await transporter.sendMail({
      from: '"PathshalaX" <jaisharma572007@gmail.com>',
      to: email,
      subject: "Aapka PathshalaX OTP",
      text: "Aapka login code hai: " + otp
    });
    lastSentTime = Date.now();
    return true;
  } catch (error) {
    console.error("Mail error:", error);
    return false;
  }
};
