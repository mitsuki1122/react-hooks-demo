import React, { useRef } from 'react';

export default function useHeights(getKey, onItemAdd?, onItemRemove?) {
  const instanceRef = useRef(new Map<React.Key, HTMLElement>());
  function setInstanceRef(item: T, instance: HTMLElement) {
    const key = getKey(item);
    const origin = instanceRef.current.get(key);

    if (instance) {
      instanceRef.current.set(key, instance);
      // collectHeight();
    } else {
      instanceRef.current.delete(key);
    }

    // Instance changed
    if (!origin !== !instance) {
      if (instance) {
        onItemAdd?.(item);
      } else {
        onItemRemove?.(item);
      }
    }
  }
  return [setInstanceRef];
}
