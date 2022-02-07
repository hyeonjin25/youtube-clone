import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.comments.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNumber(commentNumber);
  }, [props.comments]);

  const renderReplyComment = (parentCommentId) =>
    props.comments.map((comment, index) => (
      <>
        {
          /* 해당하는 댓글의 대댓글만 보여주기 */
          comment.responseTo === parentCommentId && (
            <div style={{ width: "80%", marginLeft: "40px" }}>
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
            </div>
          )
        }
      </>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {/* 답글이 있는 경우만 나오게 하기 */}
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandleChange}
        >
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
};

export default ReplyComment;
