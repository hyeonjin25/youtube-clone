const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             like
//=================================

// 좋아요 정보 보내기
router.post("/getLikes", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    // 비디오 좋아요 일 경우
    variable = { videoId: req.body.videoId };
  } else {
    // 댓글 좋아요 일 경우
    variable = { commentId: req.body.commentId };
  }

  // 해당 비디오/댓글의 모든 좋아요들 가져오기
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

// 싫어요 정보 보내기
router.post("/getDisLikes", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    // 비디오 싫어요 일 경우
    variable = { videoId: req.body.videoId };
  } else {
    // 댓글 싫어요 일 경우
    variable = { commentId: req.body.commentId };
  }

  // 해당 비디오/댓글의 모든 싫어요들 가져오기
  DisLike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

// 좋아요 정보 업데이트
router.post("/likeUpdate", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    // 비디오 좋아요 일 경우
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    // 댓글 좋아요 일 경우
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Like collection에 클릭 정보를 넣어줌
  const like = new Like(variable);
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });

    // 만약 dislike이 이미 클릭돼있다면, dislike을 1 줄여줌
    DisLike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

// 좋아요 정보 지우기
router.post("/likeDelete", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    // 비디오 좋아요 일 경우
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    // 댓글 좋아요 일 경우
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // like 취소하기
  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

// 싫어요 정보 업데이트
router.post("/dislikeUpdate", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    // 비디오 싫어요 일 경우
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    // 댓글 싫어요 일 경우
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // DisLike collection에 클릭 정보를 넣어줌
  const dislike = new DisLike(variable);
  dislike.save((err, disLikeResult) => {
    if (err) return res.json({ success: false, err });

    // 만약 Like이 이미 클릭돼있다면, Like을 1 줄여줌
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

// 싫어요 정보 지우기
router.post("/dislikeDelete", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    // 비디오 싫어요 일 경우
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    // 댓글 싫어요 일 경우
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // dislike 취소하기
  DisLike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
