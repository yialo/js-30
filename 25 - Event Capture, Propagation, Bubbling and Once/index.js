const list$div = document.querySelectorAll('div');

const $one = document.querySelector('.one');
const $two = document.querySelector('.two');
const $three = document.querySelector('.three');

const $button = document.querySelector('button');

const logText = (event) => {
  console.log(event.currentTarget.classList.value);
  // event.stopPropagation();
};

list$div.forEach(($div) => {
  $div.addEventListener('click', logText);
});

// $one.addEventListener('click', (event) => {
//   console.log('First listener called');
//   event.stopImmediatePropagation();
// });

// $one.addEventListener('click', () => {
//   console.log('Second listener called');
// });

$button.addEventListener('click', () => {
  console.log('Button clicked');
}, { once: true });
