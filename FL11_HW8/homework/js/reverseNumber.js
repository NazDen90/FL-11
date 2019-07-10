const reverseNumber = a => {
    let digit, result = 0;
    while (a) {
        digit = a % 10;
        result = (result * 10) + digit;
        a = a / 10 | 0;
    }
    return result;
};

console.log('123', reverseNumber(123));
console.log('-456', reverseNumber(-456));
console.log('10000', reverseNumber(10000));
