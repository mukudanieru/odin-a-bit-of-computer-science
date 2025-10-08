import { Queue } from "../binary/helper.js";

class Knight {
    constructor() {
        // FOR FUTURE DEVELOPMENT, FRONTEND
        // this.chess = Array.from({ length: 8 }, () => Array(8).fill(0));

        this.KNIGHT_DIRECTIONS = [
            { x: -1, y: 2 }, // Up 2, Left 1
            { x: 1, y: 2 }, // Up 2, Right 1
            { x: 2, y: 1 }, // Right 2, Up 1
            { x: 2, y: -1 }, // Right 2, Down 1
            { x: -1, y: -2 }, // Down 2, Left 1
            { x: 1, y: -2 }, // Down 2, Right 1
            { x: -2, y: 1 }, // Left 2, Up 1
            { x: -2, y: -1 }, // Left 2, Down 1
        ];
    }

    stringified(position) {
        return `${position[0]}, ${position[1]}`;
    }

    unstringified(position) {
        return position.split(",").map(Number);
    }

    arraysAreEqual(arrOne, arrTwo) {
        if (arrOne.length !== arrTwo.length) return false;

        for (let i = 0; i < arrOne.length; i++) {
            if (arrOne[i] !== arrTwo[i]) return false;
        }

        return true;
    }

    bfsKnightPath(startPos, endPos) {
        const queue = new Queue();
        const visited = new Set();
        const cameFrom = {};

        queue.enqueue(startPos);
        visited.add(this.stringified(startPos));
        cameFrom[this.stringified(startPos)] = null;

        while (!queue.isEmpty()) {
            const pointer = queue.dequeue();
            const [x, y] = pointer;

            if (this.arraysAreEqual(pointer, endPos)) {
                break;
            }

            for (let direction of this.KNIGHT_DIRECTIONS) {
                const newX = x + direction.x;
                const newY = y + direction.y;

                if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
                    continue;
                }

                const newPos = [newX, newY];

                if (visited.has(this.stringified(newPos))) {
                    continue;
                }

                queue.enqueue(newPos);
                visited.add(this.stringified(newPos));
                cameFrom[this.stringified(newPos)] = this.stringified(pointer);
            }
        }

        const shortestPath = [endPos];
        let current = this.stringified(endPos);

        while (cameFrom[current] !== null) {
            const prev = this.unstringified(cameFrom[current]);
            shortestPath.push(prev);
            current = cameFrom[current];
        }

        return shortestPath.reverse();
    }

    knightMoves(startPos, endPos) {
        const knightPaths = this.bfsKnightPath(startPos, endPos);

        console.log(`> knightMoves(${startPos},${endPos})`);

        console.log(
            `==> You made it in ${knightPaths.length} moves! Here's your path:`
        );
        knightPaths.forEach((path) => {
            console.log(`    [${path[0]},${path[1]}]`);
        });
    }
}

const knight = new Knight();
knight.knightMoves([3, 3], [4, 3]);
