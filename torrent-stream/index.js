const express = require("express");
const torrentStream = require("torrent-stream");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const { magnet } = req.query;
  console.log(`Preparing torrent...`);
  const engine = torrentStream(magnet);

  engine.on("ready", () => {
    console.log("Ready");
    const videoFormats = [".mp4", ".avi", ".mkv", ".mov", ".wmv"];
    const file = engine.files.find((file) => {
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));
      return videoFormats.includes(fileExtension);
    });

    if (file) {
      console.log(`Streaming ${file.name}`);
      res.setHeader("Content-Disposition", `inline; filename="${file.name}"`);
      res.setHeader(
        "Content-Type",
        `video/${file.name.slice(file.name.lastIndexOf(".") + 1)}`
      );
      const stream = file.createReadStream();
      stream.pipe(res);
    } else {
      res.status(404).send("No video file found");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
