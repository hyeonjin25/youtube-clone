const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disLikeSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // 댓글 좋아요 할 경우
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  // 비디오 좋아요 할 경우
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
});

const DisLike = mongoose.model("DisLike", disLikeSchema);

module.exports = { DisLike };
