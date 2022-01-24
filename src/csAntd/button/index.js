import React from 'react';
import classNames from 'classnames';
import {getPrefixCls} from '../config';
import './index.less';

const InnerButton = (props, ref) => {
    console.log(props.disabled);
    const { prefixCls: customizePrefixCls, type, className, children, ...rest} = props;

    const handleClick = (e) => {
        const {onClick, disabled} = props;

        if (disabled) {
            e.preventDefault();
            return;
        }

        onClick?.(e);
    };

    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    const classes = classNames(
        prefixCls,
        {
            [`${prefixCls}-${type}`]: type,
            // [`${prefixCls}-${shape}`]: shape,
            // [`${prefixCls}-${sizeCls}`]: sizeCls,
            // [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
            // [`${prefixCls}-background-ghost`]: ghost && !isUnborderedButtonType(type),
            // [`${prefixCls}-loading`]: innerLoading,
            // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
            // [`${prefixCls}-block`]: block,
            // [`${prefixCls}-dangerous`]: !!danger,
            // [`${prefixCls}-rtl`]: direction === 'rtl',
          },
        className
    );

    const buttonNode = (
        <button
            {...rest}
            className={classes}
            onClick={handleClick}
            ref={ref}
        >
            {children}
        </button>
    );

    return buttonNode;
};

const Button = React.forwardRef(InnerButton);

export default Button;
