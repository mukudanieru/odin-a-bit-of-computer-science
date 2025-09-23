arrOne = [3, 2, 1, 13, 8, 5, 0, 1];
arrTwo = [105, 79, 100, 110];
arrThree = [5, 2, 1, 3, 6];

function mergeSort(arr) {
    let low = 0,
        high = arr.length;

    if (arr.length <= 1) return arr;

    let mid = low + Math.floor((high - low) / 2);
    let left = mergeSort(arr.slice(low, mid));
    let right = mergeSort(arr.slice(mid, high));

    return merge(arr, left, right);
}

function merge(arr, left, right) {
    if (arr.length <= 1) return arr;

    let i = 0, // LEFT IDX
        j = 0, // RIGHT IDX
        k = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }

    for (; i < left.length; i++) {
        arr[k++] = left[i];
    }

    for (; j < right.length; j++) {
        arr[k++] = right[j];
    }

    return arr;
}

console.log(mergeSort(arrOne));
