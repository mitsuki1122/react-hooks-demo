import React from 'react';
import ReactDom from "react-dom";
import 'antd/dist/antd.css';
import CSFormItem from './components/csformItem';
import CSNamePathItem from './components/namepathItem';
import DynamicItem from './components/dinamicItem';
import LianDongItem from './components/liandongItem';
import CSDynamicFormItem from './components/csdynamicItem';
import CSUploadItem from './components/csuploadItem';
import CSInputGroupItem from './components/csinputgroupItem';
import CSComplexItem from './components/cscomplexItem';
import UseCallBack from './hooks/usecallback';
import Input from './csAntd/input'
import NostyleItem from './components/nostyleItem';
import RCForm from './csAntd/rc-Form';
import RefForward from './hooks/forwardref';
import CSForm from './csAntd/form';
import CSHooks from './hooks/cshook';

ReactDom.render(
    <>
    {/* <p>自定义表单项??</p> */}
    {/* <CSFormItem /> */}
    {/* <CSNamePathItem /> */}
    {/* <DynamicItem /> */}
    {/* <LianDongItem /> */}
    {/* <CSDynamicFormItem /> */}
    {/* <CSUploadItem /> */}
    {/* <CSInputGroupItem /> */}
    {/* <p>hooks</p> */}
    {/* <UseCallBack></UseCallBack> */}
    {/* <RefForward /> */}
    {/* <CSHooks /> */}
    {/* <CSComplexItem /> */}
    {/* <NostyleItem /> */}
    <p>antd components</p>
    {/* <Input prefixCls="ant" allowClear onChange={(e) => {console.log(e.target.value)}} /> */}
    {/* <RCForm /> */}
    <CSForm />
    </>,
    document.getElementById('root')
);
