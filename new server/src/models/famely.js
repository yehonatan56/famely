const mongoose = require("mongoose");

const famelySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    famely: { type: Object, default: {} },
  },
  { timestamps: true },
);

exports.FamelyModel = mongoose.model("famelis", famelySchema);
