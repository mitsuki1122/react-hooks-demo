import React from 'react';
import {LoadingOutlined, CloseCircleFilled, CheckCircleFilled, ExclamationCircleFilled} from '@ant-design/icons';
import { Col } from 'antd';
import { FormContext } from './context';


const FormItemInput = (props) => {
    const {children, help, errors} = props;
    console.log('formInput', props);

    const formContext = React.useContext(FormContext);
    // console.log('context', formContext);
    const subFormContext = {...formContext}; // 这里的conext传递值要注意下

    const inputDom = (
        <div>{children}</div>
    );

    return (
        <FormContext.Provider value={subFormContext}>
            <Col>
                {inputDom}
            </Col>
        </FormContext.Provider>
    );
};

export default FormItemInput;
