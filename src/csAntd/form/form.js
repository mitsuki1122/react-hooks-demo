import { useForm } from 'antd/lib/form/Form';
import React, { useMemo } from 'react';
import FieldForm from 'rc-field-form';
import {FormContext} from './context';
import {getPrefixCls}  from './config';

// FieldForm

const InternalForm = (props, ref) => {
    const {name, form, prefixCls: customizePrefixCls, ...rest} = props;
    const [wrapForm] = useForm(form); // wrapForm获取form实例的方法和属性.传进来form和直接useForm()有差别吗?

    const prefixCls = getPrefixCls('form', customizePrefixCls);
    
    console.log('------form-props', props);

    const {__INTERNAL__} = wrapForm; // 这个wrapForm应该不是针对传进来的form，只是获取原型对象。所以要存变量就要进行赋值
    __INTERNAL__.name = name;

    const formContextValue = useMemo(() => ({name}), [name])
    console.log('formmmmm', formContextValue);
    return (
        <FormContext.Provider value={formContextValue}>
        <FieldForm
          id={name}
          name={name}
          form={wrapForm}
          {...rest}
          />
          </FormContext.Provider>
    );

};

const Form = React.forwardRef(InternalForm)

export default Form;
