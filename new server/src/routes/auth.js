const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth")

router.post("/" ,isAuth);
router.get("/ok",(req,res) => res.send('kkk'))
module.exports = router;
