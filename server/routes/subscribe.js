const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", (req, res) => {
  // userTo를 몇명이 구독하는지 정보 보내주기
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

router.post("/subscribed", (req, res) => {
  // userFrom이 userTo를 구독하는지 정보 보내주기
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribed) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (subscribed.length !== 0) result = true; // 하나의 정보라도 있으면 구독 중인것으로 판별
    res.status(200).json({ success: true, subscribed: result });
  });
});

router.post("/unSubscribe", (req, res) => {
  // userFrom이 userTo의 구독을 취소
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.post("/subscribe", (req, res) => {
  // userFrom이 userTo을 구독
  const subscribe = new Subscriber(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
