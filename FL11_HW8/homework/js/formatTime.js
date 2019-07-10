const formatTime = a => `${a / 1440 | 0} day(s) ${a % 1440 / 60 | 0} hour(s) ${a % 1440 % 60} minute(s).`;

console.log('120', formatTime(120));
console.log('59', formatTime(59));
console.log('3601', formatTime(3601));
