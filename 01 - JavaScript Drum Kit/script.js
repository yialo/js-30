'use strict';

const playSound = (evt) => {
  const { key } =  evt;

  const $audio = document.querySelector(`audio[data-key="${key}"]`);
  const $key = document.querySelector(`.key[data-key="${key}"]`);

  if (!$audio) {
    return;
  }

  $audio.currentTime = 0;
  $audio.play();
  $key.classList.add('playing');
};

const removeTransition = (evt) => {
  if (evt.propertyName !== 'transform') {
    return;
  }
  evt.currentTarget.classList.remove('playing');
};

const $keys = document.querySelectorAll('.key');
$keys.forEach(($key) => {
  $key.addEventListener('transitionend', removeTransition);
});

window.addEventListener('keydown', playSound);
