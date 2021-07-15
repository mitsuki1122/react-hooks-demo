import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

const ErrorList = (props) => {
    // status, prefixCls 这个直接传过来，没有使用context
    const {errors = [], help, status, prefixCls, onDomErrorVisibleChange,} = props;
    const [innerStatus, setInnerStatus] = useState(status);

    useEffect(() => {
        // 没写全
        if (status) {
            setInnerStatus(status);
        }
    }, [status]);

    const baseClassName = `${prefixCls}-item-explain`;

    return (
        <div className={classNames(
            baseClassName,
            {[`${baseClassName}-${innerStatus}`]: innerStatus},
        )}>
            {errors.map((error, index) => (
                <div key={index}>
                    {error}
                </div>
            ))}
        </div>
    );
};

export default ErrorList;
