import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

const Double = () => {
  const [val1, setVal1] = useState(1);
  const [val2, setVal2] = useState(2);
  const [obj, setObj] = useState({ key: '1', name: '2' });

  const [val, setVal] = useState([]);

  // console.log(val1, val2);
  console.log('obj', obj);

  const generateFn = () => {
    // setTimeout(() => {
    //   setVal1(11);
    //   setVal2(22);
    //   setObj({ key: '111', name: '222' });
    // }, 2000);
    // setTimeout(() => {
    //   setObj({ key: '1111', name: '2222' });
    // }, 3000);
    // 执行了3次
    // setTimeout(() => {
    //   setObj({ key: '1111', name: '2222' });
    //   setObj({ key: '11111', name: '22222' });
    //   setObj({ key: '111111', name: '222222' });
    // }, 4000);
  };

  useEffect(() => {
    generateFn();
  }, []);

  // useEffect(() => {
  //   console.log('effect1');
  //   // setTimeout是另一个的问题
  //   // setTimeout(() => {
  //   //   setVal(val.concat(0));
  //   // }, 1000);

  //   setVal(val.concat(0));
  // }, [val1, val2]);

  // useEffect(() => {
  //   console.log('effect2'); // 1001
  //   setVal(val.concat(1));
  // }, [obj]);

  useEffect(() => {
    console.log('effect3'); // 1001
    setVal(val.concat(1));
  }, [obj.key, obj.name]); //  没有执行两次

  return (
    <>
      <div>{val}</div>
      <Button
        onClick={() => {
          // click触发的setState 会进行合并，执行最后的那一次
          setObj({ key: '1111', name: '2222' });
          setObj({ key: '11111', name: '22222' });
          setObj({ key: '111111', name: '222222' });
        }}
      >
        点击
      </Button>
    </>
  );
};

export default Double;
