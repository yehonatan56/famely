const express = require("express");
const getAll = require("../services/famely/getAll");
const add = require("../services/famely/add");
const update = require("../services/famely/update")
const router = express.Router();
router.get("/", (req,res) => getAll(req, res));
router.post("/", (req,res) => add(req,res))
router.put("/:id", (req,res) => update(req,res))


module.exports = router;
