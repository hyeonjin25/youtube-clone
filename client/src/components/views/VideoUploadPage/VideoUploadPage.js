import React, { useState } from "react";
import Axios from "axios";
import { Typography, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "react-dropzone";

const { Title } = Typography;

const privateOption = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const categoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const onDrop = (files) => {
    let formData = new FormData();

    //어떤 유형의 데이터가 전송되었는지를 알려주기 위함 -> 데이터 전송시 같이 보내줌
    //body에는 보내는 데이터, header에는 body에 들어가는 데이터 타입을 보내줌
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config)
    .then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert("비디오 업로드를 실패했습니다!");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>동영상 업로드</Title>
      </div>

      <Form onSubmit>
        <div /*style={{display:'flex', justifyContent:'space-between'}}*/>
          {/*Drop zone*/}
          <Dropzone onDrop={onDrop} multipl={false} maxsize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {/*플러스 아이콘*/}
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/*Thumbnail*/}

          <div>
            <img />
          </div>
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input
          value={VideoTitle}
          onChange={(e) => {
            setVideoTitle(e.currentTarget.value);
          }}
        />
        <br />
        <br />

        <label>Description</label>
        <TextArea
          value={Description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <br />
        <br />

        <select
          onChange={(e) => {
            setPrivate(e.currentTarget.value);
          }}
        >
          {privateOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select
          onChange={(e) => {
            setCategory(e.currentTarget.value);
          }}
        >
          {categoryOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type='primary' size='large'>
          submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
