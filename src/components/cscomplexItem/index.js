import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {CSFormItems1, CSFormItems2}  from './csFormItems';

const Demo = () => {
  const [type, setType] = useState(0);

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleAdd = (newType, add) => {
    type === newType ? add() : setType(newType, add);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove, move }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => {
                console.log('666' + name + JSON.stringify(restField));
                return (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                {type == 0 ?
                  <CSFormItems1 name={name} fieldKey={fieldKey}/> 
                  : <CSFormItems2 name={name} fieldKey={fieldKey}/>
                }
                <MinusCircleOutlined onClick={() => remove(name)} />
                <Button type="dashed" onClick={() => move(key, key-1)} block icon={<PlusOutlined />}>
                move field
              </Button>
              </Space>
)})}
            <Form.Item>
              <Button type="dashed" onClick={() => {handleAdd(0,add)}} block icon={<PlusOutlined />}>
                Add field -1
              </Button>
              <Button type="dashed" onClick={() => {handleAdd(1,add)}} block icon={<PlusOutlined />}>
                Add field -2
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
