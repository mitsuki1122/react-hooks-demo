import React, { useRef, useState, useEffect } from "react";

const bindEvent = (target, event, cb, options) => {
  if (target.addEventListener) {
    console.log("绑定事件");
    target.addEventListener(event, cb, options);
  }

  // 返回一个对应，直接返回函数，在setState时，会被执行。
  return {
    remove: () => {
      target.removeEventListener(event, cb, options);
    },
  };
};

const Slider = () => {
  const containerRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [railLength, setRailLength] = useState(1);
  const [info] = useState<any>({}); // 存储不用与页面渲染，但是必要的参数,使用useState会产生意想不到的错误
  // 在渲染时才会执行，这样写无效
  // const railLength =  useMemo(() => {
  //   if (railRef.current) {
  //     console.log("railRef.current.width", railRef.current.offsetWidth);
  //     return railRef.current.offsetWidth;
  //   }
  //   return 1;
  // }, [railRef.current]);

  const removeEvent = () => {
    info.mousemoveBinder && info.mousemoveBinder.remove();
    info.mouseupBinder && info.mouseupBinder.remove();
  };

  const addMouseEvent = () => {
    info.mousemoveBinder = bindEvent(
      handleRef.current?.ownerDocument,
      "mousemove",
      onMove,
      false
    );
    info.mouseupBinder = bindEvent(
      handleRef.current?.ownerDocument,
      "mouseup",
      onMouseUp,
      false
    );
  };

  const handleOffset = (x: number) => {
    const offset = value + x - info.initP;
    console.log("offset", x, info.initP);
    if (x < containerRef.current.offsetLeft) {
      console.log("offset", 0);
      return 0;
    }
    if (x > containerRef.current.offsetLeft + railLength) {
      console.log("offset", railLength);
      return railLength;
    }
    console.log("offset", offset);
    return offset;
  };

  const handleRate = (offset) => {
    return Math.round((offset / railLength) * 100);
  };

  const onDown = (e) => {
    console.log("down");
    // removeEvent();
    // clientX 当事件被触发时鼠标指针相对于浏览器页面的水平坐标。
    info.initP = e.clientX;
    console.log("init", e.clientX);
    addMouseEvent(); 
  };
  const onMouseUp = () => {
    console.log("解除绑定");
    removeEvent();
  };
  const onMove = (e) => {
    console.log("move", e.clientX);
    e.stopPropagation();
    e.preventDefault();

    const value = handleOffset(e.clientX);
    console.log("value", value);
    onChange(value);
  };
  const onChange = (value) => {
    const percentValue = handleRate(value);
    setValue(value);
    if (handleRef.current) {
      const handleDom = handleRef.current;
      handleDom.style.left = value + "px";
    }
    if (trackRef.current) {
      const trackDom = trackRef.current;
      trackDom.style.width = `${percentValue}%`;
    }
  };

  useEffect(() => {
    setRailLength(railRef.current.offsetWidth);
    console.log("rail距离页面左边的宽度", containerRef.current.offsetLeft, containerRef.current.getBoundingClientRect().left);
  }, []);
  return (
    <>
      <div ref={containerRef} className="slider">
        <div ref={railRef} className="slider-rail"></div>
        <div ref={trackRef} className="slider-track"></div>
        <div
          ref={handleRef}
          className="slider-handle"
          onMouseDown={onDown}
          // onMouseUp={onMouseUp} // 这个也应该绑定到doc，考虑到超出slider的情况
          // onMouseMove={(e) => {}} // move是绑定到documents上的，鼠标相对doc在移动
        ></div>
        <div style={{ margin: "16px" }}>{handleRate(value)}</div>
      </div>
    </>
  );
};

export default Slider;
