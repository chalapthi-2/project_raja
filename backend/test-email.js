import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function testEmail() {
  console.log('Attempting to connect to Gmail...');
  try {
    const info = await transporter.sendMail({
      from: `"RV SplashX" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email Verification',
      text: 'If you are reading this, the Gmail App Password works perfectly!',
    });
    console.log('SUCCESS! Email sent: ' + info.response);
  } catch (error) {
    console.error('FAILED! Error details:', error);
  }
}

testEmail();
