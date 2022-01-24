import React, {useContext} from 'react';

const Child = (props) => {
    const {TheContext} = props;
    console.log('context', TheContext, TheContext._currentValue);
    const Text = useContext(TheContext);
    return (
        <div>
        <p>子组件</p>
        <p>传递过来的context: {Text}</p>
        </div>
    );
};
export default Child;