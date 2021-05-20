//===========================================
// Send mail
//===========================================

const nodemailer = require("nodemailer");

exports.sendMail = async (replyTo, senderName, message) => {
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

//===========================================
// manage content files
//===========================================

var normalizedPath = require("path").join(__dirname, "content");
const fs = require("fs");

exports.load_content = () => {
  var content = {};
  fs.readdirSync(normalizedPath).forEach(function (file) {
    content[file.split(".")[0]] = JSON.parse(
      fs.readFileSync("./content/" + file)
    );
  });
  return content;
}

// utility function to sanitize string for html injection
exports.escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};


exports.updateContentFile = (file, content, callback) => {

  // if branding info is updated, update corresponding tags in index.html
  if (file == "brand" && fs.existsSync("./built_frontend/index.html")) {
    fs.readFile("./built_frontend/index.html", (err, data) => {
      if (err)
        return callback(err);
      let brand_data = JSON.parse(content);
      let new_content = data.toString().replace(/(<title>).*(<\/title>)/gi,
                                                `<title>${utils.escapeHtml(brand_data.title)}</title>`)
                                        .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/gi,
                                                `<meta name="description" content="${utils.escapeHtml(brand_data.slogan)}"/>`)
      fs.writeFile("./built_frontend/index.html", new_content, (err) => {
        if (err)
          return callback(err);
        fs.writeFile(
          "./content/brand.json",
          content,
          "utf-8",
          callback
        );
      })

    });
  } else if (file == "mail") {
    // if the password is still **** then replace it with the password still saved in the file
    fs.readFile("./mail.json", (err, data) => {
      if (err)
        return callback(err);
      let password = JSON.parse(data)["mailPass"];
      let newConfig = JSON.parse(content);
      if (newConfig["mailPass"] === "****")
        newConfig["mailPass"] = password;
      fs.writeFile(
        "./mail.json",
        JSON.stringify(newConfig),
        "utf-8",
        callback
      );
    });
  }
  else
    fs.writeFile(
      "./content/" + file + ".json",
      content,
      "utf-8",
      callback
    );
}

exports.areArraysEqualSets = (a1, a2) => {
  const superSet = {};
  for (const i of a1) {
    const e = i + typeof i;
    superSet[e] = 1;
  }

  for (const i of a2) {
    const e = i + typeof i;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
}