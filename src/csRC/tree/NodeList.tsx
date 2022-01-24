import React, { useEffect, useState } from 'react';
import VirtualList from './List';
import TreeNode from './TreeNode';
import { getKey } from './utils/treeUtil';
import { findExpandedKeys, getExpandRange } from './utils/diffUtil';

export const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;

const MotionNode = {
  key: MOTION_KEY,
};

export const MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: '0',
  node: MotionNode,
  nodes: [MotionNode],
};

const MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,
  title: null,
  key: MOTION_KEY,
  isStart: [],
  isEnd: [],
};

const itemKey = (item: any) => {
  const { key, pos } = item;
  return getKey(key, pos);
};

const RefNodeList = (props: any, ref: any) => {
  const {
    data, // flattenNode

    expandedKeys,
    selectedKeys,

    motion = true,
  } = props;

  const listRef = React.useRef(null);

  const [prevExpandedKeys, setPrevExpandedKeys] = useState(expandedKeys);
  const [prevData, setPrevData] = useState(data);
  const [transitionData, setTransitionData] = useState(data);
  const [transitionRange, setTransitionRange] = React.useState([]);

  const mergedData = motion ? transitionData : data;

  useEffect(() => {
    setPrevExpandedKeys(expandedKeys);
    // 应该是同步执行之后，再改变prevExpandedKeys
    const diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        const keyIndex = prevData.findIndex(
          ({ data: { key } }) => key === diffExpanded.key
        );

        const newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);

        const expandedNodes = getExpandRange(prevData, data, diffExpanded.key);

        setTransitionData(newTransitionData);
        setTransitionRange(expandedNodes);
      } else {
        const keyIndex = data.findIndex(
          ({ data: { key } }) => key === diffExpanded.key
        );

        const newTransitionData = data.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);

        const expandedNodes = getExpandRange(data, prevData, diffExpanded.key);

        setTransitionData(newTransitionData);
        setTransitionRange(expandedNodes);
      }
    }
    // else if (prevData !== data) {
    //   setPrevData(data);
    //   setTransitionData(data);
    // }
  }, [expandedKeys, data]);

  return (
    <>
      <VirtualList ref={listRef} data={mergedData} itemKey={itemKey}>
        {(treeNode: any) => {
          const {
            pos,
            data: { ...restProps },
            title,
            key,
            isStart,
            isEnd,
          } = treeNode;

          const mergedKey = key;

          const motionNodes = key === MOTION_KEY ? transitionRange : null;
          if (motionNodes) {
            return (
              <>
                {motionNodes.map((item) => {
                  const { title, key, isStart, isEnd } = item;
                  return (
                    <TreeNode
                      key={key}
                      eventKey={key}
                      {...item}
                      title={title}
                      data={item.data}
                      isStart={isStart}
                      isEnd={isEnd}
                    />
                  );
                })}
              </>
            );
          }
          return (
            <TreeNode
              // {...props}
              {...treeNode}
              eventKey={key}
              expanded={expandedKeys.indexOf(key) !== -1}
              // title={title}
              // pos={pos}
              // data={treeNode.data}
              // isStart={isStart}
              // isEnd={isEnd}
              // motionNodes={motionNodes}
            />
          );
        }}
      </VirtualList>
    </>
  );
};
const NodeList = React.forwardRef(RefNodeList);

export default NodeList;
