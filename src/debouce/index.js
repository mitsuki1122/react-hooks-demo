import React, {useState, useRef, useCallback, useEffect} from "react";
import { Button, Space } from "antd";

const request = (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    })
};

const debounce = (fn) => {
    let timer = null;
    return function (data) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(data).then(() => {
              console.log('请求完成', data);
              timer = null;
            });
            
        }, 2000);
    };
};
const App = () => {
  const [debounceFn, setDebounce] = useState(() => {
    return debounce(request);
  }); // 不能直接useState(debounce(request))
  // const debounceFn = useCallback(debounce(request));

  const handleOperation = (type) => {
      console.log('操作是', type);
      debounceFn(type);
  };

  return (
    <>
      <Space>
        <Button onClick={() => {
            handleOperation('up');
        }}>上移</Button>
        <Button onClick={() => {
            handleOperation('down');
        }}>下移</Button>
      </Space>
    </>
  );
};

export default App;
