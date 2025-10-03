import { Queue } from "./helper.js";

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
                const temp = this.findMaxInTheRightSubtree(node.left);
                node.value = temp.value;
                node.left = this.deleteItem(temp.value, node.left);
            }
        }

        return node;
    }

    findMaxInTheRightSubtree(node) {
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    }

    find(value, node = this.root) {
        if (node === null) return null;

        if (value < node.value) {
            return this.find(value, node.left);
        } else if (value > node.value) {
            return this.find(value, node.right);
        }

        return node;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new TypeError(
                `Expected a function as the callback argument, but received ${typeof callback}`
            );
        }

        const queue = new Queue();
        queue.enqueue(this.root);

        // Default is iterative, feel free to switch to recursive
        // Uncomment one of the following lines to choose which traversal method to use:

        console.log("\nLevel-Order Traversal: ");

        // Iterative approach:
        this.bfsIterative(callback, queue);

        // Recursive approach:
        // this.bfsRecursive(callback, queue);
    }

    bfsIterative(callback, queue) {
        if (this.root === null) return;

        while (!queue.isEmpty()) {
            let pointer = queue.dequeue();
            callback(pointer.value);

            if (pointer.left !== null) {
                queue.enqueue(pointer.left);
            }
            if (pointer.right !== null) {
                queue.enqueue(pointer.right);
            }
        }
    }

    bfsRecursive(callback, queue) {
        if (this.root === null) return;

        if (queue.isEmpty()) return;

        let pointer = queue.dequeue();
        callback(pointer.value);

        if (pointer.left !== null) {
            queue.enqueue(pointer.left);
        }
        if (pointer.right !== null) {
            queue.enqueue(pointer.right);
        }

        this.bfsRecursive(callback, queue);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new TypeError(
                `Expected a function as the callback argument, but received ${typeof callback}`
            );
        }

        console.log("\nPre-Order Traversal: ");
        this.dfsPreOrderRecursive(callback, this.root);
    }

    dfsPreOrderRecursive(callback, node) {
        if (node === null) return;

        callback(node.value);
        this.dfsPreOrderRecursive(callback, node.left);
        this.dfsPreOrderRecursive(callback, node.right);
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new TypeError(
                `Expected a function as the callback argument, but received ${typeof callback}`
            );
        }

        console.log("\nIn-Order Traversal: ");
        this.dfsInOrderRecursive(callback, this.root);
    }

    dfsInOrderRecursive(callback, node) {
        if (node === null) return;

        this.dfsInOrderRecursive(callback, node.left);
        callback(node.value);
        this.dfsInOrderRecursive(callback, node.right);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new TypeError(
                `Expected a function as the callback argument, but received ${typeof callback}`
            );
        }

        console.log("\nPost-Order Traversal: ");
        this.dfsPostOrderRecursive(callback, this.root);
    }

    dfsPostOrderRecursive(callback, node) {
        if (node === null) return;

        this.dfsPostOrderRecursive(callback, node.left);
        this.dfsPostOrderRecursive(callback, node.right);
        callback(node.value);
    }

    height(value) {
        const node = this.find(value, this.root);
        if (node === null) return null;

        return this.calculateHeight(node);
    }

    calculateHeight(node) {
        if (node === null) return -1;

        const left = this.calculateHeight(node.left);
        const right = this.calculateHeight(node.right);

        return 1 + Math.max(left, right);
    }

    depth(value) {
        const node = this.find(value);
        if (node === null) return null;

        return this.calculateDepth(value);
    }

    calculateDepth(value, node = this.root) {
        if (value === node.value) return 0;

        if (value < node.value) {
            return 1 + this.calculateDepth(value, node.left);
        } else if (value > node.value) {
            return 1 + this.calculateDepth(value, node.right);
        }
    }

    isBalanced() {
        return this.checkBalance()[1];
    }

    checkBalance(node = this.root) {
        if (node === null) return [-1, true];

        const left = this.checkBalance(node.left);
        const right = this.checkBalance(node.right);

        const height = 1 + Math.max(left[0], right[0]);

        if (left[1] === false || right[1] === false) {
            return [height, false];
        }

        if (Math.abs(left[0] - right[0]) > 1) {
            return [height, false];
        } else {
            return [height, true];
        }
    }

    rebalance() {
        const arr = [];
        this.levelOrderForEach((value) => {
            arr.push(value);
        });

        this.buildTree(arr);
    }
}

export { Tree };
