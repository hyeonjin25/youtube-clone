const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

const multer = require("multer");
//storage multer config
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext != ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }

    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
  //비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    //파일이 저장된 경로를 클라이언트에게 보내줌
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadVideo", (req, res) => {
  //받은 비디오 정보들을 Video 스키마에 저장
  const video = new Video(req.body);

  //몽고디비에 저장
  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  //비디오를 db에서 가져와서 클라이언트에 보낸다.

  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

module.exports = router;
