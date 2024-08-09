const { FamelyModel } = require("../../models/famely")
const update = async(req , res) => {
    try{
        const item = await FamelyModel.findByIdAndUpdate({_id: req.params.id},req.body,{new: true})
        item.pass = '*****';

        res.json(item)
    }catch (e) {
        console.log(e);
        res.json(e)
    }
}

module.exports = update;