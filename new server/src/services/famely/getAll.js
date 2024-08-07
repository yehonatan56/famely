const { FamelyModel } = require("../../models/famely");

const getAll = async (req, res) => {
  res.json(await FamelyModel.find({ pass: { $exists: false } }));
};
module.exports = getAll;
