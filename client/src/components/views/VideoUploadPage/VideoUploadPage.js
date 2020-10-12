import React from 'react';
import { Typography, Button, Form, Input } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'
const { Title } = Typography;

function VideoUploadPage() {
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>동영상 업로드</Title>
      </div>

      <Form onSubmit>
      <div /*style={{display:'flex', justifyContent:'space-between'}}*/>

            {/*Drop zone*/}
            <Dropzone
              onDrop 
              multiple
              maxsize>
              {({getRootProps, getInputProps})=>(
                <div style={{ width: '300px', height: '240px', border:'1px solid lightgray',display:'flex',
                alignItems:'center', justifyContent:'center'}} {...getRootProps()}> 
                  <input {...getInputProps()}/>
                  <PlusOutlined  style={{fontSize:'3rem'}}/>
                </div>
              )}
            </Dropzone>

            {/*Thumbnail*/}

            <div>
              <img />
            </div>
        </div>

        <br/>
        <br/>
        <label>Title</label>
        <Input/>
        <br/>
      <br/>

        <label>Description</label>
        <TextArea/>
        <br/>
        <br/>

      <select>
        <option key value></option>
      </select>
        <br/>
        <br/>
      <select>
        <option></option>
      </select>
        <br/>
        <br/>

      <Button type='primary' size='large'>
        submit
      </Button>
      </Form>

    </div>
  );
}

export default VideoUploadPage;
