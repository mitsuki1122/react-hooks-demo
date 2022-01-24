import React, { useContext, useState } from 'react';
import {Row} from 'antd';
import {Field} from 'rc-field-form';
import FormItemLabel from './formItemLabel';
import FormItemInput from './formItemInput';
import { toArray, getFieldId } from './utils';
import { cloneElement } from '../utils';
import { FormContext, FormItemContext } from './context';
import {getPrefixCls}  from '../config';
import FieldContext from 'rc-field-form/lib/FieldContext';

function hasValidName(name) {
    return !(name === undefined || name === null);
}

const FormItem = (props) => {
    const {name, noStyle, label, children, required, rules, validateStatus, help, prefixCls: customizePrefixCls,
        trigger = 'onChange', validateTrigger, ...rest} = props;
    const {name: formName} = useContext(FormContext);
    const {updateItemErrors} = useContext(FormItemContext);
    const [domErrorVisible, innerSetDomErrorVisible] = useState(!!help);
    const {validateTrigger: contextValidateTrigger} = useContext(FieldContext);

    const mergedValidateTrigger = validateTrigger !== undefined ? validateStatus : contextValidateTrigger;
    console.log('mergedValidateTrigger', mergedValidateTrigger);

    const setDomErrorVisible = (visible) => {
        // innerSetDomErrorVisible(visible);
    };
    const hasName = hasValidName(name);

    const prefixCls = getPrefixCls('form', customizePrefixCls);

    const renderLayout = (baseChildren, fieldId, meta, isRequired) => {
        if (noStyle) {
            return baseChildren;
        }

        let mergedErrors;
        if (help != undefined && help !== null) {
            mergedErrors = toArray(help);
        } else {
            mergedErrors = meta ? meta.errors : [];
            // 还有一些错误合并
        }

        let mergedValidateStatus = '';
        if (validateStatus !== undefined) {
            mergedValidateStatus = validateStatus;
        } else if (meta?.validating) {
            mergedValidateStatus = 'validateStatus';
        } else if (meta?.errors?.length) {
            mergedValidateStatus = 'error';
        } else if (meta?.touched) {
            mergedValidateStatus = 'success';
        }


        return (
            <Row>
                <FormItemLabel
                    htmlFor={fieldId}
                    required={isRequired}
                    {...props} // 组件没有的属性加进来，只选需要的？提示不应该存在的属性可设置devtool提示？
                    prefixCls={prefixCls}
                ></FormItemLabel>
                <FormItemInput
                {...props}
                {...meta}
                errors={mergedErrors}
                prefixCls={prefixCls}
                status={mergedValidateStatus}
                onDomErrorVisibleChange={setDomErrorVisible}> {/*重复属性如何覆盖？*/}
                    {baseChildren}
                </FormItemInput>
            </Row>
        );
    };

    const isRenderProps = typeof children === 'function';

    if (!hasName && !isRenderProps) {
        return renderLayout(children);
    }

    return (
        <Field
            {...props}
            trigger={trigger}
            validateTrigger={mergedValidateTrigger}
        >
            {
                (control, meta, context) => {
                    // console.log('Field----control', control); // onChange, value
                    console.log('Field----meta', meta);       // 错误信息，验证状态
                    // console.log('Field----context', context); // 当前Form的实例
                    const {errors} = meta;

                    const mergedName = toArray(name).length && meta
                        ? toArray(name) // 这里先不用这个，因为meta.name现在是undefined meta.name。修改：这里此前只写了meta一个参数，导致meta内容获取的是control的内容。这种情况应该按参数顺序来
                        : [];
                    const fieldId = getFieldId(mergedName, formName);

                    const isRequired =
                      required !== undefined
                        ? required
                        : !!(rules && rules.some(rule => {
                            if (rule && typeof rule === 'object' && rule.required) {
                                return true;
                            }
                            if (typeof rule === 'function') {
                                // todo
                            }
                            return false;
                        }));

                    const mergedControl = {...control};
                    
                    let childNode = null;

                    if (Array.isArray(children)) {
                        childNode =  children;
                    } else if (React.isValidElement(children)) {
                        const childProps = {...children.props, ...mergedControl}; // mergedControl, 把value，onChange传递给cloneElement,否则子组件无法响应change。对子组件又包了一层，相当于把子组件变成自定义的，类似于录题中的自定义表单项。
                        if (!childProps.id) {
                            childProps.id = fieldId;
                        }
                        // childNode = (
                        //     // <MemoInput />
                        // );

                        const triggers = new Set([
                            ...toArray(trigger),
                            ...toArray(mergedValidateTrigger)
                        ]);

                        triggers.forEach(eventName => {
                            childProps[eventName] = (...args) => {
                                mergedControl[eventName]?.(...args);
                                children.props[eventName]?.(...args);
                            };
                        });

                        childNode = cloneElement(children, childProps);
                    } else {
                        childNode =  children;
                    }

                    return renderLayout(childNode, fieldId, meta, isRequired);
                }
            }
        </Field>
    );
};

export default FormItem;
