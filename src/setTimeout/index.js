import React, {useState, useEffect} from 'react';
import {Button} from 'antd';

const App = () => {
    const [interval, setCSInterval] = useState(-1);
    const handleClick = () => {
        clearInterval(interval);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('setInterval');
        }, 1500);
        console.log('timer', timer);
        setCSInterval(timer);
        return () => {
            console.log('离开页面', interval);
            // 这里interval是闭包内的数据，所以保持-1不变
            clearInterval(interval); 
        };
    }, []);

    return (
        <div>
            <p>useState --- clearInterval</p>
            <p>interval-Id-{interval}</p>
            <Button onClick={
                () => {handleClick();}
            }>停止interval</Button>
        </div>
    );
};

export default App;