import React from 'react';
import NodeList, { MOTION_KEY, MotionEntity } from './NodeList';
import {
  flattenTreeData,
  // convertTreeToData,
  convertDataToEntities,
  // warningWithoutKey,
  // convertNodePropsToEventData,
  // getTreeNodeProps,
  fillFieldNames,
  expandedKeysAdd,
  expandedKeysDel,
} from './utils/treeUtil';
import { renderSwitcherIcon } from './utils/iconUtil';
import { TreeContext } from './contextTypes';

interface TreeProps {
  treeData: any;
  switcherIcon: React.ReactNode | (() => React.ReactNode);
  showLine: boolean;
  onSelect?: (key: React.Key, info: any) => void;
}
interface TreeState {
  treeData: any;
  prevProps?: any;
  keyEntities: any;
  selectedKeys: any;
  expandedKeys: any;
  flattenNodes: any;
  fieldNames: any;
}
class Tree extends React.Component<TreeProps, TreeState> {
  static defaultProps = {};

  state: TreeState = {
    keyEntities: {},

    selectedKeys: [],
    expandedKeys: [],

    treeData: [],
    flattenNodes: [],

    // fieldNames: fillFieldNames(), // { title: 'title', _title:['title'], key: 'key',children: 'children' }
    fieldNames: {
      title: 'title',
      _title: ['title'],
      key: 'key',
      children: 'children',
    },
  };

  listRef = React.createRef();

  static getDerivedStateFromProps(props: TreeProps, prevState: TreeState) {
    const { prevProps } = prevState;
    const newState: Partial<TreeState> = { prevProps: props };

    // === Tree Node ===
    // let treeData;
    const { fieldNames } = prevState;

    const { treeData } = props;

    if (treeData) {
      newState.treeData = treeData;
      const entitiesMap = convertDataToEntities(treeData, { fieldNames });
      /**
       * keyEntities:
       * 0-0: children: [...], index: 0, key: '0-0', level: 0, node: {children: [...], key: '0-0', title: '0-0'}, parent: undefined, pos: '0-0
       * 0-0-0: children: [...], index: 0, key: '0-0-0', level: 1, node: {title: '0-0-0', key: '0-0-0', children: [...], parent: {node:{...}, index: 0, key: '0-0', pos: '0-0', level: 0...}}, pos: '0-0-0'
       * 0-0-0-0：index: 0, level: 2, ...
       * 0-0-0-1: index: 1, level: 2,
       * 0-0-1: index: 1, level: 1, ...
       * 0-1: index:1, level: 0,
       * 0-2: index: 2, level 0
       *posEntities: 同keyEntities
       */

      newState.keyEntities = {
        [MOTION_KEY]: MotionEntity,
        ...entitiesMap.keyEntities,
      };
    }

    // === flattenNodes ===
    if (treeData || newState.expandedKeys) {
      const flattenNodes: any[] = flattenTreeData(
        treeData || prevState.treeData,
        newState.expandedKeys || prevState.expandedKeys,
        fieldNames
      );
      console.log('flattenNodes', flattenNodes);
      newState.flattenNodes = flattenNodes;
    }
    /**
     * flattenNodes
     * 0: children: [], data: {children:[...], key: '0-0', title: '0-0'}, isEnd: [false], isStart: [true], key:'0-0',parent: null, pos: '0-0', title: '0-0'
     * 1: children:[], data:{...}, inEnd: [false], isStart: [false], key: '0-1',parent: null,pos: '0-1', title: '0-1'
     * 2: children: [], data: {...}, isEnd: [true], isStart: [false], key: '0-2', parent: null, pos: '0-2', title: '0-2'
     */

    return newState;
  }

  setExpandedKeys = (expandedKeys: React.Key[]) => {
    const { treeData, fieldNames } = this.state;

    const flattenNodes = flattenTreeData(treeData, expandedKeys, fieldNames);

    this.setState({
      expandedKeys,
      flattenNodes,
    });
  };

  onNodeSelect = (e: React.MouseEvent, treeNode: any) => {
    const { selectedKeys } = this.state;
    const { fieldNames } = this.state;
    const { onSelect } = this.props;

    const { selected } = treeNode;
    const key = treeNode[fieldNames.key];

    // TODO:更新selected keys

    if (onSelect) {
      onSelect(selectedKeys, {
        event: 'select',
        // selected: targetSelected, // 是否选中
        node: treeNode, // 被选中的node节点的node信息
        // selectedNodes, // 被选择的node节点的treeData信息
        nativeEvent: e.nativeEvent,
      });
    }
  };

  // HTMLDivElement? span?
  onNodeExpand = (e: React.MouseEvent<HTMLDivElement>, treeNode: any) => {
    let { expandedKeys } = this.state;
    const { fieldNames } = this.state;
    const { onExpand } = this.props;
    const { expanded } = treeNode;
    const key = treeNode[fieldNames.key];

    const index = expandedKeys.indexOf(key);
    const treeNodeExpanded = !expanded;

    if (treeNodeExpanded) {
      expandedKeys = expandedKeysAdd(expandedKeys, key);
    } else {
      expandedKeys = expandedKeysDel(expandedKeys, key);
    }

    this.setExpandedKeys(expandedKeys);

    onExpand?.(expandedKeys, {
      node: treeNode,
      expanded: treeNodeExpanded,
      nativeEvent: e.nativeEvent,
    });
  };

  render() {
    const { flattenNodes, keyEntities, expandedKeys } = this.state;
    const { switcherIcon, showLine } = this.props;

    // virtual-list List.tsx
    /**
     * mergedData: patternNode
     * start: 0
     * end: 2
     * setInstanceRef: func
     * children: func,
     * sharedConfig: {getKey: func}
     */
    /**
     * listChildren
     * 0: $$typeof: Symbol(react.element), key: '0-0', props: {children: {...}, setRef: f}, ref: null, type: func, _owner: FiberNode, _store: null, _source: null
     */

    return (
      <TreeContext.Provider
        value={{
          selectable: true,
          keyEntities,
          switcherIcon: (nodeProps: any) => {
            return renderSwitcherIcon('', switcherIcon, showLine, nodeProps);
          },
          onNodeExpand: this.onNodeExpand,
        }}
      >
        <div>
          <div>自定义tree</div>
          <NodeList
            ref={this.listRef}
            data={flattenNodes}
            expandedKeys={expandedKeys}
          />
        </div>
      </TreeContext.Provider>
    );
  }
}

export default Tree;
