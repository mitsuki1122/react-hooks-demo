var value;
const csUseState = (initialValue, deps) => {
    value = value ?? initialValue;
    const setValue = (val) => {
        console.log('新值', val);
        value = val;
    };
    return [value, setValue];
};

const csUseState1 = (initialValue, deps) => {
    var value =initialValue; // value定义在内部，set之后的值无法保存.每次rerender,对value重新赋值。
    const setValue = (val) => {
        console.log('新值', val);
        value = val;
        console.log('value', value);
    };
    return [value, setValue];
};

export {csUseState, csUseState1};