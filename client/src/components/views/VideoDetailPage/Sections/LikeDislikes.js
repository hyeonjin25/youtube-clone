import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import Axios from "axios";

function LikeDislikes(props) {
  const userId = localStorage.getItem("userId");
  const [likes, setLikes] = useState(0); // 비디오의 좋아요 개수
  const [disLikes, setDisLikes] = useState(0); // 비디오의 싫어요 개수
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);

  let variable = {};

  if (props.video) {
    variable = {
      userId: userId,
      videoId: props.videoId,
    };
  } else {
    variable = {
      userId: userId,
      commentId: props.commentId,
    };
  }

  useEffect(() => {
    // 좋아요 정보 가져오기
    Axios.post("/api/like/getLikes", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        // 비디오가 얼마나 많은 좋아요를 받았는지
        setLikes(res.data.likes.length);

        // 내가 이미 좋아요를 눌렀는지
        res.data.likes.map((like) => {
          console.log("like.userId: " + like.userId);
          console.log(like);
          if (like.userId === userId) {
            console.log("누름");
            // 이미 좋아요를 누른 경우
            setLiked(true);
          }
        });
      } else {
        alert("좋아요 정보를 가져오지 못했습니다.");
      }
    });

    // 싫어요 정보 가져오기
    Axios.post("/api/like/getDisLikes", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        // 비디오가 얼마나 많은 싫어요를 받았는지
        setDisLikes(res.data.dislikes.length);

        // 내가 이미 좋아요를 눌렀는지
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === userId) {
            // 이미 싫어요를 누른 경우
            setDisLiked(true);
          }
        });
      } else {
        alert("싫어요 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  const LikeHandler = () => {
    // 좋아요 안눌러져 있을 경우 => 좋아요 누름
    if (!liked) {
      Axios.post("/api/like/likeUpdate", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes + 1);
          setLiked(!liked);

          // 만약 싫어요 버튼이 눌러져있다면 취소 해주기
          if (disLiked) {
            setDisLikes(disLikes - 1);
            setDisLiked(!disLiked);
          }
        } else {
          alert("좋아요 정보를 보내지 못했습니다.");
        }
      });
    }
    // 좋아요 눌러져 있을 경우 => 좋아요 취소
    else {
      Axios.post("/api/like/likeDelete", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes - 1);
          setLiked(!liked);
        } else {
          alert("좋아요 정보를 보내지 못했습니다.");
        }
      });
    }
  };

  const DisLikeHandler = () => {
    // 싫어요 안눌러져 있을 경우 => 싫어요 누름
    if (!disLiked) {
      Axios.post("/api/like/dislikeUpdate", variable).then((res) => {
        if (res.data.success) {
          setDisLikes(disLikes + 1);
          setDisLiked(!disLikes);

          // 만약 좋아요 버튼이 눌러져있다면 취소 해주기
          if (liked) {
            setLikes(likes - 1);
            setLiked(!liked);
          }
        } else {
          alert("싫어요 정보를 보내지 못했습니다.");
        }
      });
    }
    // 싫어요 눌러져 있을 경우 => 싫어요 취소
    else {
      Axios.post("/api/like/dislikeDelete", variable).then((res) => {
        if (res.data.success) {
          setDisLikes(disLikes - 1);
          setDisLiked(!disLikes);
        } else {
          alert("싫어요 정보를 보내지 못했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          {liked ? (
            <LikeFilled onClick={LikeHandler} />
          ) : (
            <LikeOutlined onClick={LikeHandler} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{likes} </span>
      </span>
      &nbsp;&nbsp;
      <span key='comment-basic-dislike'>
        <Tooltip title='Like'>
          {disLiked ? (
            <DislikeFilled onClick={DisLikeHandler} />
          ) : (
            <DislikeOutlined onClick={DisLikeHandler} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{disLikes} </span>
      </span>{" "}
      &nbsp;&nbsp;
    </div>
  );
}

export default LikeDislikes;
