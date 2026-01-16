const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jaisharma572007@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

async function sendOTP(userEmail) {
  const token = speakeasy.totp({ secret: 'PATHSHALAX_SECRET', encoding: 'base32' });
  const mailOptions = {
    from: 'PathshalaX <jaisharma572007@gmail.com>',
    to: userEmail,
    subject: 'Aapka PathshalaX OTP',
    text: 'Aapka login code hai: ' + token
  };
  return transporter.sendMail(mailOptions);
}
