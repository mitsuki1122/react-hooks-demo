import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';

const CSFormItems1 = (props) => {
    const {name, fieldKey} = props;
    return (<>
        <Form.Item label="输入1" name={[name, 'input1']} fieldKey={[fieldKey, 'first']}>
            <Input></Input>
        </Form.Item>
        <Form.Item label="输入2" name={[name, 'input2']} fieldKey={[fieldKey, 'first']}>
            <Input></Input>
        </Form.Item>
    </>);
};

const CSFormItems2 = (props) => {
    const {name, fieldKey} = props;
    return (<>
        <Form.Item label="另外输入1" name={[name, 'input1']} fieldKey={[fieldKey, 'first']}>
            <Input></Input>
        </Form.Item>
        <Form.Item label="另外输入2" name={[name, 'input2']} fieldKey={[fieldKey, 'first']}>
            <Input></Input>
        </Form.Item>
    </>);
};

export { CSFormItems1, CSFormItems2}