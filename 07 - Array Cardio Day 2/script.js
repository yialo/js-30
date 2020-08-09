// ## Array Cardio Day 2

// Some and Every Checks
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 },
];

const THRESHOLD_AGE = 19;

const isNineteenOrOlader = (birthYear) => {
  const birthDate = new Date(birthYear + 1) - 1;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const lastMillisecondOfThisYear = new Date(currentYear + 1) - 1;

  const isBirthdayGone = currentDate.getTime() === lastMillisecondOfThisYear;
  const age = currentYear - birthYear - (isBirthdayGone ? 0 : 1);

  return age >= THRESHOLD_AGE;
};

// is at least one person 19 or older?
const isAnybodyNineteenOrOlder = people.some(({ year }) => isNineteenOrOlader(year));
console.log({ isAnybodyNineteenOrOlder });

// is everyone 19 or older?
const isEverybodyNineteenOrOlder = people.every(({ year }) => isNineteenOrOlader(year));
console.log({ isEverybodyNineteenOrOlder});

// Find and FindIndex Checks
const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 },
];

// find the comment with the ID of 823423
const NEEDED_COMMENT_ID = 823423;

const neededComment = comments.find((comment) => comment.id === NEEDED_COMMENT_ID);
console.log(neededComment);

// Find index of the comment with this ID
// delete the comment with the ID of 823423
const commentIndexToDelete = comments.findIndex((comment) => comment.id === NEEDED_COMMENT_ID);
console.log({commentIndexToDelete});

console.log('comments:', comments);

const updatedComments = [
  ...comments.slice(0, commentIndexToDelete),
  ...comments.slice(commentIndexToDelete + 1),
];
console.log('updatedComments:', updatedComments);
