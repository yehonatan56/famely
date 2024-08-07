const mongoose = require("mongoose");
module.exports.linkDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:A12345@cluster0.ivjfmh6.mongodb.net/famelis",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database");
  }
};
