const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const { linkDB } = require("../db/connect");
const { routesInit } = require("../routes/configRoutes");
const { STATIC_PATH } = require("../paths");
require("./passport");

const configExpress = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(STATIC_PATH));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  // morgan is a logger
  app.use(morgan("dev"));
  app.use(
    session({
      secret: process.env.SECEAT,
      resave: true,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await linkDB();
  routesInit(app);
  app.listen(3009, () => console.log("server  run "));
};

module.exports = configExpress;
