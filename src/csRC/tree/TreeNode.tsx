import React, { useContext, useState } from 'react';
import Indent from './Indent';
import { TreeContext } from './contextTypes';
import styles from './index.less';
import classNames from 'classnames';

// const ICON_OPEN = 'open';
// const ICON_CLOSE = 'close';

const TreeNode = (props: any) => {
  const { eventKey, isStart, isEnd } = props;

  const context = useContext(TreeContext);
  const { keyEntities } = context;
  const { level } = keyEntities[eventKey];
  // const [count, setCount] = useState(0);

  // div? span
  const onExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onNodeExpand } = context;

    // key: props.eventKey 没有用这个
    onNodeExpand(e, { ...props, ...props.data });
  };

  const hasChildren = () => {
    const { children } = keyEntities[eventKey] || {};
    return !!(children || []).length;
  };

  const isLeaf = () => {
    const { isLeaf } = props;

    if (isLeaf === false) {
      return false;
    }
    return isLeaf || !hasChildren();
  };

  const renderSwitcherIconDom = (isLeaf: boolean) => {
    const { switcherIcon: switcherIconFromProps } = props;
    const { switcherIcon: switcherIconFromCtx } = context;

    const switcherIcon = switcherIconFromProps || switcherIconFromCtx;

    if (typeof switcherIcon === 'function') {
      return switcherIcon({ ...props, isLeaf });
    }
    return switcherIcon;
  };

  // Switcher
  const renderSwitcher = () => {
    const { expanded } = props;
    // const { onNodeExpand } = context;
    if (isLeaf()) {
      const switcherIconDom = renderSwitcherIconDom(true);

      return <span className={styles.treeSwitcher}>{switcherIconDom}</span>;
    }
    const switcherIconDom = renderSwitcherIconDom(false);
    return (
      <span
        className={classNames(
          styles.treeSwitcher,
          expanded ? styles.treeSwitcherOpen : styles.treeSwitcherClose
        )}
        onClick={(e: any) => {
          console.log('click');
          onExpand(e);
        }}
      >
        {switcherIconDom}
      </span>
    );
  };

  // title
  const renderSelector = () => {
    const { title, selected, icon, data } = props;
    const { showIcon, icon: treeIcon, titleRender } = context;

    // Title
    let titleNode: React.ReactNode;
    if (typeof title === 'function') {
      titleNode = title(data);
    } else if (titleRender) {
      titleNode = titleRender(data);
    } else {
      titleNode = title;
    }

    const $title = <span>{titleNode}</span>;

    return (
      <span
        onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          const { onNodeClick, onNodeSelect } = context;
          onNodeClick(e);
          onNodeSelect(e);
        }}
      >
        {$title}
      </span>
    );
  };

  return (
    <div>
      <Indent level={level} isStart={isStart} isEnd={isEnd} />
      {renderSwitcher()}
      {renderSelector()}
      {/* <div
        onClick={() => {
          setCount(count + 1);
          setCount(count + 1);
        }}
      >
        测试点击
      </div>
      <div>测试结果{count}</div> */}
    </div>
  );
};

export default TreeNode;
