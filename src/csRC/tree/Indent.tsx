import React from 'react';
import styles from './index.less';

interface IndentProps {
  level: number;
  isStart: boolean[];
  isEnd: boolean[];
}

const Indent = ({ level, isStart, isEnd }: IndentProps) => {
  console.log('level', level);
  const list: React.ReactElement[] = [];
  for (let i = 0; i < level; i++) {
    list.push(<span key={i} className={styles['indent-unit']}></span>);
  }
  return <span>{list}</span>;
};

export default Indent;
