//===========================================
// Use nodemailer to send mails
//===========================================

const nodemailer = require("nodemailer");

exports.sendMail = async (replyTo, senderName, message) => {
  // Verify all required fields are there
  if (!(replyTo && senderName && message)) throw "Missing field";

  // load configuration from the secret mail.json file
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
    from: `"Contact Form" <${config.mailUser}>`, // sender address
    to: config.mailReceiver, // list of receivers
    subject: "Message from your Website", // Subject line
    text: message, // plain text body,
    replyTo: `"${senderName}" <${replyTo}>`,
  });
}



//===========================================
// manage content files
//===========================================

// generate path of the content files
var normalizedPath = require("path").join(__dirname, "content");
const fs = require("fs");

exports.load_content = () => {
  var content = {};
  // scan directory and read all files
  fs.readdirSync(normalizedPath).forEach(function (file) {
    content[file.split(".")[0]] = JSON.parse(
      fs.readFileSync("./content/" + file)
    );
  });
  return content;
}

// utility function to sanitize string against html injection
escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

exports.updateContentFile = (file, content, callback) => {
  // basically just replaces the file with the supplied content, the ncalls the callback.
  // However, the brand file needs special handling, as changes to that file also cause changes to the index.html.
  // The index.html contains the page title and desciption, which get replaced by the brand title and slogan.
  // The mail config also requires a special treatment, as the password is write-only, so might not be supplied in the data from the client, if unchanged.

  // if branding info is updated, update corresponding tags in index.html, if not in dev mode, where the file doesn' exist.
  if (file == "brand" && fs.existsSync("./built_frontend/index.html")) {
    // read the original index.html ...
    fs.readFile("./built_frontend/index.html", (err, data) => {
      if (err)
        return callback(err);
      let brand_data = JSON.parse(content);

      // ... and replace the title and description with the correct data, ...
      let new_content = data.toString().replace(/(<title>).*(<\/title>)/gi,
        `<title>${escapeHtml(brand_data.title)}</title>`)
        .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/gi,
          `<meta name="description" content="${escapeHtml(brand_data.slogan)}"/>`)

      // ... then save the index.html file and ...
      fs.writeFile("./built_frontend/index.html", new_content, (err) => {
        if (err)
          return callback(err);
        // ... finally save the brand.json
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
  else {
    // the other files don't need any special treatment.
    fs.writeFile(
      "./content/" + file + ".json",
      content,
      "utf-8",
      callback
    );
  }
}

// utility method to check if to arrays contain the same elements
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