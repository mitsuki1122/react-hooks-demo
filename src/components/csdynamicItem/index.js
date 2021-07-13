import React, { useState } from 'react';
import { Form, Input, Button, Space, Select, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Demo = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const [form] = Form.useForm();

  const callback = (e, index) => {
    console.log(e, index);
    const fieldValue = form.getFieldValue('users');
    console.log('filev', fieldValue);
    fieldValue.forEach(element => {
      if (element['province']) element['province'] = false
    });
    // fieldValue[index]['province'] = true;
    fieldValue[index]['province'] = true;
    form.setFieldsValue({
      users: fieldValue
    });
    
  };

  return (
    <Form name="dynamic_form_nest_item" form={form} onFinish={onFinish} autoComplete="off" initialValues={{users: [{street: '2', province: true}]}}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => {
              console.log(fields);
                console.log('666' + key + name + fieldKey + JSON.stringify(restField));
                return (
                  <Form.Item key={key} label="Address">
                    <Input.Group compact>
                    {/* <Radio.Group> */}
                      <Form.Item
                        name={[name, 'province']}
                        valuePropName="checked"
                        noStyle
                        rules={[{ required: false, message: 'Province is required' }]}
                      >
                        {/* <Select placeholder="Select province">
                          <Option value="Zhejiang">Zhejiang</Option>
                          <Option value="Jiangsu">Jiangsu</Option>
                        </Select> */}
                        {/* <Radio.Group> */}
                        <Radio onChange={(e) => {callback.call(e, e.target, key)}}>A
                        </Radio>
                        </Form.Item>
                        <Form.Item
                        name={[name, 'street']}
                        noStyle
                        rules={[{ required: true, message: 'Street is required' }]}
                      >
                        <Input style={{ width: '50%' }} placeholder="Input street" />
                      </Form.Item>
                        {/* </Radio.Group> */}
                      
                      {/* </Radio.Group> */}
                    </Input.Group>
                  </Form.Item>
              // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              //   <Form.Item
              //     {...restField}
              //     name={[name, 'first']}
              //     fieldKey={[fieldKey, 'first']}
              //     rules={[{ required: true, message: 'Missing first name' }]}
              //   >
              //     <Input placeholder="First Name" value={'666' + name + JSON.stringify(restField)}></Input>
              //   </Form.Item>
              //   <Form.Item
              //     {...restField}
              //     name={[name, 'last']}
              //     fieldKey={[fieldKey, 'last']}
              //     rules={[{ required: true, message: 'Missing last name' }]}
              //   >
              //     <Input placeholder="Last Name" />
              //   </Form.Item>
              //   <MinusCircleOutlined onClick={() => remove(name)} />
              // </Space>
)})}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
