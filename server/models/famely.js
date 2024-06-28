const mongoose = require("mongoose");

const famelySchema =  new mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId,default:new mongoose.mongo.ObjectId()},
  name:{type:String},
  famely:Object,
  pass:String,
  date_created:{
    type:Date, default:Date.now
  },
  
})


exports.FamelyModel = mongoose.model("famelis",famelySchema);