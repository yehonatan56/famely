const { FamelyModel } = require("../../models/famely");

const getAll = async (req, res) => {
  res.json(await FamelyModel.find({  }));
};
module.exports = getAll;
