import React from 'react';

export interface TreeContextProps {
  selectable: boolean;
  keyEntities: any;
  switcherIcon: React.ReactNode | ((props: any) => React.ReactNode);
  onNodeExpand: (e: React.MouseEvent, treeNode: any) => void;
}

export const TreeContext: React.Context<TreeContextProps | null> =
  React.createContext(null);
