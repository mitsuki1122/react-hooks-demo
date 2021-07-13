import React from 'react';

export const {isValidElement} = React;

export function replaceElement(element, replecement, props) {
    if (!isValidElement(element)) return replaceElement;
    return React.cloneElement(element,
        typeof props === 'function' ? props(element.props || {}) : props)
}
export function cloneElement(element, props) {
    return replaceElement(element, element, props);

}