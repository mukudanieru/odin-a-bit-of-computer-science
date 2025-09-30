export function clean(arr) {
    return arr
        .filter((value, index, originalArray) => {
            return originalArray.indexOf(value) === index;
        })
        .sort((a, b) => a - b);
}
