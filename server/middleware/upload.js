const mongoose  = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const url = 'mongodb+srv://root:A12345@cluster0.ivjfmh6.mongodb.net/famelis';
const connection = mongoose.connect(url)

const storage = new GridFsStorage({
    url,
    db: connection,
    // options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });