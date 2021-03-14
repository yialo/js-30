// Arrays
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

const team = players;
console.log('team === players: ', team === players);

const team1 = players.slice();
console.log('team1 === players: ', team1 === players);

const team2 = [].concat(players);
console.log('team2 === players: ', team2 === players);

const team3 = [...players];
console.log('team3 === players: ', team3 === players);

const team4 = Array.from(players);
console.log('team4 === players: ', team4 === players);

// Plain objects
const person = {
  name: 'Wes Bos',
  age: 80
};

const captain = person;
console.log('captain === person: ', captain === person);

const captain1 = Object.assign({}, person);
console.log('captain1 === person: ', captain1 === person);

const captain2 = {...person};
console.log('captain2 === person: ', captain2 === person);

const captain3 = JSON.parse(JSON.stringify(captain));
console.log('captain3 === person: ', captain3 === person);
