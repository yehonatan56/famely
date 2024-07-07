const { FamelyModel } = require("../models/famely"); // Update the import path to the correct location
const bcrypt = require("bcrypt");

module.exports.createNewUser = async ({ name, pass }) => {
  const hashPass = await bcrypt.hash(pass, 10);
  const famely = new FamelyModel({ name, pass: hashPass });
  const result = await famely.save();

  return result;
};
