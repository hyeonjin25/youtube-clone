import React from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'
const { Title } = Typography;

function VideoUploadPage() {
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>동영상 업로드</Title>
          </div>

      <Form onSubmit style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <div>
            {/*Drop zone*/}

            {/*Thumbnail*/}

            <img />
          </div>
        </div>
        <label>Title</label>
        <input/>
        <br/>
        <label>Description</label>
        <TextArea/>
        <br/>

      <select>
        <option></option>
            </select>
        <br/>
      <select>
        <option></option>
      </select>
        <br/>

      <Button type='primary'>
        submit
      </Button>
      </Form>

    </div>
  );
}

export default VideoUploadPage;
