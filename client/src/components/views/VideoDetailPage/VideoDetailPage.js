import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Axios from "axios";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [videoDetail, setVideoDetail] = useState([]);
  const [subscribe, setSubscribe] = useState([]);

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
  }, []);

  if (videoDetail.writer) {
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
            <List.Item
              actions={[<Subscribe userTo={videoDetail.writer._id} />]}
            >
              <List.Item.Meta
                avatar={videoDetail.writer.image}
                title={videoDetail.description}
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
