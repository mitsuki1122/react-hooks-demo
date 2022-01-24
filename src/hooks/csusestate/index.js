import React from 'react';
import {Button} from 'antd';
import {csUseState, csUseState1} from './hooks';
import ReactDOM from 'react-dom';

function bibao(init, module) {
    var a = init;
    var setA = (val) => {
        console.log('修改a的值', val);
        a = val;
        setTimeout(() => {module();}, 2000);
    };
    return function() {
        console.log('new a', a);
        return [a, setA];
    };
}

let mounted = false;
var f;

function csGlobal() {
    if (!mounted) {
        f = bibao('aaa', csGlobal);
        mounted = true;
    }
    const [a, setA] = f();
    console.log('----', a);
    setTimeout(() => {
        setA('pppppp');
    }, 5000); 
}

// ---------------------------------------

function render() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

const App = () => {
    console.log('app');
    const [count, setCount] = csUseState1(0);

    return (
        <div>
            count: {count}
            <div>
            <Button onClick={() => {
                setCount(count+1);
                setTimeout(() => {
                    render();
                }, 1000);
            }}>增加1</Button>
            </div>
        </div>
    );
};

export default App;
