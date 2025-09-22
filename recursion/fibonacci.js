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

console.log(fibs(8));
