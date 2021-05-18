//===========================================
// Send mail
//===========================================

const nodemailer = require("nodemailer");

async function message(replyTo, senderName, message) {
  if (!(replyTo && senderName && message)) throw "Missing field";

  const config = JSON.parse(fs.readFileSync("./mail.json"));

  let transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    secure: config.mailSecure,
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"ActionPaint Contact Form" <actionpaint@mfinn.de>', // sender address
    to: config.mailReceiver, // list of receivers
    subject: "ActionPaint Message", // Subject line
    text: message, // plain text body,
    replyTo: `"${senderName}" <${replyTo}>`,
  });
}

exports.sendMail = message;

//===========================================
// manage content files
//===========================================

var normalizedPath = require("path").join(__dirname, "content");
const fs = require("fs");
function load_content() {
  var content = {};
  fs.readdirSync(normalizedPath).forEach(function (file) {
    content[file.split(".")[0]] = JSON.parse(
      fs.readFileSync("./content/" + file)
    );
  });
  return content;
}

exports.load_content = load_content;
