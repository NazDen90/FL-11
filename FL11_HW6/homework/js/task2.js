let a = +prompt('Enter the length of the triangle A side');
let b = +prompt('Enter the length of the triangle B side');
let c = +prompt('Enter the length of the triangle С side');
let isMoreThanZero = a > 0 && b > 0 && c > 0;
let isSumOfTwoSidesMoreThanThirdSide = a < b + c && b < a + c && c < a + b;
if (isMoreThanZero && isSumOfTwoSidesMoreThanThirdSide) {
    if (a === b && a === c) {
        console.log('Equivalent triangle');
    } else if (a === b || a === c || c === b) {
        console.log('Isosceles triangle');
    } else {
        console.log('Normal triangle');
    }
} else {
    console.log('Triangle doesn\'t exist');
}
