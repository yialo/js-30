const $holes = document.querySelectorAll('.hole');
const $scoreBoard = document.querySelector('.score');
const $startButton = document.querySelector('.start-button');

const GAME_DURATION = 7000;
const MIN_MOLE_DURATION = 200;
const MAX_MOLE_DURATION = 1000;

let lastHoleIndex;

const getRandomHole = () => {
  let holeIndex;

  do {
    holeIndex = Math.floor(Math.random() * $holes.length);
  } while (holeIndex === lastHoleIndex);

  lastHoleIndex = holeIndex;

  return $holes[holeIndex];
};

const getRandomTime = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

let gameEndTime;

const showMole = () => {
  const duration = getRandomTime(MIN_MOLE_DURATION, MAX_MOLE_DURATION);

  const $hole = getRandomHole();
  $hole.classList.add('up');

  const $mole = $hole.querySelector('.mole');

  const hideMole = () => {
    $mole.removeEventListener('click', scoreUp, { once: true });
    $hole.classList.remove('up');
  };

  const scoreUp = (event) => {
  if (!event.isTrusted) {
    return;
  }

    const currentScore = +$scoreBoard.textContent;
    $scoreBoard.textContent = currentScore + 1;
    hideMole();
  };

  $mole.addEventListener('click', scoreUp, { once: true });

  window.setTimeout(() => {
    if ($hole.classList.contains('up')) {
      hideMole();
    }

    if (Date.now() < gameEndTime) {
      showMole();
    } else {
      $startButton.disabled = false;
    }
  }, duration);
};

const startGame = () => {
  $scoreBoard.textContent = 0;
  gameEndTime = Date.now() + GAME_DURATION;
  showMole();
  $startButton.disabled = true;
};

$startButton.addEventListener('click', startGame);
