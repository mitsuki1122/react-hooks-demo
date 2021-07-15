import React from 'react';
import {LoadingOutlined, CloseCircleFilled, CheckCircleFilled, ExclamationCircleFilled} from '@ant-design/icons';
import { Col } from 'antd';
import { FormContext } from './context';
import ErrorList from './errorList';

const FormItemInput = (props) => {
    const {prefixCls, status, children, help, errors, onDomErrorVisibleChange} = props;
    console.log('formInput', props);

    const formContext = React.useContext(FormContext);
    // console.log('context', formContext);
    const subFormContext = {...formContext}; // 这里的conext传递值要注意下

    const inputDom = (
        <div>{children}</div>
    );

    const errorListDom = (
        <ErrorList errors={errors} help={help} prefixCls={prefixCls} status={status} onDomErrorVisibleChange={onDomErrorVisibleChange} />
    );

    return (
        <FormContext.Provider value={subFormContext}>
            <Col>
                {inputDom}
                {errorListDom}
            </Col>
        </FormContext.Provider>
    );
};

export default FormItemInput;
