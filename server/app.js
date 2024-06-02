require("dotenv").config()
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const bodyparser = require("body-parser");
const grid = require("gridfs-stream");

const { routesInit } = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.use(express.json());

const mongoose = require("mongoose")

let gfs, gridfsBucket; // declare one more variable with name gridfsBucket
const conn = mongoose.connection;
conn.once('open', async() => {
    // Add this line in the code
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });

    gfs = grid(conn.db, mongoose.mongo);
});

// File serving route
app.get("/file/:filename", async (req, res) => {
    try {
      // Find file in database
      const file = await gridfsBucket.find({ filename: req.params.filename }).toArray();
      
      if (!file[0] || file.length === 0) {
        return res.status(404).send({
          message: "No file found!",
        });
      }
  
      // Check if the file is an image
      if (file[0].contentType === 'image/jpeg' || file[0].contentType === 'image/png') {
        // Render the image to the browser
        const readStream = gridfsBucket.openDownloadStream(file[0]._id);
        readStream.pipe(res);
      } else {
        return res.status(404).json({
          err: 'Not an image',
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  });


app.use(express.static(path.join(__dirname, "public")));
routesInit(app);
const mongoServer = http.createServer(app);
const chatServer = http.createServer(app);

require("./chat/socket")(chatServer)
const mongoPort = 3009;
const chatPort = 3001;
mongoServer.listen(mongoPort);
chatServer.listen(chatPort , () => console.log('socket on'));