import React from 'react';
import ReactDom from "react-dom";
// import 'antd/dist/antd.less';
// import CSFormItem from './components/csformItem';
// import CSNamePathItem from './components/namepathItem';
// import DynamicItem from './components/dinamicItem';
// import LianDongItem from './components/liandongItem';
// import CSDynamicFormItem from './components/csdynamicItem';
// import CSUploadItem from './components/csuploadItem';
// import CSInputGroupItem from './components/csinputgroupItem';
// import CSComplexItem from './components/cscomplexItem';
// import UseCallBack from './hooks/usecallback';
// import Input from './csAntd/input'
// import NostyleItem from './components/nostyleItem';
// import RCForm from './csAntd/rc-Form';
// import RefForward from './hooks/forwardref';
// import CSForm from './csAntd/form';
// import CSHooks from './hooks/cshook';
// import stylesless from './index.less';
// import stylescss from './index.css';
// import OverflowAbsolute from './css/overflowAbsolute';
import CSButton from './csAntd/button';

ReactDom.render(
    <>6666
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
    {/* <p className={stylescss['test-css']}>css</p> */}
    {/* <p className={'test-css'}>css-直接用名称</p> */}
    {/* <p className={stylesless['test-css']}>css-module</p> */}
    {/* <p className={stylesless['test-css-module']}>antd components</p> */}
    {/* <Input prefixCls="ant" allowClear onChange={(e) => {console.log(e.target.value)}} /> */}
    {/* <RCForm /> */}
    {/* <CSForm /> */}
    {/* <p>css</p> */}
    {/* <OverflowAbsolute /> */}
    <div>
    <CSButton type="primary" onClick={() => {console.log('这个自定义Button')}}>自定义Button</CSButton>
    </div>
    <div>
    <CSButton type="primary" onClick={() => {console.log('这个自定义Button')}} disabled>自定义Button</CSButton>
    </div>
    <div>
    <CSButton type="primary" onClick={() => {console.log('这个自定义Button')}}><a><span>自定义Button</span></a></CSButton>
    </div>
    </>,
    document.getElementById('root')
);
