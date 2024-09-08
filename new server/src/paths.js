const path = require("path");

module.exports.UPLOAD_IMAGE_PATH = path.resolve(__dirname, "public", "uploads");

module.exports.STATIC_PATH = path.resolve(__dirname, "public");

console.table({
  UPLOAD_IMAGE_PATH: module.exports.UPLOAD_IMAGE_PATH,
  STATIC_PATH: module.exports.STATIC_PATH,
});
