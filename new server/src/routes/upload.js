const express = require("express");
const multer = require("multer");
const uploadService = require("../services/upload.service");
const { UPLOAD_IMAGE_PATH } = require("../paths");

const storage = multer.diskStorage({
  destination: UPLOAD_IMAGE_PATH,
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("file"), uploadService);

module.exports = router;
