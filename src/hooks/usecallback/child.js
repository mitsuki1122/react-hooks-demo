import React, { useState, useEffect, memo } from "react";
import { Modal, Button } from "antd";

const Child = (props) => {
  const {handleClick} = props;
  console.log("----child----");
  const [val, setVal] = useState("000");
  const onClick = () => {
    console.log("onClick");
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("--child 挂载--");
      setVal("333");
    }, 2000);

    return () => {
      console.log("--child 销毁--");
    };
  }, []);

  return (
      <div>
          <span>-----子组件</span>
          <span>state: {val}</span>
          <Button onClick={handleClick}>onClick --- props</Button>
          <Button onClick={onClick}>onClick --- here</Button>
      </div>
  )
};

export default memo(Child);
