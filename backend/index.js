//load .env file
require("dotenv").config();

const utils = require("./utils");

const path = require("path");

const express = require("express");
const app = express();
const port = 4000;

const fs = require("fs");



//===========================================
// CORS stuff
// needed for local development, where the ports don't match
//===========================================
if (process.env.ALLOW_CORS) {
  const cors = require("cors");
  app.use(
    cors({
      origin: "*",
    })
  );
}



//===========================================
// content serving
//===========================================

// serve frontend in Docker image
app.use(express.static("built_frontend"));

// serve images
app.use("/images", express.static("images"));

// serve content JSON
var content = utils.load_content();
app.get("/content", (req, res) => {
  res.json(content);
});



//===========================================
// send message endpoint
//===========================================

app.post("/sendMessage", async (req, res) => {
  utils.sendMail(req.body.email, req.body.name, req.body.message)
    .then(_ => {
      res.status(200).send("Message delivered");
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});



//===========================================
// Auth for admin section
//===========================================

// use basic HTTP auth headers for authorization
const basicAuth = require("express-basic-auth");
app.use(
  "/admin",
  basicAuth({
    // load admin user from environment variables
    users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASS }
  })
);

// endpoint to check login, will simply return 200 OK on correct credentials
app.get("/admin", (req, res) => res.status(200).end());



//===========================================
// file upload handling
//===========================================

// generate destiantion path to save a image to
// saves logos in the toplevel /images/ and others in ther respective sub-folders
function destination(req, file, callback) {
  if (["favicon", "logo_animated", "logo_static", "logo192", "logo512"].includes(req.params.imagetype))
    return callback(null, './images/')
  callback(null, `./images/${req.params.imagetype}/`);
}

// generate a filename for the image
// Uses the original filename, unless it's a specific logo file, which are statically referenced
function filename(req, file, callback) {
  let filename;
  switch (req.params.imagetype) {
    case "favicon":
      filename = "favicon.ico";
      break;
    case "logo_animated":
      filename = "logo_animated.svg";
      break;
    case "logo_static":
      filename = "logo_static.svg";
      break;
    case "logo192":
      filename = "logo192.png";
      break;
    case "logo512":
      filename = "logo512.png";
      break;
    default:
      filename = file.originalname;
  }
  callback(null, filename);
}

// validate uploaded files, only allow correct image types
const validTypes = ["artist", "team", "favicon", "logo_animated", "logo_static", "logo192", "logo512"];
function fileFilter(req, file, callback) {
  callback(null, validTypes.includes(req.params.imagetype));
}

// multer handles the multipart/form requests
var multer = require("multer");
var storage = multer.diskStorage({
  destination,
  filename,
});

var upload = multer({
  storage,
  fileFilter,
});

// define endpoint for uploading images, multer middleware to handle the upload, 200 return code
app.post("/admin/upload_image/:imagetype", upload.array("images"), (req, res) =>
  res.status(200).end()
);

app.delete("/admin/delete_image/:imagetype/:image", (req, res) => {

  // make sure no relative paths are used to delete other files
  let filename = path.basename(req.params.image);

  fs.unlink("./images/" + req.params.imagetype + "/" + filename, (err) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send("Deleted file");
  });
});



//===========================================
// parse POST bodies for API endpoints
//===========================================

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients, such as POSTMAN or the JS Fetch API)
app.use(express.json());



//===========================================
// updating content / config
//===========================================

app.post("/admin/update/:file", (req, res) => {

  // verify the file to update

  let file = req.params.file;
  let possibleFiles = ["about", "artists", "faq", "whatwedo", "mail", "sections", "style", "brand", "privacy_policy"];

  if (!possibleFiles.includes(file)) {
    res.status(400).send("Not a valid file");
    return;
  }

  // write the requests body into the file
  utils.updateContentFile(file, JSON.stringify(req.body), (err) => {
    if (err)
      return res.status(500).send(err);
    content = utils.load_content();
    res.status(200).send("Updated file.");
  })

});


// endpoint to bulk import all settings from one singular uploaded file
app.post("/admin/import", (req, res) => {

  // the required settings
  let required = ["about", "artists", "faq", "whatwedo", "mail", "sections", "style", "brand", "privacy_policy"];

  let imported = req.body;

  // Only the required settings may appear in the imported file, and all required settings must appear 
  if (!utils.areArraysEqualSets(required, Object.keys(imported)))
    return res.status(400).send("Make sure all of and only the following settings are in the file: " + required.join(", "));

  // use an array of promises to make sure all files have been written successfully before sending a 200
  let promises = [];
  for (let file of required) {
    const promise = new Promise((resolve, reject) => {
      utils.updateContentFile(file, JSON.stringify(imported[file]), (err) => {
        if (err) {
          res.status(500).send(err);
          reject()
          return;
        }
        resolve();
      });
    });

    promises.push(promise);
  }

  Promise.all(promises).then(_ => {
    content = utils.load_content();
    res.status(200).send("Imported!");
  });

});

// endpoint to retrieve the mail config. The password should not be exposed, hence gets replaced here.
app.get("/admin/mailconfig", (req, res) => {
  fs.readFile("./mail.json", (err, data) => {
    if (err)
      return res.status(500).send(err)
    let config = JSON.parse(data);
    // Password is writeonly
    config["mailPass"] = "****";
    res.status(200).send(config);
  });
});



//===========================================
// start express
//===========================================
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening at http://0.0.0.0:${port}`);
});
