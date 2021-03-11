const pressedKeys = [];
const secretCode = 'konami';

const $code = document.getElementById('code');

window.addEventListener('keyup', ({ key }) => {
  pressedKeys.push(key);

  if (pressedKeys.length > secretCode.length) {
    pressedKeys.shift();
  }

  console.log(pressedKeys);

  if (pressedKeys.join('').includes(secretCode)) {
    $code.style.display = 'block';
  }
});
