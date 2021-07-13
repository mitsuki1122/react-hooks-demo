import React from 'react';
import {Col, Tooltip} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import {FormContext} from './context';

function toTooltipProps(tooltip) {
if (!tooltip) {
    return null;
}

// if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
//     return tooltip;
// }

return {
    title: tooltip,
};
}

const FormItemLabel = (props) => {
    console.log('itemmmm', props);
    const {label, htmlFor, labelCol, requiredMark, required, tooltip} = props;

    if (!label) return null;

    return (<FormContext.Consumer>
        {({vertical, labelAlign: contextLabelAlign, labelCol: contextLabelCol}) => {
            const mergerdLabelCol = labelCol || contextLabelCol || {};
            let labelChildren = label;

            const labelClsBasic = 'ant-form-item-label';
            const labelColClassName = classNames( // 这个里面不是对象
                labelClsBasic,
                mergerdLabelCol.className
            );

            console.log('labelColClassName', labelColClassName);

            const labelClassName = classNames({
                'ant-form-item-required': required,
            });
            // Tooltip
            const tooltipProps = toTooltipProps(tooltip);
            if (tooltipProps) {
                const icon = <QuestionCircleOutlined />;
                const tooltipNode = (
                    <Tooltip>
                        {React.cloneElement(icon)}
                    </Tooltip>
                );
                labelChildren = (
                    <>
                        {labelChildren}
                        {tooltipNode}
                    </>
                );
            }

            // add required mark
            if (required) { // 这里先与源码写的不一样
                labelChildren = (
                    <>
                        {labelChildren}
                    </>
                );
            }
            
            return (
                <Col className={labelColClassName}>
                <label
                    htmlFor={htmlFor}
                    className={labelClassName}
                    title={label}>
                        {labelChildren}
                </label>
                </Col>
            );}
        }
    </FormContext.Consumer>
    )
};

export default FormItemLabel;
