import React, { useCallback, useImperativeHandle, useState, useRef, forwardRef } from 'react';

// const FancyInput = React.forwardRef((props, ref) => {
//     const [ fresh, setFresh ] = useState(false)
//     const attRef = useRef();
//     useImperativeHandle(ref, () => ({
//       attRef,
//       fresh
//     }), [ fresh ]);
  
//     const handleClick = useCallback(() => {
//       attRef.current++;
//     }, []);
  
//     return (
//       <div>
//         {/* {attRef.current} */}
//         <button onClick={handleClick}>Fancy</button>
//         <button onClick={() => setFresh(!fresh)}>刷新</button>
//       </div>
//     )
//   });

const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} onClick={props.onClick}>
        {props.children}
    </button>
));

const FancyInput = (props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />
};

const Demo = (props) => {
    const fancyButtonRef = useRef();
    const fancyInputRef = useRef();
    const FancyRef =  forwardRef(FancyInput); // forward要在组件里包裹

    return (
        <> 
        <FancyButton ref={fancyButtonRef} onClick={() => {
            console.log('button', fancyButtonRef.current)}}>Click!</FancyButton>
        <FancyRef ref={fancyInputRef}></FancyRef>
        <button onClick={() => {
            fancyInputRef.current.focus();
        }}>父组件-click-btn</button>
            {/* <FancyInput ref={fancyInputRef} /> */}
            {/* <button onClick={() => {
                // console.log(fancyInputRef.current)
            }}>
                父组件访问子组件实例属性
            </button> */}
        </>
    );
};
// 此demo， 优化项目， form， 高阶组件
export default Demo;

