export const objectIsEmpty = (object: {}): boolean => {
    return Object.keys(object).length > 0 ? false : true;
}