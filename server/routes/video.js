const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");

const { auth } = require("../middleware/auth");

const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

//storage multer config
let storage = multer.diskStorage({
  // 파일을 어디에 저장할지
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // upload라는 폴더에 저장 -- uploads 폴더는 server가 아닌 한 단계 위에 만들기
  },
  // 파일을 어떤 이름으로 저장할지
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".mp4") {
      // 비디오만 업로드 가능
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }

    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file"); //파일 하나만

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
  // client에서 받은 비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    //파일이 저장된 경로를 클라이언트에게 보내줌
    return res.json({
      success: true,
      url: res.req.file.path, // 파일이 어디 저장됐는지 알려줌
      fileName: res.req.file.filename, // 파일이 어떤 이름으로 저장됐는지 알려줌
    });
  });
});

router.post("/thumbnail", (req, res) => {
  // 썸네일 생성하고 비디오 러닝타임 가져오기

  let filePath = "";
  let fileDuration = "";

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration; // 러닝타임 가져오기
  });

  // 썸네일 생성
  ffmpeg(req.body.url) // 클라이언트에서 보낸 비디오가 저장된 위치 (/uploads)
    .on("filenames", function (filenames) {
      // 썸네일 파일 이름 생성
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      //썸네일 생성 후 무엇을 할 것인지
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration, // 비디오 러닝타임
      });
    })
    .on("error", function (err) {
      // 에러 발생 시
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3, // 3개의 썸네일 생성 가능
      folder: "uploads/thumbnails", // 썸네일 저장 위치
      size: "320x240",
      filename: "thumbnail-%b.png", // %b: basename (file의 원래 이름)
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
    .populate("writer") // writer의 모든 user정보 가져오기
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  // videoId에 해당하는 비디오를 db에서 가져와서 클라이언트에 보낸다.
  Video.findOne({ _id: req.body.videoId })
    .populate("writer") // writer의 모든 user정보 가져오기
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

router.post("/getSubscriptionVideos", (req, res) => {
  // userFrom이 구독 중인 채널의 비디오들 가져오기

  // 1. 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
  Subscriber.find({ userFrom: req.body.userFrom }).exec(
    (err, subscriberInfo) => {
      if (err) return res.status(400).send(err);

      let subscribedUser = [];

      subscriberInfo.map((subscriber, i) => {
        // 자신의 아이디가 구독하고 있는 사람들의 아이디들을 모두 배열에 넣기
        subscribedUser.push(subscriber.userTo);
      });

      // 2. 찾은 사람들의 비디오를 가져온다.
      // {$in:} 몽고디비에서 여러 정보 찾기
      Video.find({ writer: { $in: subscribedUser } })
        .populate("writer")
        .exec((err, videos) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, videos });
        });
    }
  );
});

module.exports = router;
