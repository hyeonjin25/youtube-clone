const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
      // user 모델에서의 모든 정보를 가져올 수 있음.
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      //view 수가 처음에는 0부터 시작
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  // 만든 날짜, update 날짜 표시
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
