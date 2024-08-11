const mongoose = require("mongoose");
module.exports.linkDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database");
  }
};
