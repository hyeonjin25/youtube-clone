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

module.exports = router;
