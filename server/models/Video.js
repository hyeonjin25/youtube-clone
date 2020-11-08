const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
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
  //updatd date 표시
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
