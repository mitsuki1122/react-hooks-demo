import React, { useState } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Demo = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name={['name']}
        label="Name"
        // rules={[
        //   {
        //     required: true,
        //   },
        // ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', '0', 'email']}
        label="Email"
        // rules={[
        //   {
        //     type: 'email',
        //   },
        // ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 0, 'age']}
        label="Age"
        // rules={[
        //   {
        //     type: 'number',
        //     min: 0,
        //     max: 99,
        //   },
        // ]}
      >
        <InputNumber />
      </Form.Item>
      
      <Form.Item name={['user', 1, 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
      <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'websitffe']} label="Website">
      <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'websitffpppe']} label="Website">
      <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;