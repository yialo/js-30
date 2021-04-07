const $holes = document.querySelectorAll('.hole');
const $moles = document.querySelectorAll('.mole');
const $scoreBoard = document.querySelector('.score');
const $startButton = document.querySelector('.start-button');

const GAME_DURATION = 7000;
const MIN_DURATION = 300;
const MAX_DURATION = 1000;

const getRandomHoleIndex = () => Math.floor(Math.random() * $holes.length);

let lastHoleIndex;

const getRandomHole = () => {
  let holeIndex;

  do {
    holeIndex = getRandomHoleIndex();
  } while (holeIndex === lastHoleIndex);

  lastHoleIndex = holeIndex;

  return $holes[holeIndex];
};

const getRandomTime = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

let gameEndTime;

const showMole = () => {
  if (Date.now() < gameEndTime) {
    const duration = getRandomTime(MIN_DURATION, MAX_DURATION);
    const $hole = getRandomHole();
    $hole.classList.add('up');

    window.setTimeout(() => {
      $hole.classList.remove('up');
      showMole();
    }, duration);
  }
};

const startGame = () => {
  gameEndTime = Date.now() + GAME_DURATION;
  showMole();
};

$startButton.addEventListener('click', startGame);
