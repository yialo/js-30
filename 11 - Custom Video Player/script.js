// Get our elements

const $player = document.querySelector('.player');
const $video = $player.querySelector('.viewer');
const $progressBar = $player.querySelector('.progress');
const $progressFilled = $progressBar.querySelector('.progress__filled');
const $toggle = $player.querySelector('.toggle');
const $skipButtons = $player.querySelectorAll('[data-skip]');
const $ranges = $player.querySelectorAll('[type="range"]');

// Build our handlers

const setProgressPosition = (percentage) => {
  $progressFilled.style.flexBasis = `${percentage}%`;
  $progressBar.setAttribute('aria-valuenow', percentage);
  const rounded = Math.round(percentage);
  $progressBar.setAttribute('aria-valuetext', `Playback position: ${rounded}%`);
};

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
  const skipAmount = Number.parseFloat(event.target.dataset.skip);
  $video.currentTime += skipAmount;
};

const handleRangeUpdate = (event) => {
  const $range = event.target;
  $video[$range.name] = $range.value;
};

const handleProgress = () => {
  const percentage = $video.currentTime / $video.duration * 100;
  setProgressPosition(percentage);
};

const handleProgressBarClick = (event) => {
  const factor = event.offsetX / $progressBar.offsetWidth;
  console.log(factor);
  $video.currentTime = $video.duration * factor;

  const percentage = factor * 100;
  setProgressPosition(percentage);
};

// Hook up the event listeners

$progressBar.addEventListener('click', handleProgressBarClick);

$ranges.forEach(($range) => {
  $range.addEventListener('change', handleRangeUpdate);
});

$toggle.addEventListener('click', togglePlay);

$skipButtons.forEach(($button) => {
  $button.addEventListener('click', skip);
})

$video.addEventListener('click', togglePlay);
$video.addEventListener('play', updateButton);
$video.addEventListener('pause', updateButton);
$video.addEventListener('timeupdate', handleProgress);
