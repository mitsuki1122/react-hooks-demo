import React, {useContext} from 'react';
import Child from './child';

// const TheContext = React.createContext(null);

const Parent = () => {
    const TheContext = React.createContext(null);
    return (<>
    <div>
        <p>父组件</p>
        <p>context包裹子组件</p>
        <div>
            <TheContext.Provider value={"666"}>
                <Child TheContext={TheContext}></Child>
            </TheContext.Provider>
            <TheContext.Provider value="ppp">
                <Child TheContext={TheContext}></Child>
            </TheContext.Provider>
        </div>
    </div>
    </>)
};
export default Parent;