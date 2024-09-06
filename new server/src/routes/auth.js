const express = require("express");
const router = express.Router();
const passport = require("passport");
const authUser = require("../services/auth.service");
// .router.post("/login",(req,res) => res.send('kkk'));
let user = "";
router.post(
  "/login",
  (req, res, next) => {
    user = req.body.name;
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/auth/ok/",
    failureRedirect: "/auth/err",
  }),
);

router.get("/ok", async (req, res) => {
  res.json(await authUser(user));
});
router.get("/err", (req, res) => res.status(400).send("kkjklk"));

module.exports = router;
