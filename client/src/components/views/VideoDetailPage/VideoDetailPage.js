import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import SideVideo from "./Sections/SideVideo";
import axios from "axios";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [VideoDetail, setVideoDetail] = useState([]);

  const variable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);

  if (VideoDetail.writer) {
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
                src={`http://localhost:5000/${VideoDetail.filePath}`}
                controls
              />
            </div>
            <List.Item actions>
              <List.Item.Meta
                avatar={VideoDetail.writer.image}
                title={VideoDetail.description}
                description
              />
            </List.Item>
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
