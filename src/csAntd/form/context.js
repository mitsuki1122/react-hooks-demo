import React from 'react';

export const FormContext = React.createContext({
    labelAlign: 'right',
    vertical: false,
    itemRef: (() => {}),
  });

export const FormItemContext = React.createContext({
  updateItemErrors: () => {},
});