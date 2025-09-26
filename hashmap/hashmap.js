class HashMap {
    constructor() {
        this.KEY = 0; // key index
        this.VALUE = 1; // value index

        this.capacity = 16;
        this.loadFactor = 0.8;

        this.buckets = Array.from({ length: this.capacity }, () => []);
        this._entries = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    grow() {
        this.capacity = this.capacity * 2;
        let newBucket = Array.from({ length: this.capacity }, () => []);
        let newEntryCount = 0;

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                const key = entry[this.KEY];
                const value = entry[this.VALUE];

                const idx = this.hash(key);
                newBucket[idx].push([key, value]);
                newEntryCount++;
            }
        }

        this.buckets = newBucket;
        this._entries = newEntryCount;
    }

    set(key, value) {
        const idx = this.hash(key);

        if (idx < 0 || idx >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let selectedBucket = this.buckets[idx];

        // if the key-value pair already exists, reference the array
        const entry = selectedBucket.find(([existingKey, existingValue]) => {
            return existingKey === key;
        });

        if (entry) {
            entry[this.VALUE] = value;
        } else {
            selectedBucket.push([key, value]);
            this._entries++;
        }

        if (this._entries >= this.capacity * this.loadFactor) {
            this.grow();
        }
    }

    get(key) {
        const idx = this.hash(key);
        let selectedBucket = this.buckets[idx];

        for (const entry of selectedBucket) {
            if (entry[this.KEY] === key) {
                return entry[this.VALUE];
            }
        }

        return null;
    }

    has(key) {
        const idx = this.hash(key);
        let selectedBucket = this.buckets[idx];

        for (const entry of selectedBucket) {
            if (entry[this.KEY] === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        const idx = this.hash(key);
        let selectedBucket = this.buckets[idx];

        const entryIdx = selectedBucket.findIndex(([existingkey, _]) => {
            return existingkey === key;
        });

        if (entryIdx === -1) {
            return false;
        }

        selectedBucket.splice(entryIdx, 1);
        this._entries--;

        return true;
    }

    length() {
        return this._entries;
    }

    clear() {
        this.capacity = 16;
        this.loadFactor = 0.8;

        this.buckets = Array.from({ length: this.capacity }, () => []);
        this._entries = 0;
    }

    keys() {
        let entryKeys = [];

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                entryKeys.push(entry[this.KEY]);
            }
        }

        return entryKeys;
    }

    values() {
        let entryValues = [];

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                entryValues.push(entry[this.VALUE]);
            }
        }

        return entryValues;
    }

    entries() {
        return this.buckets;
    }

    debugMode() {
        // console.log("CURRENT BUCKETS:");
        // console.log(this.buckets);
        console.log(`CURRENT BUCKET SIZE: ${this.buckets.length}`);
        console.log(`TOTAL ENTRIES: ${this._entries}\n`);
    }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("=== HashMap Tests ===\n");

console.log("Entries:");
console.log(test.entries());
test.debugMode();
// Expected: Array of 12 key-value pairs in bucket order

test.set("moon", "silver");

console.log("\nAfter adding 'moon' (triggers growth):");
console.log("Entries:");
console.log(test.entries());
test.debugMode();
// Expected: Same 13 key-value pairs but potentially in different order due to rehashing with capacity 32

console.log("\nTesting get() method:");
console.log("apple:", test.get("apple"));
// Expected: 'red'

console.log("moon:", test.get("moon"));
// Expected: 'silver'

console.log("nonexistent:", test.get("nonexistent"));
// Expected: null

console.log("\nTesting has() method:");
console.log("has 'dog':", test.has("dog"));
// Expected: true

console.log("has 'cat':", test.has("cat"));
// Expected: false

console.log("\nTesting length() method:");
console.log("length:", test.length());
// Expected: 13

console.log("\nTesting keys() method:");
console.log("keys:", test.keys());
// Expected: Array of 13 keys in bucket order

console.log("\nTesting values() method:");
console.log("values:", test.values());
// Expected: Array of 13 values in bucket order

console.log("\nTesting remove() method:");
console.log("remove 'hat':", test.remove("hat"));
// Expected: true

console.log("remove 'hat' again:", test.remove("hat"));
// Expected: false

console.log("length after removal:", test.length());
// Expected: 12

console.log("has 'hat' after removal:", test.has("hat"));
// Expected: false

console.log("\nTesting set() overwrite:");
test.set("apple", "green");
console.log("apple after overwrite:", test.get("apple"));
// Expected: 'green'

console.log("length after overwrite:", test.length());
// Expected: 12 (should not increase)

console.log("\nTesting clear() method:");
test.clear();
console.log("length after clear:", test.length());
// Expected: 0

console.log("entries after clear:", test.entries());
// Expected: []

console.log("get 'apple' after clear:", test.get("apple"));
// Expected: null
