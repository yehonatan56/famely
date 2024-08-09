const uploadService = async (req, res) => {
  res.json({
    msg: "uploded",
    url: `http://localhost:3002/uploads/${req.file.originalname}`,
  });
};
module.exports = uploadService;
