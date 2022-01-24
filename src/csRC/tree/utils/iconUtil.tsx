import React from 'react';
import { CaretDownFilled } from '@ant-design/icons';
import styles from '../index.less';

export function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode,
  showLine: boolean | undefined,
  {
    isLeaf,
    expanded,
    loading,
  }: { isLeaf: boolean; expanded: boolean; loading: boolean }
) {
  if (isLeaf) {
    return null;
  }
  return <CaretDownFilled className={styles.treeSwitcherIcon} />;
}
