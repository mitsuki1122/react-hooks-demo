import React from 'react';
import ClearableLabeledInput from './ClearableLabeledInput';

export function resolveOnChange(target, e, onChange, targetValue) {
    if (!onChange) return;
    let event = e;
    const originalInputValue = target.value;

    console.log('target: ', target);
    console.log('e: ', e);
    console.log('originalInputValue: ', originalInputValue);
    // click clear icon
    if (e.type === 'click') {
        event = Object.create(e);
        event.target = target;
        event.currentTarget = target;
        debugger
        target.value = '';
        onChange(event);
        target.value = originalInputValue;
        return;
    }

    // trigger by composition event....

    onChange(event);
}

export function getInputClassName(prefixCls,bordered,size,disabled,direction) {
    return getInputClassName(prefixCls, {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        //disabled
        //direction
        //bordered
    });
}

class Input extends React.Component {
    // 静态函数、变量---定义的方式？
    // 私有方法定义？
    // input!: HTMLInputElement;

    constructor(props) {
        super(props);
        const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
        this.state = {
            value,
            fouced: false,
            // prevValue: props.value ? /** `value` from prev props */ 这个prev props啥意思
        };
    }
    
    componentDidMount() {
        console.log('mounted');
    }

    componentDidUpdate() {
        console.log('updata');
    }
    // class里面直接定义变量？
    renderInput = (prefixCls, size, bordered, input) => {
        // const {className, addonBefore, addonAfter, size, disabled} = this.props; // 这里的两个size会报错
        // const otherProps// .... omit??
        return (
            <input
                // autoComplete={input.autoComplete}
                // {...otherProps}
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                // onKeyDown
                // className
                ref={this.saveInput}
            />
        );
    };
    saveInput = (input) => {
        this.input = input;
    };
    setValue(value, callback) {
        if (this.props.value === undefined) {
            this.setState({value}, callback); // ---setState(updater, [callback])
        } else {
            callback?.();
        }
    }

    handleChange = (e) => { // class组件似乎没有改变state重新渲染？
        this.setValue(e.target.value); // 这里原本设置了callback。先不按照源码写
        resolveOnChange(this.input, e, this.props.onChange);
    };

    onFocus = (e) => {
        const {onFocus} = this.props;
        this.setState({fouced: true}); // callback这里先省略
        onFocus?.(e);
    };

    onBlur = (e) => {
        const {onBlur} = this.props;
        this.setState({fouced: false}); // callback这里先省略
        onBlur?.(e);
    };

    handleKeyDown = (e) => {
        const {onPressEnter, onKeyDown} = this.props;
        if (onPressEnter && e.keyCode === 13) {
            onPressEnter(e);
        }
        onKeyDown?.(e); // 这个在api里是没有的
    };

    handleReset = (e) => {
        this.setValue('');
        resolveOnChange(this.input, e, this.props.onChange);
    };

    render() {
        return (
            <ClearableLabeledInput
                {...this.props}
                value={this.state.value || ''}
                element={this.renderInput(this.props.prefixCls)}
                handleReset={this.handleReset}
            />
        );
    }
}


export default Input;