//0
const getNumbers = str => {
    let result = [];
    for (let num of [...str.replace(/\D/g, '')]) {
        result.push(parseInt(num))
    }
    return result;
};
console.log('getNumbers(\'string\')', getNumbers('string'));
console.log('getNumbers(\'n1um3ber95\')', getNumbers('n1um3ber95'));

//1
const findTypes = (...args) => {
    let result = {};
    for (let item of args) {
        if (result.hasOwnProperty(typeof item)) {
            result[typeof item] += 1;
        } else {
            result[typeof item] = 1;
        }
    }
    return result;
};
console.log('findTypes(\'number\')', findTypes('number'));
console.log('findTypes(null, 5, \'hello\')', findTypes(null, 5, 'hello'));

//2
const executeforEach = (arr, func) => {
    for (let item of arr) {
        item = func(item);
    }
};
executeforEach([1, 2, 3], function (el) {
    console.log(el)
});

//3
const mapArray = (arr, func) => {
    let result = [];
    executeforEach(arr, (item) => {
        result.push(func(item))
    });
    return result;
};
console.log('mapArray([2, 5, 8], function (el) {return el + 3})', mapArray([2, 5, 8], function (el) {
    return el + 3
}));

//4
const filterArray = (arr, func) => {
    let result = [];
    executeforEach(arr, (item) => {
        if (func(item)) {
            result.push(item)
        }
    });
    return result;
};
console.log('filterArray([2, 5, 8], function (el) {return el > 3})', filterArray([2, 5, 8], function (el) {
    return el > 3
}));

//5
const showFormattedDate = (date) => `Date: ${date.toLocaleDateString('en-Us', {
    month: 'short'
})} ${date.toLocaleDateString('en-Us', {
    day: 'numeric'
})} ${date.toLocaleDateString('en-Us', {
    year: 'numeric'
})}`;
console.log('showFormattedDate(new Date(\'2019-01-27T01:10:00\')', showFormattedDate(new Date('2019-01-27T01:10:00')));

//6
const canConvertToDate = (date) => !!Date.parse(date);
console.log('canConvertToDate(\'2016-13-18T00:00:00\')', canConvertToDate('2016-13-18T00:00:00'));
console.log('canConvertToDate(\'2016-03-18T00:00:00\')', canConvertToDate('2016-03-18T00:00:00'));

//7
const daysBetween = (date1, date2) => {
    let millsInDay = 86400000;
    let date1Mills = Date.parse(date1.toLocaleDateString());
    let date2Mills = Date.parse(date2.toLocaleDateString());
    let days = Math.round((date1Mills - date2Mills) / millsInDay);
    return Math.abs(days);
};
console.log('daysBetween(new Date(\'2016-03-18T00:00:00\'), new Date(\'2016-04-19T00:00:00\'))',
    daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00')));


let data = [
    {
        '_id': '5b5e3168c6bf40f2c1235cd6',
        'index': 0,
        ' birthday ': '2016-03-18T00:00:00',
        'eyeColor': 'green',
        'name': 'Stein',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e3168e328c0d72e4f27d8',
        'index': 1,
        ' birthday ': '1991-02-11T00:00:00',
        'eyeColor': 'blue',
        'name': 'Cortez',
        'favoriteFruit': 'strawberry'
    },
    {
        '_id': '5b5e3168cc79132b631c666a',
        'index': 2,
        ' birthday ': '1984-04-17T00:00:00',
        'eyeColor': 'blue',
        'name': 'Suzette',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e31682093adcc6cd0dde5',
        'index': 3,
        ' birthday ': '1994-04-17T00:00:00',
        'eyeColor': 'green',
        'name': 'George',
        'favoriteFruit': 'banana'
    }
];

//8
const getAmountOfAdultPeople = (data) => {
    const daysInYear = 365;
    const age = 18;
    let now = new Date();
    return filterArray(data, (item) => {
        let birthday = new Date(item[' birthday ']);
        return daysBetween(now, birthday) / daysInYear > age;
    }).length
};
console.log('getAmountOfAdultPeople(data)', getAmountOfAdultPeople(data));

//9
const keys = (obj) => {
    let result = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(key)
        }
    }
    return result;
};
console.log('keys({keyOne: 1, keyTwo: 2, keyThree: 3})', keys({keyOne: 1, keyTwo: 2, keyThree: 3}));

//10
const values = (obj) => {
    let result = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key])
        }
    }
    return result;
};
console.log('values({keyOne: 1, keyTwo: 2, keyThree: 3})', values({keyOne: 1, keyTwo: 2, keyThree: 3}));
