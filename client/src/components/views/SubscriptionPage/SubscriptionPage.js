import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";

import axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [video, setVideo] = useState([]);

  let subscriptionVariables = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    axios
      .post("/api/video/getSubscriptionVideos", subscriptionVariables)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setVideo(res.data.videos);
        } else {
          alert("비디오 가져오기를 실패했습니다.");
        }
      });
  }, []);

  const renderCards = video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt='thumbnail'
            />
            <div>
              <span className='duration'>
                {minutes}:{seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=''
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{video.views} views</span> -
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
