const ONE_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const $timer = document.querySelector('.display__time-left');
const $endTime = document.querySelector('.display__end-time');
const $buttons = document.querySelectorAll('[data-time]');
const $form = document['custom-form'];

const initialTitle = document.title;

const formatNumber = (number) => `${number < 10 ? '0' : ''}${number}`;

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  const secondsRemain = seconds % SECONDS_IN_MINUTE;

  const time = `${minutes}:${formatNumber(secondsRemain)}`;
  $timer.textContent = time;
  document.title = `${initialTitle} ${time}`
};

let timer;

const stopTimer = () => {
  window.clearInterval(timer);
};

const launchTimer = (seconds) => {
  stopTimer();

  const now = Date.now();
  const then = now + seconds * ONE_SECOND;

  displayEndTime(then);
  displayTimeLeft(seconds);

  timer = window.setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / ONE_SECOND);

    if (secondsLeft < 0) {
      stopTimer();
      return;
    }

    displayTimeLeft(secondsLeft);
  }, ONE_SECOND);
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);

  const hour = end.getHours();
  const minutes = end.getMinutes();
  const seconds = end.getSeconds();

  $endTime.textContent = `Be back at ${hour}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

$buttons.forEach(($button) => {
  $button.addEventListener('click', function () {
    const seconds = Number.parseInt(this.dataset.time);
    launchTimer(seconds);
  });
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const mins =  Number.parseInt(this.minutes.value);

  if (Number.isNaN(mins) || mins < 1 || mins > 60) {
    window.alert('Pass a number between 1 and 60');
  } else {
    launchTimer(mins * SECONDS_IN_MINUTE);
    this.reset();
  }
});
