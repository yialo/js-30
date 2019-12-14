'use strict';

const INITIAL_DEGREE = 90;

const DATE_COMPONENT_MAP = {
  'hour': { divisor: 12, method: 'Hours' },
  'min': { divisor: 60, method: 'Minutes' },
  'sec': { divisor: 60, method: 'Seconds' },
};

class ClockHand {
  constructor(bemModifier, divisor) {
    this._bemModifier = bemModifier;

    this._$hand = document.querySelector(`.hand--${this._bemModifier}`);

    const dict = DATE_COMPONENT_MAP[this._bemModifier];
    this._divisor = dict.divisor;
    this._dateMethod = dict.method;

    this._state = {
      time: 0,
      rounds: 0,
      degrees: 0,
    };
  }

  update(moment) {
    this._setTime(moment);
    this._calculateDegrees();
    this._setPosition();
  }

  _setTime(moment) {
    const currentTime = moment[`get${this._dateMethod}`]();

    if (currentTime < this._state.time) {
      this._state.rounds += 1;
    }
    this._state.time = currentTime;
  }

  _calculateDegrees() {
    this._state.degrees = (360 * this._state.time / this._divisor) + (360 * this._state.rounds) + INITIAL_DEGREE;
  }

  _setPosition() {
    this._$hand.style.transform = `rotate(${this._state.degrees}deg)`;
  }
}

const init = () => {
  const hourHand = new ClockHand('hour', 12);
  const minuteHand = new ClockHand('min', 60);
  const secondHand = new ClockHand('sec', 60);

  const setDate = () => {
    const now = new Date();

    [hourHand, minuteHand, secondHand].forEach((hand) => {
      hand.update(now);
    });
  };

  setInterval(setDate, 1000);
};

init();
