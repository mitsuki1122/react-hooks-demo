import React from 'react';
import Form from './form';
import FormItem from './formItem';
import {Input, Button} from 'antd';
import { useForm } from 'antd/lib/form/Form';


const Demo = () => {
    const [form] = useForm();

    const onFinish = (values) => {
        console.log('form值：', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const getFormValue = () => {
        console.log('表单的值: ', form.getFieldValue('input'))
    }; // validateFields
    const checkForm = () => {
        form.validateFields()
            .then(values => {
                console.log(values);
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            })
    };
    return (
        <Form form={form} name="csform" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <FormItem name="input" label="测试项" rules={[{required: true, message: "请输入文本"}]} help={null}>
                <Input />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={getFormValue}>获取表单值</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={checkForm}>验证表单</Button>
            </FormItem>
        </Form>
    );
};

export default Demo;
