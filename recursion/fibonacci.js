function fibs(number) {
    let fibs = [];

    for (let i = 0, a = 0, b = 1; i < number; i++) {
        fibs.push(a);

        let result = a + b;
        a = b;
        b = result;
    }

    return fibs;
}

// console.log(fibs(8));

function fibsRec(number) {
    console.log("This was printed recursively");
    if (number === 1) return [0];

    if (number === 2) {
        return [0, 1];
    }

    let recur = fibsRec(number - 1);

    const prev = recur[recur.length - 1];
    const next = recur[recur.length - 2];
    recur.push(prev + next);

    return recur;
}

// console.log(fibsRec(8));
