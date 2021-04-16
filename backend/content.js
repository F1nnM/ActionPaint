var content = {}

var normalizedPath = require("path").join(__dirname, "content");
const fs = require("fs");
function load_content() {
  fs.readdirSync(normalizedPath).forEach(function (file) {
    content[file.split(".")[0]] = require("./content/"+file);
  });
}

exports.content = content;

exports.update = load_content;
exports.init = load_content;
