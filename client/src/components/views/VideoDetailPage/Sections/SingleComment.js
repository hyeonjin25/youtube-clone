import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [openReply, setOpenReply] = useState(false);
  const [content, setContent] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandelChange = (e) => {
    setContent(e.currentTarget.value);
  };

  const actions = [
    <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>
      Reply to
    </span>,
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.userData.isAuth) {
      const variables = {
        content: content,
        writer: user.userData._id,
        videoId: props.videoId,
        responseTo: props.comment._id, // 어느 댓글의 답글인지
      };

      Axios.post("/api/comment/saveComment", variables).then((res) => {
        if (res.data.success) {
          setContent("");
          props.refreshFunction(res.data.result);
          setOpenReply(false);
        } else {
          alert("댓글을 저장하지 못했습니다.");
        }
      });
    } else {
      alert("로그인 후에 이용하실 수 있습니다.");
      history.push("/login");
    }
  };

  return (
    <div>
      {/* 댓글 */}
      <Comment
        actions={[<LikeDislikes commentId={props.comment._id} />, actions]}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={props.comment.content}
      />

      {/* 댓글 입력창 -> open reply가 true일때만 보임 */}
      {openReply && (
        <form style={{ display: "flex" }}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandelChange}
            value={content}
            placeholder='댓글을 입력해 주세요'
          />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
