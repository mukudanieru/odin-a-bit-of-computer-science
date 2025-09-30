function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array) {
        this.root = this.constructTree(
            array
                .filter((value, index, originalArray) => {
                    return originalArray.indexOf(value) === index;
                })
                .sort((a, b) => a - b)
        );

        return this.root;
    }

    constructTree(arr) {
        const low = 0,
            high = arr.length;

        if (arr.length === 0) return null;

        const mid = low + Math.floor((high - low) / 2);

        const node = new Node(arr[mid]);
        node.left = this.constructTree(arr.slice(low, mid));
        node.right = this.constructTree(arr.slice(mid + 1, high));

        return node;
    }
}

// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr = [7, 6, 5, 4, 3, 2, 1];

const tree = new Tree();
prettyPrint(tree.buildTree(arr));
