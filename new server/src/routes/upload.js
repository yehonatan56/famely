const express = require("express");
const upload = require("../middlewares/upload");
const uploadService = require("../services/upload.service");
const router = express.Router();

router.post("/", upload.single("file"), uploadService);
module.exports = router;
