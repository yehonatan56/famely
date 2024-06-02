const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // כדי למנוע הצגת אזהרה
  mongoose.set('strictQuery', false);
  // וזה לווינדוס 11
  //await mongoose.connect("mongodb+srv://root:A12345@cluster0.stbko.mongodb.net/famelis")
   await mongoose.connect('mongodb+srv://root:A12345@cluster0.ivjfmh6.mongodb.net/famelis');
  console.log("mongo connect smart local");
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

