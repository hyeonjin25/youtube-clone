import React from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';

const { Title } = Typography;

function VideoUploadPage() {
  return (
    <div style={{}}>
      <div style={{}}>
        <Title level={2}>동영상 업로드</Title>
      </div>

      <Form onSubmit>
          <div>
            <div>
              {/*Drop zone*/}

              {/*Thumbnail*/}
              
              <img/>
            </div>
          </div>
      </Form>

      <select>
        <option></option>
      </select>
      <select>
        <option></option>
      </select>

      <Button>
        submit
      </Button>

    </div>
  );
}

export default VideoUploadPage;
