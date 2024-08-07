const express = require("express");
const getAll = require("../services/famely/getAll");
const router = express.Router();
router.get("/", getAll);
module.exports = router;
