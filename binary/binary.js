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

    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this.insert(value, node.left);
        } else if (value > node.value) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) return;

        if (value < node.value) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.value) {
            node.right = this.deleteItem(value, node.right);
        }

        // FOUND THE NODE TO DELETE!
        else {
            // CASE 1: LEAF NODE (no children)
            if (node.left === null && node.right === null) {
                return null;
            }

            // CASE 2: NODE HAS ONE CHILD
            else if (node.right === null) {
                return node.left;
            } else if (node.left === null) {
                return node.right;
            }

            // CASE 3: NODE HAS TWO CHILDREN
            else {
                const temp = this.findMaxInASubtree(node.left);
                node.value = temp.value;
                node.left = this.deleteItem(temp.value, node.left);
            }
        }

        return node;
    }

    findMaxInASubtree(node, max = -Infinity) {
        if (node.right === null) {
            return node;
        }

        if (node.value > max) {
            max = node.value;
        }

        return this.findMaxInASubtree(node.right, max);
    }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree();
prettyPrint(tree.buildTree(arr));
