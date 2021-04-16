const nodemailer = require("nodemailer");

async function message(req, res) {

  if (!(req.body.email && req.body.name && req.body.message)){
    res.status(400).send("Missing field");
    return;
  }


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
  await transporter.sendMail({
    from: '"ActionPaint Contact Form" <actionpaint@mfinn.de>', // sender address
    to: process.env.MAIL_USER, // list of receivers
    subject: "ActionPaint Message", // Subject line
    text: req.body.message, // plain text body,
    replyTo: `"${req.body.name}" <${req.body.email}>`
  }).catch(err => {
    res.status(500).send("Error:\n"+err);
  });

  res.status(200).send("Message sent successfully!");
}


exports.public_actions = {
  'message': message
}

exports.private_actions = {}
