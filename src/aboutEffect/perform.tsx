import React, { useEffect, useState } from 'react';

const Perform = () => {
  const [dataSource, setDataSource] = useState({});
  const [columns, setColumns] = useState([]);

  console.log('执行组件');
  console.log('dataSource', dataSource);
  console.log('columns', columns);

  const baseColumns = [
    {
      key: 'key1',
      render: () => {
        console.log('dataSource[key1]', dataSource['key1']);
        return dataSource['key1'];
      },
    },
  ];

  const generateFn = () => {
    setTimeout(() => {
      const data = { key1: 'value1', key2: 'value2' };
      setDataSource(data);
      setColumns(baseColumns);
    }, 3000);
  };

  const generateFn1 = () => {
    setTimeout(() => {
      const data = { key1: 'value1', key2: 'value2' };
      setDataSource(data);
    }, 3000);
  };

  useEffect(() => {
    setColumns(baseColumns);
  }, [dataSource]);

  useEffect(() => {
    // generateFn();
    generateFn1();
  }, []);

  return (
    <div>
      <p>
        state依赖另一个state，获取到函数后同时setState，结果是没有获得预期的渲染
        setState的值在执行的时候确定，同步的setState会依次执行。
        state中依赖的state并不是一个地址不变的值（Ref），更新是由重新渲染产生的。
        <strong>
          同步执行导致的更新，state打印是最新值。但是在匿名函数中定义的值如何变化需要看源码(是匿名函数闭包的原因吗？)
        </strong>
      </p>
      {columns.map((column, index) => {
        return (
          <div key={column.key}>
            <span>{`第${index + 1}行`}</span>
            <span>{column.render()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Perform;
