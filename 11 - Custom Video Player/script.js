// Get our elements

const $player = document.querySelector('.player');
const $video = $player.querySelector('.viewer');
const $progress = $player.querySelector('.progress');
const $progressBar = $progress.querySelector('.progress__filled');
const $toggle = $player.querySelector('.toggle');
const $skipButtons = $player.querySelectorAll('[data-skip]');
const $ranges = $player.querySelectorAll('[type="range"]');

// Build our handlers

const togglePlay = () => {
  const method = $video.paused ? 'play' : 'pause';
  $video[method]();
};

const updateButton = () => {
  const icon = $video.paused ? '▶' : '⏸';
  $toggle.textContent = icon;
  $toggle.setAttribute('aria-pressed', !$video.paused);
};

const skip = (event) => {
  const skipAmount = Number.parseInt(event.target.dataset.skip, 10);
  $video.currentTime += skipAmount;
};

// Hook up the event listeners

$toggle.addEventListener('click', togglePlay);
$video.addEventListener('click', togglePlay);
$video.addEventListener('play', updateButton);
$video.addEventListener('pause', updateButton);
$skipButtons.forEach(($button) => {
  $button.addEventListener('click', skip);
})
