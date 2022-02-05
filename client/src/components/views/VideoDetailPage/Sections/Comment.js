import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

function Comment(props) {
  const user = useSelector((state) => state.user);

  const [content, setContent] = useState("");

  const handleClick = (e) => {
    setContent(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: content,
      writer: user.userData._id,
      postId: props.videoId,
    };

    Axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data.result);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {/* 댓글 리스트 */}

      {/* 댓글 입력창 */}

      <form style={{ display: "flex" }}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
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
