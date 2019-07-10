const pipe = (a, ...funcs) => {
    for (let func of funcs) {
        a = func(a);
    }
    return a;
};

function addOne(x) {
    return x + 1;
}

console.log('addOne*1', pipe(1, addOne));
console.log('addOne*2', pipe(1, addOne, addOne));

// const pipe = (a, ...funcs) => funcs.reduce((acc, curr) => x => curr(acc(x)), x => x)(a);
