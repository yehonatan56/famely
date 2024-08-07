require("dotenv").config();
const express = require("express");
const app = express();
const { linkDB } = require("./db/connect");
const { routesInit } = require("./routes/configRoutes");
const configExpress = require("./config/express");

linkDB();
routesInit(app);
configExpress(app);
