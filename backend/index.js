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

var content = utils.load_content();
app.get("/content", (req, res) => {
  res.json(content);
});



//===========================================
// Auth for admin section
//===========================================

const basicAuth = require("express-basic-auth");
app.use(
  "/admin",
  basicAuth({
    users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASS }
  })
);

// endpoint to check login
app.get("/admin", (req, res) => res.status(200).end());



//===========================================
// file upload handling
//===========================================

// generate which folder to save a image to
function destination(req, file, callback) {
  callback(null, `./images/${req.params.imagetype}/`);
}
// generate a filename for the image
function filename(req, file, callback) {
  callback(null, file.originalname);
}

// validate uploaded files, only allow correct image types
const validTypes = ["artist", "team"];
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

// define endpoint for uploading images, multer middleware, 200 return code
app.post("/admin/upload_image/:imagetype", upload.array("images"), (req, res) =>
  res.status(200).end()
);

app.delete("/admin/delete_image/:imagetype/:image", (req, res) => {

  //make sure no relative paths are used to delete other files
  let filename = path.basename(req.params.image);
  let filedir = path.basename(req.params.imagetype)

  fs.unlink("./images/"+filedir+"/" + filename, (err) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send("Deleted file");
  });
});

app.get("/admin/list_images", (req, res) => {
  let files = {};
  try{
    files["artists"] = fs.readdirSync("./images/artist");
  files["team"] = fs.readdirSync("./images/team");
  } catch (e) {
    res.status(500).send(e);
  }
  
  res.status(200).send(files);
});

//===========================================
// parse POST bodies for API endpoints
//===========================================

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());



//===========================================
// updating files
//===========================================

app.post("/admin/update/:file", (req, res) => {
  let file = req.params.file;
  let possibleFiles = ["about", "artists", "faq", "whatwedo", "mail"];

  if (!possibleFiles.includes(file)) {
    res.status(400).send("Not a valid file");
    return;
  }

  if(file == "mail"){
    // if the password is still **** then replace it with the password still saved in the file
    fs.readFile("./mail.json", (err, data) => {
      if (err) 
        return res.status(500).send(err)
      let password = JSON.parse(data)["MAIL_PASS"];
      let newConfig = JSON.parse(req.body.content); 
      if (newConfig["MAIL_PASS"] === "****")
        newConfig["MAIL_PASS"] = password; 
      fs.writeFile(
        "./mail.json",
        JSON.stringify(newConfig),
        "utf-8",
        (err) => {
          if (err) res.status(500).send(err);
          else {
            res.status(200).send("File updated");
            
          }
        }
      );
      res.status(200).send(config);
    });
  }
  else 
    fs.writeFile(
      "./content/" + file + ".json",
      req.body.content,
      "utf-8",
      (err) => {
        if (err) res.status(500).send(err);
        else {
          res.status(200).send("File updated");
          content = utils.load_content();
        }
      }
    );
});


app.get("/admin/mailconfig", (req, res) => {
  fs.readFile("./mail.json", (err, data) => {
    if (err) 
      return res.status(500).send(err)
    let config = JSON.parse(data);
    // Password is writeonly
    config["MAIL_PASS"] = "****";
    res.status(200).send(config);
  });
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
      return;
    })
});



//===========================================
// start express
//===========================================
app.listen(port, "0.0.0.0", () => {
  console.log(`ActionPaint backend listening at http://0.0.0.0:${port}`);
});
