const { FamelyModel } = require("../models/famely"); // Update the import path to the correct location

const checkName = async(name) => {
    const names = [];
    for (const item of await FamelyModel.find({})) {
        names.push(item.name);
    }
    if (names.includes(name)) {
        return false
    }
    return true;
}

module.exports.checkName = checkName;