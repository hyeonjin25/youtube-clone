import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";

function LandingPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    axios.get("api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideo(res.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
