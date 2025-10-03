import { prettyPrint, getRandomInteger, randomNumberArray } from "./helper.js";
import { Tree } from "./binary.js";

// Create a binary tree from an array of random numbers
const arr = randomNumberArray(12);

const tree = new Tree();
tree.buildTree(arr);

// Check if the tree is balanced
prettyPrint(tree.root);
console.log(`Is the tree balanced? ${tree.isBalanced()}\n`);

// Print out all elements in level, pre, post and in order

// level order
const level = [];
tree.levelOrderForEach((value) => {
    level.push(value);
});
console.log(level);

// pre order
const pre = [];
tree.preOrderForEach((value) => {
    pre.push(value);
});
console.log(pre);

// post order
const post = [];
tree.postOrderForEach((value) => {
    post.push(value);
});
console.log(post);

// inOrder order
const inOrder = [];
tree.inOrderForEach((value) => {
    inOrder.push(value);
});
console.log(inOrder);
console.log();

// Unbalancing the tree
const RANDOM_TIMES_GENERATION = 5;
const MIN = 100;
const MAX = 250;

for (let i = 0; i < RANDOM_TIMES_GENERATION; i++) {
    tree.insert(getRandomInteger(MIN, MAX));
}
// Check if the tree is balanced
prettyPrint(tree.root);
console.log(`Is the tree balanced? ${tree.isBalanced()}\n`);

// Rebalancing the tree
tree.rebalance();

// Check if the tree is balanced
prettyPrint(tree.root);
console.log(`Is the tree balanced? ${tree.isBalanced()}\n`);
