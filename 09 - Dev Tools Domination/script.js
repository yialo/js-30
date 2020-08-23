'use strict';

const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'Hugo', age: 8 },
];

function makeGreen() {
  const $p = document.querySelector('p');
  $p.style.color = '#bada55';
  $p.style.fontSize = '50px';
}

// Regular
console.log('Hello');

// Interpolated
console.log('Hello, I am a %s string', '💥');

// Styled
console.log('%cI am some great text', 'font-size: 16px; color: red;');

// warning!
console.warn('CAUTION!');

// Error :|
console.error('Oh no!');

// Info
console.info('It may be interesting...');

// Testing
console.assert(1 === 2, 'That is wrong');

// clearing
// console.clear();

// Viewing DOM Elements
const $paragraph = document.querySelector('p');
console.dir($paragraph);

// Grouping together
dogs.forEach(({ name, age }, i, arr) => {
  console[i === arr.length - 1 ? 'groupCollapsed' : 'group'](name);
  console.log(`This is ${name}.`);
  console.log(`${name} is ${age} years old.`);
  console.groupEnd(name);
});

// counting
console.count('Bob');
console.count('Bull');
console.count('Bob');
console.count('Bob');
console.count('Fedya');
console.count('Bob');
console.count('Bull');

// timing
console.time('fetching data');
fetch('https://api.github.com/users/yialo')
  .then((response) => {
    console.timeLog('fetching data');
    response.json();
  })
  .then((data) => {
    console.timeEnd('fetching data');
    console.dir(data);
  });

// table
console.table(dogs, ['age', 'name']);
