const TWO = 2;
let coordinates = [];
let coordinatesNames = [ 'a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
for (let i = 0; i < coordinatesNames.length; i++) {
    coordinates[coordinatesNames[i]]= +prompt(`Input ${coordinatesNames[i]} coordinate`);
    while (isNaN(coordinates[coordinatesNames[i]])){
        alert('Please, enter number!');
        coordinates[coordinatesNames[i]]= +prompt(`Input ${coordinatesNames[i]} coordinate`);
    }
}
let centerX =(coordinates['a1'] + coordinates['b1']) / TWO;
let centerY = (coordinates['a2'] + coordinates['b2']) / TWO;
console.log((centerX + centerY) / TWO === (coordinates['c1'] + coordinates['c1']) / TWO);
