const { FamelyModel } = require("../models/famely");

const authUser = async (name) => {
  try {
    const user = await FamelyModel.findOne({ name: name });

    if (!user) {
      throw new Error("User not found");
    }
    return JSON.stringify(user);
  } catch (error) {
    console.error("Error finding user:", error.message);
    throw error; // Re-throw the error to handle it at a higher level
  }
};

module.exports = authUser;
