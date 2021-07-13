import React from 'react';
import {cloneElement} from '../utils';
import {CloseCircleFilled} from '@ant-design/icons';

class ClearableLabeledInput extends React.Component {

    renderClearIcon(prefixCls) {
        const {allowClear, disabled, value, handleReset} = this.props;
        // console.log('*****', allowClear);
        if (!allowClear) return null;

        const needClear = !disabled && value;

        const className = `${prefixCls}-clear-icon`;
        return (
            <CloseCircleFilled
                onClick={handleReset}
                // className={classNames({
                //     [`${className}-hidden`]: !needClear
                // }, className)}
            />
        );
    }

    renderTextAreaWithClearIcon(prefixCls, element) {
        const {value, allowClear, className, style} = this.props;
        if (!allowClear) {
            return cloneElement(element, {value})
        }

        return (
            <span style={style}>
                {cloneElement(element, {style: null, value})}
                {this.renderClearIcon(prefixCls)}
            </span>
        );
    }

    render() {
        const {prefixCls, element} = this.props;
        return this.renderTextAreaWithClearIcon(prefixCls, element);
    }
}

export default ClearableLabeledInput;