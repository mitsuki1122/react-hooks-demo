import React, { useState, useEffect } from 'react';
import { Form, Upload, Select, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Demo = () => {
    const onFinish = (value) => {
        console.log(value);
    }
    const onFail = (value) => {
        console.log(value);
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

    const onSuccess = (file) => {
        console.log(file);
    };

    const onEFail = (file) => {
        console.log('6666');
        // console.log(file);
    };

    const  onChange = (file) => {
        console.log(file);
    };

    return (
        <Form
        onFinish={onFinish}
        onFail={onFail}
        initialValues={{upload: [{uid: 1, name: '666.png',}]}}
        >
        <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
        // initialValue={[uid: 1]}
        >
        <Upload name="logo" action="/upload.do" listType="picture" onChange={onChange} onSuccess={onSuccess} onError={onEFail}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
        </Form>
    );
}

export default Demo;
