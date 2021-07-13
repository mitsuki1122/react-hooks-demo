export function toArray(val) {
    if (val === undefined || val === false) return [];
    return Array.isArray(val) ? val : [val];
}

export function getFieldId(namePath, formName) {
    if (!namePath.length) return undefined;

    const mergedId = namePath.join('_');
    return formName ? `${formName}_${mergedId}` : mergedId;
}