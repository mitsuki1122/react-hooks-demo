import React, { PureComponent, Fragment, useRef, useState } from 'react';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import {
  Modal,
  Checkbox,
  Transfer,
  Table
} from 'antd';
import _ from 'lodash';
import difference from 'lodash/difference';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

class BasicList extends PureComponent {

  state = {
    selectedKeysTrans: [],
    fieidConfigureData: [], //  左边数据源
    chosenKeys: [], 	 // 显示在右侧框数据的 key 集合
    mockData: [],
    targetKeys: [],
    test: false,
    currentKey: [],
    filteredItems: [],//右侧表格数据
    pageDataList: [ //表格全部数据
      {
        "custId": 1,
        'key': '1',
        "name": "1",
      },
      {
        "custId": 2,
        'key': '2',
        "name": "2",
      },
      {
        "custId": 3,
        'key': '3',
        "name": "3",
      },
      {
        "custId": 4,
        'key': '4',
        "name": "4",
      },
      {
        "custId": 5,
        'key': 5,
        "name": "5",
      },
      {
        "custId": 6,
        'key': 6,
        "name": "6",
      },
      {
        "custId": 7,
        'key': 7,
        "name": "7",
      },
      {
        "custId": 8,
        'key': 8,
        "name": "8",
      },
    ]
  };


  handleChangeClick = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys: targetKeys }); // add
    const { chosenKeys } = this.state
    const tempKeys = chosenKeys;
    if (direction === 'right') {
      moveKeys.forEach(item => {
        tempKeys.push(item);
      });
    } else {
      moveKeys.forEach(item => {
        tempKeys.splice(tempKeys.indexOf(item), 1);
      });
    }
    console.log()
    this.setState({ 
      chosenKeys: tempKeys, 
      filteredItems: tempKeys.map(e => this.state.pageDataList.find(o => o.key == e)) //右侧表格数据
    });
  }

  // add
  onChange = nextTargetKeys => {
    console.log('change', nextTargetKeys);
    this.setState({ targetKeys: nextTargetKeys });
  };


  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  render() {
    const {
      chosenKeys,
      pageDataList
    } = this.state;

    // 这里就是穿梭框数据 以及 拖拽处理
    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
      <Transfer {...restProps} showSelectAll={false}>
        {({
          direction,
          onItemSelectAll,
          onItemSelect,
          filteredItems,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          console.log('初始化, direction', direction);
          const columns = direction === 'left' ? leftColumns : rightColumns;
          if(direction === 'right'){
            
          }
          const rowSelection = {
            onSelectAll(selected, selectedRowsTable, changeRows) {
              const treeSelectedKeys = selectedRowsTable
                .filter(item => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              console.log(diffKeys, selected, 'diffKeys, selected');
              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }, selected) {
              console.log('🚀', listSelectedKeys)
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };
          //drag没有是用的官方的 没更新视图
          // 拖拽事件======moveRowt 测试
          const moveRowt = (dragIndex, hoverIndex) => {
            const dragRow = filteredItems[dragIndex];
            let upd = []
            upd = update(filteredItems, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow],
              ],
            })
            filteredItems = upd
            console.log(upd.map(e => e.key))
            this.setState({
              filteredItems
            })
          };
          return (
            direction === 'left' ?
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredItems}
                size="small"
                scroll={{ y: 340 }}
                // onChange={this.handleTableChange}
                pagination={false}
                style={{ pointerEvents: listDisabled ? 'nonecu' : null }}

                onRow={({ key, disabled: itemDisabled }) => ({
                  onClick: () => {
                    if (itemDisabled || listDisabled) return;
                    onItemSelect(key, !listSelectedKeys.includes(key));

                  },
                })}
              />
              :
              <DndProvider backend={HTML5Backend}>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  // 数据处理问题filteredItemData?filteredItemData:  
                  dataSource={this.state.filteredItems} // filteredItemData 组件本身过滤处理的数据-
                  size="small"
                  // onChange={this.handleTableChange}
                  // pagination={pagination}
                  pagination={false}
                  components={this.components}
                  style={{ pointerEvents: listDisabled ? 'none' : null }}
                  // clcick
                  onRow={({ key, disabled: itemDisabled }) => ({
                    onClick: () => {
                      console.log(key, disabled)
                      if (itemDisabled || listDisabled) return;
                      onItemSelect(key, !listSelectedKeys.includes(key));
                    },
                  })}
                  onRow={(record, index) => ({
                    index,
                    moveRow: moveRowt,//拖拽事件
                  })}
                />
              </DndProvider>
          );
        }}
      </Transfer>
    )
    const leftTableColumns = [
      {
        dataIndex: 'name',
        title: '可导出字段',
        // filters: [
        //   { text: 'Joe', value: 'Joe' },
        //   { text: 'Jim', value: 'Jim' },
        // ],
        // filteredValue: mockData.description|| null,
      },
    ];
    const rightTableColumns = [
      {
        dataIndex: 'name',
        title: '导出字段',
      },
    ];
    // 模态框配置
    const modalConfig2 = {
      title: <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>导出字段配置</span> <span><Checkbox >记住我的选择</Checkbox></span></div>,
      visible: true,
      onOk: this.assignSubmit,
      okText: '确定',
      onCancel: this.handleCancle,
      closable: false,
      destroyOnClose: true,
    };
    return (
      <Modal {...modalConfig2} width={700}>
          <TableTransfer
            dataSource={pageDataList}
            // rowKey={record => record.custId}
            targetKeys={chosenKeys}
            // titles={['可导出字段', '导出字段']}  
            // disabled={disabled}
            listStyle={{
              width: 250,
              // height: 300,
            }}
            // showSearch={showSearch}
            showSearch
            onChange={this.handleChangeClick}
            render={item => item.name}
            filterOption={(inputValue, item) =>
              item.name.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </Modal>
    );
  }
}

export default BasicList;
