const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config()

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI // This should be the URI used in OAuth Playground
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = async () => {
  try {
    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
};

const createTransporter = async () => {
  const accessTokenValue = await accessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessTokenValue,
    },
  });

  return transporter;
};

const sendEmail = async (to, subject, text) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
