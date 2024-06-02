const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
     cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage });
router.post("/" , upload.single("file") ,async(req,res) => {
    res.json({
        msg:"uploded",
        url:`http://localhost:3009/uploads/${req.file.originalname}`
    })
})
module.exports = router;