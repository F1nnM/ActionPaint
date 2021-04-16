//load .env file
require('dotenv').config();

const express = require("express");
const app = express();
const port = 4000;



//===========================================
// static file serving
//===========================================

// serve frontend in Docker image
app.use(express.static("built_frontend"));

// serve content
app.use("/content", express.static("content"));

// serve images
app.use("/images", express.static("images"));



//===========================================
// Auth for admin section
//===========================================

const basicAuth = require("express-basic-auth")
app.use("/api", basicAuth({
  users: { "admin": "supersecret" },
  challenge: true,
}))



//===========================================
// file upload handling
//===========================================

// generate which folter to save a image to
function destination(req, file, callback) {
  callback(null, `./images/${req.body.imagetype}/`)
}
// generate a filename for the image
function filename(req, file, callback) {
  callback(null, file.originalname+ "_" + Date.now())
}

// validate uploaded files, only allow correct image types
const validTypes = ["artist", "team"];
function fileFilter(req, file, callback) {
  callback(null, validTypes.includes(req.body.imagetype))
}

// multer handles the multipart/form requests
var multer = require("multer");
var storage = multer.diskStorage({
  destination,
  filename
})

var upload = multer({
  storage,
  fileFilter
})

// define endpoint for uploading images, multer middleware, 200 return code
app.post("/api/upload_image", upload.array("images"), (req, res) => res.status(200).end());



//===========================================
// other api handling
//===========================================


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const { public_actions, private_actions } = require("./actions");

app.post("/api/:action", (req, res) => {
  // All the api handling goes here
  let action = req.params.action;
  res.send(action)
});

app.post("/public_api/:action", (req, res) => {
  // All the api handling goes here
  let action = public_actions[req.params.action];
  if (action)
    action(req, res)
  else
    res.status(400).send("No valid action")
});

app.listen(port, "0.0.0.0", () => {
  console.log(`ActionPaint backend listening at http://0.0.0.0:${port}`);
});
