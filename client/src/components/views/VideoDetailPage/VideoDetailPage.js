import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Axios from "axios";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);

  let variable = {
    videoId: videoId,
  };

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });

    Axios.post("/api/comment/getComments", variable).then((res) => {
      if (res.data.success) {
        setComments(res.data.comments);
        console.log(res.data.comments);
      } else {
        alert("댓글 가져오기를 실패했습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment)); // 새로 달린 댓글 정보 보여주기
  };

  if (videoDetail.writer) {
    const subscribeButton = videoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe userTo={videoDetail.writer._id} />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <div
              style={{
                height: "60vh",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "black",
              }}
            >
              <video
                src={`http://localhost:5000/${videoDetail.filePath}`}
                controls
              />
            </div>
            <List.Item actions={[<LikeDislikes />, subscribeButton]}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name}
                description={videoDetail.description}
              />
            </List.Item>

            <Comment
              videoId={videoId}
              comments={comments}
              refreshFunction={refreshFunction}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default VideoDetailPage;
