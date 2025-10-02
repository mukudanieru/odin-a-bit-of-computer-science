class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null; // Front of the Queue
        this.tail = null; // Back of the Queue
    }

    enqueue(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        this.tail.next = newNode;
        this.tail = this.tail.next;
    }

    dequeue() {
        if (this.isEmpty()) return null;

        const headNode = this.head.data;
        this.head = this.head.next;

        if (this.head === null) {
            this.tail = null;
        }

        return headNode;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

    isEmpty() {
        return this.head === null;
    }

    toString() {
        let linkedListString = "head -->";

        if (this.head === null) {
            linkedListString += " (null) Empty List";
            return linkedListString;
        }

        let pointer = this.head;

        while (pointer !== null) {
            linkedListString += ` (${pointer.data}) -->`;
            pointer = pointer.next;
        }

        linkedListString += " null";

        return linkedListString;
    }
}

class Stack {
    constructor() {
        this.head = null; // Top of the stack
    }

    push(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            return;
        }

        newNode.next = this.head;
        this.head = newNode;
    }

    pop() {
        if (this.isEmpty()) return null;

        const headNode = this.head.data;
        this.head = this.head.next;

        return headNode;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

    isEmpty() {
        return this.head === null;
    }

    toString() {
        let linkedListString = "head -->";

        if (this.head === null) {
            linkedListString += " (null) Empty List";
            return linkedListString;
        }

        let pointer = this.head;

        while (pointer !== null) {
            linkedListString += ` (${JSON.stringify(pointer.data)}) -->`;
            pointer = pointer.next;
        }

        linkedListString += " null";

        return linkedListString;
    }
}

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

export { Queue, Stack, prettyPrint };
