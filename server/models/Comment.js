const { response } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  // 대댓글
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
