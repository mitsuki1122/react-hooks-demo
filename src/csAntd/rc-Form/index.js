import React from 'react';
import Form, { Field } from 'rc-field-form';
import { Input, Button } from 'antd';

const Demo = () => {
    return (
        <Form onFinish={values => {
            console.log('Finish', values);
        }}>
            <Field name="username">
                <Input placeholder="Username"></Input>
            </Field>
            <Button htmlType="submit">Submit</Button>
        </Form>
    );
};

export default Demo;
