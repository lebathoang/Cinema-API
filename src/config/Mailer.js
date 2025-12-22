const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hoanglb2k3@gmail.com",
    pass: "qijr cesg qxiy lwlz",
  },
});

module.exports = transporter;
