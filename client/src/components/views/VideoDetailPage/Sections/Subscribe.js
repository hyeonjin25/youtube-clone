import Axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  let variable = { userTo: props.userTo };

  useEffect(() => {
    // 구독자 수 정보 가져오기
    Axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"), // 로컬 스토리지에서 가져오기
    };
    // 사용자가 해당 영상 게시자를 구독하는지 여부 가져오기
    Axios.post("/api/subscribe/subscribed", subscribedVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("구독 여부를 받아오지 못했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: 500,
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick
      >
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
