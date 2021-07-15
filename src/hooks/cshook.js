import { Button } from 'antd';
import React, {useEffect, useRef, useState} from 'react';

const useMounted = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current =  false;
        };
    }, []);

    return isMounted;
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        
        handleResize();

        return () => {
            return window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowSize;
};

// 模拟原本的代码 https://www.cnblogs.com/Andy1982/p/13939386.html
// TODO useHistory, useLocation, useQueryState
const useQueryState = () => {
    const history = useState([]);
    const location = useState(window.location);
    const [parsedQuery, setParsedQuery] = useState({});

    useEffect(() => {
        const query = location.search;
        setParsedQuery(query);
    }, [location.search]);

    const updateQuery = (update) => {
        const oldQuery = location.search;
        const newQuery = {...oldQuery, ...update};
    };
};

const LoginDemo = () => {
    const isMounted = useMounted();
    const windowSize = useWindowSize();

    return (
        <>
        <div><span>{windowSize.width}</span>--<span>{windowSize.height}</span></div>
        <Button type="primary" loading={!isMounted}>Login</Button>
        </>
    );
};

export default LoginDemo;
