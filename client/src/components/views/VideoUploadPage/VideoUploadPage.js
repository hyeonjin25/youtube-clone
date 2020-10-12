import React from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import Icon from '@ant-design/icons';
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
            {/*Drop zone*/}\
            <Dropzone
            onDrop 
            multiple
            maxsize>
            {({getRootProps, getInputProps})=>(
              <div style={{width: '300px', height: '240px', border:'1px solid lightgray',
              alignItems:'center', justifyContent:'center'}} {...getRootProps()}> 
                <input {...getInputProps()}/>
                <Icon type="plus" style={{fontSize:'3rem'}}/>
              </div>
            )}
            </Dropzone>

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
