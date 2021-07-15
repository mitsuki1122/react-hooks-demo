export const defaultPrefixCls = 'ant';
let globalPrefixCls;

function getGlobalPrefixCls() {
    return globalPrefixCls || defaultPrefixCls;
}

export function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
};