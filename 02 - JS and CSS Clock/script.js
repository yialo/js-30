'use strict';

const $secondHand = document.querySelector('.hand--second');
const $minuteHand = document.querySelector('.hand--min');
const $hourHand = document.querySelector('.hand--hour');

const setHandPosition = (date, $hand, unitName, divisor) => {
  const unit = date[`get${unitName}`]();
  const degreesFromTime = (unit / divisor) * 360 + 90;
  $hand.style.transform = `rotate(${degreesFromTime}deg)`;
};

const setDate = () => {
  const now = new Date();

  setHandPosition(now, $secondHand, 'Seconds', 60);
  setHandPosition(now, $minuteHand, 'Minutes', 60);
  setHandPosition(now, $hourHand, 'Hours', 12);
};

setInterval(setDate, 1000);
