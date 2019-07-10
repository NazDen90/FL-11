const isInteger = a => (a ^ 0) === a;

console.log('Is 5 an integer?', isInteger(5));
console.log('Is 5.1 an integer?', isInteger(5.1));
