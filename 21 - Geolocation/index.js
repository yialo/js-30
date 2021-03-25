const $arrow = document.querySelector('.arrow');
const $speedValue = document.querySelector('.speed-value');

/* Code for real mobile device */

// navigator.geolocation.watchPosition(
//   ({ coords }) => {
//     $speedValue.textContent = +coords.speed;
//     $arrow.style.transform = `rotate(${coords.heading}deg)`;
//   },
//   (error) => {
//     console.log(error.message);
//   };
// );

/* Mobile device simulation */

const WATCH_INTERVAL = 1500;

const car = new EventTarget();

const simulateMovement = () => {
  window.setInterval(() => {
    const moveEvent = new CustomEvent('move');

    moveEvent.heading = Math.floor(Math.random() * 91);

    const speed = Math.floor(2000 + Math.random() * 2041) / 100;
    moveEvent.speed = speed.toFixed(1);

    car.dispatchEvent(moveEvent)
  }, WATCH_INTERVAL);
};

car.addEventListener('move', ({ heading, speed }) => {
  $speedValue.textContent = speed;
  $arrow.style.transform = `rotate(${heading}deg)`;
});

simulateMovement();
