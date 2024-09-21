const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  // port:465,
  auth: {
    user: process.env.SENDER_EMAIL, // Your Gmail address
    pass: process.env.SENDER_PASSWORD, // Your Gmail password or app-specific password
  },
});

module.exports = {transporter}