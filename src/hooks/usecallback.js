import React, { memo, useCallback, useMemo, useState } from 'react';
import { Button } from 'antd';

// PageA
const PageA = memo((props) => {
    console.log('---pageA');
    const {children, onClick, val} = props;
    

    return (
    <>
    {val.map(item => {
        return <p key={item + ''}>{item}</p>;
    })}
    <Button onClick={onClick}>{children}</Button>
    </>
    );
});

// PageB
const PageB = memo((props) => {
    console.log('+++pageB');
    const {children, onClick} = props;
    

    return (<Button onClick={onClick}>{children}</Button>);
});

// pageC
const PageC = memo((props) => {
    console.log('***pageC');
    const {name} =props;
    

    return (<p>{name}</p>);
});

const Demo = (props) => {
    const [countA, setcountA] = useState(0);
    const [b, setB] = useState(0);
    console.log('demo-render');

    const handleclickA = useCallback(() => {
        console.log('clickA', countA);
        setcountA(countA+1);
    }, [countA]); /*  不写[dep],则因为callback闭包的缘故。coutA还是0，不会引起状态更新，所以没有引起Demo的重新渲染（只有第一次点击更新了，因为前后state变了）
    这种适用Demo多个state，维护自己自己变化，不受别的state影响。
    不过这样useCall重新执行了，所以与上一次的值不一样，不能解决该组件重新渲染，只能减少因其他state变化引起的渲染。
    如果想解决渲染，方法有：userReducer(dispatch(稳定的))， useRef存值
    */
    // handleClickA触发，导致PageB也重新渲染，
    // 需要注意的是，这个例子useCallback要配合memo一起使用使PageB不重新渲染。
    // 原因：导致重新渲染后，memo是作用于组件级别的，pageB还是还是上一次的function。
    // 但是在父组件中，handleclickB又重新生成了，这种返回函数的值是和上一次不一样的。
    /**
     * function fun() {return f}
     * const a = fun(); const b = fun();
     * a === b //false
     */
    // 因此配合上useCallback返回的是上一次的值，因此props不变，不会重新渲染。
    // 单纯用memo也不可以阻止重新渲染，因为props在外部重新渲染中被改变。
    // const handleclickB = useCallback(() => {
    //     setB(b+1);
    // }, []);
    const handleclickB = () => {
        setB(b+1);
    };

    const getVal = useMemo(() => [1,2,3], []);

    const handleclickC = useCallback(() => {console.log('CCCC');}, []);
    return (
        <>
            <PageA onClick={handleclickA} val={[1, 2, 3]}>Click</PageA>
            <PageB onClick={handleclickB}>{b}</PageB>
            <PageC name={'6666'} val={getVal} onClick={handleclickC}/>
            <p>{'值-----'+ countA}</p>
        </>
    );
};

export default Demo;

// function CSButton(props) {
//     const { handleclick, children } = props;
//     console.log('Button -> render');

//     return (
//         <button onClick={handleclick}>{children}</button>
//     )
// }
// export default function Index() {
//     const [clickCount, increaseCount] = useState(0);
//     // 没有使用`useCallback`，每次渲染都会重新创建内部函数
//     // const handleClick = () => {
//     //     console.log('handleClick');
//     //     increaseCount(clickCount + 1);
//     // }

//     // 使用`useCallback`，但也每次渲染都会重新创建内部函数作为`useCallback`的实参
//     const handleClick = useCallback(() => {
//         console.log('handleClick');
//         increaseCount(clickCount + 1);
//     }, [clickCount])

//     return (
//         <div>
//             <p>{clickCount}</p>
//             <CSButton handleclick={handleClick}>Click</CSButton>
//         </div>
//     )
// }
