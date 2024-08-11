const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport")
const session = require("express-session");
const { linkDB } = require("../db/connect");
const { routesInit } = require("../routes/configRoutes");
require("./passport")
const configExpress = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(session({
  secret: process.env.SECEAT,
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  linkDB();
  routesInit(app)
  app.listen(3002, () => console.log("server  run "));
};

module.exports = configExpress;
