import React, { useCallback, useMemo } from 'react';
import useChildren from './hooks/useChildren';
import useHeights from './hooks/useHeights';

const RawList = (props: any, ref: any) => {
  const {
    data, // mergedData
    children, //func
    itemKey,
    component = 'div',
  } = props;

  const mergedData = data || [];

  const getKey = useCallback(
    (item: any) => {
      if (typeof itemKey === 'function') {
        return itemKey(item);
      }
      return item?.[itemKey];
    },
    [itemKey]
  );

  const sharedConfig = { getKey };

  const [setInstanceRef] = useHeights(getKey, null, null);

  const { start, end } = useMemo(() => {
    return {
      start: 0,
      end: mergedData.length - 1,
    };
  }, [mergedData]);

  const listChildren = useChildren(
    mergedData,
    start,
    end,
    setInstanceRef, // func
    children,
    sharedConfig //{getKey: func}
  );
  return <div>{listChildren}</div>;
};

export default React.forwardRef(RawList);
