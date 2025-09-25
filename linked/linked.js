class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    append(value) {
        const newNode = new Node(value); // [value] --> null

        if (this._size === 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            this._tail.nextNode = newNode;
            this._tail = this._tail.nextNode;
        }

        this._size++;
    }

    prepend(value) {
        const newNode = new Node(value); // [value] --> null

        if (this._size === 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            newNode.nextNode = this._head; // [ newNode ] --> [ _headLIST ] --> ...
            this._head = newNode; // [ newHEAD ] --> [ newNode ] --> [ oldHeadLIST ] --> ...
        }

        this._size++;
    }

    size() {
        // return this._size;
        return `number of nodes --> (${this._size})`;
    }

    head() {
        // return this._head;
        return `head --> (${this._head.value})`;
    }

    tail() {
        // return this._tail;
        return `tail --> (${this._tail.value})`;
    }

    at(index) {
        let i = 0;
        let pointer = this._head;

        while (pointer !== null) {
            if (index === i) {
                return pointer;
            }

            i++;
            pointer = pointer.nextNode;
        }

        return null;
    }

    pop() {
        if (this._size === 0) return null;

        let lastNode = this._tail;

        if (this._size === 1) {
            this._head = null;
            this._tail = null;
            this._size--;
            return lastNode;
        }

        let pointer = this._head;

        while (pointer !== null) {
            if (
                pointer.nextNode !== null &&
                pointer.nextNode.nextNode === null
            ) {
                pointer.nextNode = null;
                this._tail = pointer;
                this._size--;
                return lastNode;
            }

            pointer = pointer.nextNode;
        }
    }

    contains(value) {
        let pointer = this._head;

        while (pointer !== null) {
            if (pointer.value === value) return true;

            pointer = pointer.nextNode;
        }

        return false;
    }

    find(value) {
        let idx = 0;
        let pointer = this._head;

        while (pointer !== null) {
            if (pointer.value === value) return idx;

            pointer = pointer.nextNode;
            idx++;
        }

        return null;
    }

    toString() {
        let linkedListString = "head -->";

        if (this.size === 0) {
            linkedListString += " (null)\nEmpty List";
            return linkedListString;
        }

        let pointer = this._head;
        // console.log(pointer);
        // console.log(this.size);

        while (pointer !== null) {
            linkedListString += ` (${pointer.value}) -->`;
            // console.log(pointer.value);
            pointer = pointer.nextNode;
        }

        linkedListString += " null";

        return linkedListString;
    }
}

list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log("=== LinkedList Tests ===\n");

console.log("Linked List:");
console.log(list.toString());
// Expected: head --> (dog) --> (cat) --> (parrot) --> (hamster) --> (snake) --> (turtle) --> null

console.log("\nSize:");
console.log(list.size());
// Expected: number of nodes --> (6)

console.log("\nHead:");
console.log(list.head());
// Expected: head --> (dog)

console.log("\nTail:");
console.log(list.tail());
// Expected: tail --> (turtle)

console.log("\nNode at index 2:");
console.log(list.at(2));
// Expected: Node { value: 'parrot', nextNode: Node { ... } }

console.log("\nNode at index 5:");
console.log(list.at(5));
// Expected: Node { value: 'turtle', nextNode: null }

console.log("\nContains 'hamster'?");
console.log(list.contains("hamster"));
// Expected: true

console.log("\nContains 'lion'?");
console.log(list.contains("lion"));
// Expected: false

console.log("\nFind index of 'snake':");
console.log(list.find("snake"));
// Expected: 4

console.log("\nFind index of 'lion':");
console.log(list.find("lion"));
// Expected: null

console.log("\nPopping the last node...");
console.log(list.pop());
// Expected: Node { value: 'turtle', nextNode: null }

console.log("\nNew Tail:");
console.log(list.tail());
// Expected: tail --> (snake)

console.log("\nNew Size:");
console.log(list.size());
// Expected: number of nodes --> (5)

console.log("\nLinked List after pop:");
console.log(list.toString());
// Expected: head --> (dog) --> (cat) --> (parrot) --> (hamster) --> (snake) --> null

console.log("\nPrepending 'monkey'...");
list.prepend("monkey");

console.log("\nNew Head:");
console.log(list.head());
// Expected: head --> (monkey)

console.log("\nNew Size:");
console.log(list.size());
// Expected: number of nodes --> (6)

console.log("\nLinked List after prepend:");
console.log(list.toString());
// Expected: head --> (monkey) --> (dog) --> (cat) --> (parrot) --> (hamster) --> (snake) --> null
