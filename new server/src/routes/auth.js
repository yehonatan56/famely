const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth")
const passport = require("passport");
router.post("/" ,isAuth);
// router.post("/login" ,(req,res) => res.send('kkk'));
    router.post("/login" ,passport.authenticate('local', {
        successRedirect:"/auth/ok",
        failureRedirect:"/auth/err"
    }));

router.get("/ok",(req,res) => res.status(200).send('kkk'))

module.exports = router;
router.get("/err",(req,res) => res.status(400) .send('kkjklk'))
