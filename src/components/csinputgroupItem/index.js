import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Space } from 'antd';
import { MinusCircleOutlined, UpOutlined, DownOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const DynamicFieldSet = ({value, onChange, form}) => {
  const [checkedVal, setCheckedVal] = useState(-1);
  const [inputList, setInputList] = useState(['']);

  const triggerChange = (changedValue) => {
    debugger
    let test = {
        checkedVal,
        inputList,
        ...value,
        ...changedValue
    };
      onChange?.({
          checkedVal,
          inputList,
          ...value,
          ...changedValue
      });
  };

  const onRadioChange = (e) => {
    debugger
    console.log('radio');
    setCheckedVal(e.target.value);
    triggerChange({
        checkedVal: e.target.value
    });
  };

  const onInputChange = (value, index) => {
      debugger
      console.log('6666');
    inputList[index] = value;
    const newList = [...inputList];
    setInputList(newList);
    triggerChange({
        inputList: newList
    });
  };

  const add = () => {
    inputList.push('');
    const newList = [...inputList];
    setInputList(newList);
    // 这里不需要触发trigger也可以更新？
  };

  const move = (e, from, to) => {
    // e.stopPropagation();
    const tmp = inputList[to];
    inputList[to] = inputList[from];
    inputList[from] = tmp;
    const newList = [...inputList];
    setInputList(newList);
    triggerChange({
        inputList: newList
    });
  };

  const remove = (index) => {
    const leftpart = inputList.slice(0, index);
    const rightpart = inputList.slice(index + 1);
    const newList = [...leftpart, ...rightpart]
    setInputList(newList);
    triggerChange({
        inputList: newList
    }); 

    if (index === checkedVal) {
      setCheckedVal(null);
      triggerChange({checkedVal: null});
      return;
    }
    if (checkedVal > index) {
      setCheckedVal(index);
      triggerChange({checkedVal: index});
      return;
    }
  };

  useEffect(() => {
      debugger
      console.log('value', value);
    // setFieldsValue{checkedVal: 1, inputList: ['1', '2']};
    // setInputList(value.inputList);
    // setCheckedVal(value.checkedVal);
  }, [value]);

  return (
    <>
      {/* <Radio.Group> */}
        <Space direction="vertical">
          {
            inputList.map((item, index) => {
              return (
              <div key={index} style={{display: 'flex'}}>
                <div style={{position: 'relative'}}>
                  <Radio value={index} checked={checkedVal === index} onChange={onRadioChange}>
                    <Space><span>{(index + 10).toString(36).toUpperCase()}</span>
                    <Input
                      value={item}
                      style={{ height: '30px' }}
                      onChange={(e) => onInputChange.call(e, e.target.value, index)} />
                    </Space>
                  </Radio>
                </div>
                <div>
                  <Space>
                    <Button
                      disabled={index === 0}
                      size="small"
                      icon={<UpOutlined />}
                      onClick={(e) => move(e, index, index-1)}
                    />
                    <Button
                      disabled={index === inputList.length - 1}
                      size="small"
                      icon={<DownOutlined />}
                      onClick={(e) => move(e, index, index+1)}
                    />
                    <Button
                      size="small"
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(index)}
                    />
                  </Space>
                </div>
              </div>
              )
            })
          }
          </Space>
      {/* </Radio.Group> */}
      <div>
      <Button
        type="dashed"
        onClick={() => add()}
        icon={<PlusOutlined />}
      >
        添加选项
      </Button>
      <Button
        type="dashed"
        onClick={() => add()}
        icon={<PlusOutlined />}
      >
        批量添加选项
      </Button>
      <Button
        type="dashed"
        onClick={() => add()}
        icon={<CloseOutlined />}
      >
        删除全部选项
      </Button>
      </div>
      
    </>
  );
};

// export default DynamicFieldSet;

const Demo = () => {
    const onFinish = (values) => {
        console.log('Received values from form: ', values);
    };
    
    const onFail = (value) => {
        console.log(value);
    };

    return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      onFail={onFail}
      initialValues={{
        users: {
            checkedVal: 1,
            inputList: ["1", "2", "3"]
        }
      }}
    >
        <Form.Item label='自定义' name='users'>
            <DynamicFieldSet />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>);
};

export default Demo;
