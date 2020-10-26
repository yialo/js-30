const SPACE_KEY = ' ';

// Get our elements

const $player = document.querySelector('.player');
const $video = $player.querySelector('.viewer');
const $progressBar = $player.querySelector('.progress');
const $progressFilled = $progressBar.querySelector('.progress__filled');
const $toggle = $player.querySelector('.toggle');
const $skipButtons = $player.querySelectorAll('[data-skip]');
const $ranges = $player.querySelectorAll('[type="range"]');
const $fullScreenButton = $player.querySelector('.player__button_fullscreen');

// Build our handlers

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

const handleVideoTimeUpdate = () => {
  const percentage = $video.currentTime / $video.duration * 100;
  $progressFilled.style.flexBasis = `${percentage}%`;
  $progressBar.setAttribute('aria-valuenow', percentage);
  const rounded = Math.round(percentage);
  $progressBar.setAttribute('aria-valuetext', `Playback position: ${rounded}%`);
};

const initProgressBarMouseHandling = () => {
  let isMouseDown = false;
  let downX;

  const setVideoCurrentTime = (event) => {
    const factor = event.offsetX / $progressBar.offsetWidth;
    $video.currentTime = $video.duration * factor;
  }

  const handleProgressBarMouseDown = (event) => {
    isMouseDown = true;
    downX = event.offsetX;
  };

  const handleProgressBarMouseUp = (event) => {
    isMouseDown = false;
    if (event.offsetX === downX) {
      setVideoCurrentTime(event);
    }
  }

  const handleProgressBarMouseMove = (event) => {
    if (isMouseDown) {
      setVideoCurrentTime(event);
    }
  }

  $progressBar.addEventListener('mousedown', handleProgressBarMouseDown);
  $progressBar.addEventListener('mouseup', handleProgressBarMouseUp);
  $progressBar.addEventListener('mousemove', handleProgressBarMouseMove);
};

const initVideoPlayToggle = () => {
  const toggleFullScreen = () => {
    $video.requestFullscreen()
      .catch(() => {
        console.log(`Can't show video in fullscreen mode`);
      });
  };

  const togglePlay = () => {
    const method = $video.paused ? 'play' : 'pause';
    $video[method]();
  };

  const handleVideoClick = () => {
    if (!document.fullscreenElement) {
      togglePlay();
    }
  };

  const handleSpaceKeyDown = (event) => {
    if (event.key === SPACE_KEY) {
      togglePlay();
    }
  };

  $fullScreenButton.addEventListener('click', toggleFullScreen);
  $toggle.addEventListener('click', togglePlay);
  $video.addEventListener('click', handleVideoClick);
  document.addEventListener('keydown', handleSpaceKeyDown);
};

// Hook up the event listeners

initProgressBarMouseHandling();
initVideoPlayToggle();

$ranges.forEach(($range) => {
  $range.addEventListener('change', handleRangeUpdate);
});

$skipButtons.forEach(($button) => {
  $button.addEventListener('click', skip);
})

$video.addEventListener('play', updateButton);
$video.addEventListener('pause', updateButton);
$video.addEventListener('timeupdate', handleVideoTimeUpdate);
