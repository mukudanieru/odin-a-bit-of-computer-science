# Odin: A Bit of Computer Science

The _"A Bit of Computer Science"_ section is part of the JavaScript course in The Odin Project's Full Stack JavaScript path. In this section, I revisited and deepened my understanding of key computer science concepts that I’ve learned in my actual CS class.

## Projects Completed

1. **[Recursion](https://www.theodinproject.com/lessons/javascript-recursion)**  
   In this first project, I explored two classic problems that leverage the concept of recursion: **Fibonacci** and **Merge Sort**.
2. **[Linked Lists](https://www.theodinproject.com/lessons/javascript-linked-lists)**  
   In this project, I revisited **Linked Lists** by implementing a **Node** class with value and nextNode properties, and a LinkedList class featuring these functions:
    - append(value): add node to end
    - prepend(value): add node to start
    - size(): return total nodes
    - head(): return first node
    - tail(): return last node
    - at(index): return node at given index
    - pop(): remove last node
    - contains(value): check if value exists
    - find(value): return index of value or null
    - toString(): represent list as string
3. **[HashMap](https://www.theodinproject.com/lessons/javascript-hashmap)**  
   In this project, I revisited **HashMap** but this time, implementing the growth functionality to dynamically resize the hash table when the load factor threshold is exceeded.
    - hash(key): takes a key and produces a hash code with it
    - set(key, value): add or update key-value pair
    - get(key): retrieve value by key
    - has(key): check if key exists
    - remove(key): delete key-value pair
    - length(): return total entries
    - clear(): remove all entries
    - keys(): return array of all keys
    - values(): return array of all values
    - entries(): return array of key-value pairs
4. **[Binary Search Tree](https://www.theodinproject.com/lessons/javascript-binary-search-trees)**  
   In this project, I implemented a **Binary Search Tree** from scratch, this my first time working with this data structure, and easily the most challenging project so far. Imeplementing this, I gained an understanding of a tree-based data strtucture, recursive thinking, and how tree balance affects performance.
    - buildTree(array): construct a BST from an array of values
    - insert(value): add a new value while maintaining BST rules
    - deleteItem(value): remove a value and restructure links
    - find(value): search for a node with a given value
    - levelOrderForEach(callback): breadth-first traversal with a callback
    - preOrderForEach(callback), inOrderForEach(callback), postOrderForEach(callback): depth-first traversals with a callback
    - height(value): compute the height of a given node
    - depth(value): compute the depth of a given node
    - isBalanced(): check if the tree is balanced
    - rebalance(): rebuild the tree into a balanced BST
5. **[Knights Travails](https://www.theodinproject.com/lessons/javascript-knights-travails)**
   In this project, I implemented **Knights Travails**, an algorithm that finds the shortest path for a knight on a chessboard from a given starting position to a target position. This was my introduction to applying Breadth-First Search (BFS) on a grid, and it turned out to be one of the most challenging yet enjoyable problems I’ve worked on so far. I built the entire logic without using any adjacency list or matrix, relying purely on coordinate calculations and queue traversal.
    - bfsKnightPath(startPos, endPos): computes the shortest path using BFS
    - knightMoves(startPos, endPos): prints the move count and sequence of positions
