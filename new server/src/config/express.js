const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configExpress = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.listen(3002, () => console.log("server  run "));
};

module.exports = configExpress;
