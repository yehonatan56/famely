const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "../public/uploads" });
const uploadService = require("../services/upload.service");
const router = express.Router();

router.post("/", upload.single("file"), uploadService);
module.exports = router;
