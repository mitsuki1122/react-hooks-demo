import React, { useContext } from 'react';
import {Row} from 'antd';
import {Field} from 'rc-field-form';
import FormItemLabel from './formItemLabel';
import FormItemInput from './formItemInput';
import { toArray, getFieldId } from './utils';
import { cloneElement } from '../utils';
import { FormContext } from './context';

function hasValidName(name) {
    return !(name === undefined || name === null);
}

const FormItem = (props) => {
    const {name, noStyle, label, children, required, rules, ...rest} = props;
    const {name: formName} = useContext(FormContext);
    // console.log('mmmmm', props);

    const hasName = hasValidName(name);

    const renderLayout = (baseChildren, fieldId, meta, isRequired) => {
        if (noStyle) {
            return baseChildren;
        }

        return (
            <Row>
                <FormItemLabel
                    htmlFor={fieldId}
                    required={isRequired}
                    {...props} // 组件没有的属性加进来，只选需要的？提示不应该存在的属性可设置devtool提示？
                ></FormItemLabel>
                <FormItemInput>
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
        <Field {...props}>
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
