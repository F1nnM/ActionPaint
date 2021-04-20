//===========================================
// Send mail
//===========================================

const nodemailer = require("nodemailer");

async function message(replyTo, senderName, message) {
  if (!(replyTo && senderName && message))
    throw "Missing field";


  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // send mail with defined transport object
  await transporter
    .sendMail({
      from: '"ActionPaint Contact Form" <actionpaint@mfinn.de>', // sender address
      to: process.env.MAIL_RECEIVER, // list of receivers
      subject: "ActionPaint Message", // Subject line
      text: message, // plain text body,
      replyTo: `"${senderName}" <${replyTo}>`,
    })
}

exports.sendMail = message;


//===========================================
// manage content files
//===========================================

var content = {}

var normalizedPath = require("path").join(__dirname, "content");
const fs = require("fs");
const { exception } = require("console");
function load_content() {
  fs.readdirSync(normalizedPath).forEach(function (file) {
    content[file.split(".")[0]] = require("./content/" + file);
  });
}

exports.content = { content, update: load_content, init: load_content };

