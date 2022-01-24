import React, { useState, useEffect, useCallback } from 'react';
import {Button,Spin} from 'antd';
import Child from './child';

const Parent = () => {
    console.log('---parent---');
    const [loading, setLoading] = useState(false);
    const handleClick = useCallback(() => {
        console.log('useCallBack');
    }, []);

    return (
        <div>
            <span>----父组件 state{loading.toString()}</span>
            <Spin spinning={loading}></Spin>
            <Button onClick={
                () => {setLoading(true);}
            }>打开loading</Button>
            <Button onClick={
                () => {setLoading(false);}
            }>关闭loading</Button>
            <Child handleClick={handleClick}></Child>
        </div>
    );
};

export default Parent;
