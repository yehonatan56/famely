const bcrypt = require("bcrypt");
const { FamelyModel } = require("../../models/famely")
const add = async(req , res) => {
    try{
        const {name, pass} = req.body;
        const hashedPass = await bcrypt.hash(pass, 10);
        const item = new FamelyModel({name, pass:hashedPass});
        const result = await item.save();

        result.pass = '*****';

        res.json(result)
    }catch (e) {
        console.log(e);
        res.json(e)
    }
}

module.exports = add;