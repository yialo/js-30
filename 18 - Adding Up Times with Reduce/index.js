const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

const secondsInHour = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;

const list$time = document.querySelectorAll('li[data-time]');
const totalSeconds = [...list$time]
  .map(($node) => {
    const timeCode = $node.dataset.time;
    const [minutes, seconds] = timeCode.split(':').map(Number.parseFloat);
    return minutes * SECONDS_IN_MINUTE + seconds;
  })
  .reduce((total, seconds) => total + seconds, 0);

let secondsLeft = totalSeconds;

const hours = Math.floor(secondsLeft / secondsInHour);
secondsLeft %= secondsInHour;

const minutes = Math.floor(secondsLeft / SECONDS_IN_MINUTE);
secondsLeft %= SECONDS_IN_MINUTE;

const $totalTime = document.getElementById('total-time');
$totalTime.textContent = `Total time: ${hours}:${minutes}:${secondsLeft}`;
