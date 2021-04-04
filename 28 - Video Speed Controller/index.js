const $video = document.querySelector('.video');
const $speed = document.querySelector('.speed');
const $speedBar = $speed.querySelector('.speed__bar');

const MIN_SPEED = 0.5;
const MAX_SPEED = 2;

const MIN_HEIGHT = 0.25;
const MAX_HEIGHT = 1;

const heightToSpeedFactor = (MAX_SPEED - MIN_SPEED) / (MAX_HEIGHT - MIN_HEIGHT);

const handleMouseMove = function (event) {
  const y = event.pageY - this.offsetTop;
  const rawFraction = (y / this.offsetHeight).toFixed(2);

  let fraction = rawFraction;

  if (rawFraction < MIN_HEIGHT) {
    fraction = MIN_HEIGHT;
  } else if (rawFraction > MAX_HEIGHT) {
    fraction = MAX_HEIGHT;
  }

  const height = Math.round(fraction * 100);
  $speedBar.style.height = `${height}%`;

  const speed = fraction * heightToSpeedFactor;
  $speedBar.textContent = `${speed.toFixed(2)}x`;

  $video.playbackRate = speed;
};

$speed.addEventListener('mousemove', handleMouseMove);
