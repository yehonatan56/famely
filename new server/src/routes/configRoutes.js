const famelysR = require("./famely");
const uploadR = require("./upload");
const authR = require("./auth");
exports.routesInit = (app) => {
  app.use("/upload",uploadR);
  app.use("/famelys",famelysR);
  app.use("/auth", authR)
  app.use("*",(req,res) => {
    res.status(404).json({msg:"Page/endpoint not found, 404"})
  })
}