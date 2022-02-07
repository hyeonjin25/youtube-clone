import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [content, setContent] = useState("");

  const onHandelChange = (e) => {
    setContent(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.userData.isAuth) {
      const variables = {
        content: content,
        writer: user.userData._id,
        videoId: props.videoId,
      };

      Axios.post("/api/comment/saveComment", variables).then((res) => {
        if (res.data.success) {
          setContent("");
          props.refreshFunction(res.data.result);
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
      <br />
      <p>Replies</p>
      <hr />

      {/* 댓글 리스트 */}
      {props.comments &&
        props.comments.map(
          (comment, index) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  key={index}
                  videoId={props.videoId}
                  comment={comment}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  comments={props.comments}
                  videoId={props.videoId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </>
            )
        )}

      {/* 댓글 입력창 */}
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
    </div>
  );
}

export default Comment;
