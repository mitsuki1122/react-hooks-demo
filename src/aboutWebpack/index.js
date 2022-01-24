import React from 'react';
// console.log('node', process);
const App = () => {
    const Variables = process.env.NODE_ENV;
    return (<>
    <div>node 环境变量: {Variables}{process}</div>
    <div>自定义变量：{APP_TYPE}, {APP_TYPE === 'APPTest' ? 'string = APPTest' : '?'}</div>
    </>);
};
export default App;
