require("dotenv").config();
const express = require("express");
const app = express();

const configExpress = require("./config/express");
configExpress(app);
