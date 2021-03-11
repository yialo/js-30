const pressedKeys = [];
const secretCode = 'konami';

const createCodeParagraph = () => {
  const $paragraph = document.createElement('p');
  $paragraph.textContent = 'KONAMI';
  document.body.appendChild($paragraph);
};

window.addEventListener('keyup', ({ key }) => {
  pressedKeys.push(key);

  if (pressedKeys.length > secretCode.length) {
    pressedKeys.shift();
  }

  if (pressedKeys.join('').includes(secretCode)) {
    createCodeParagraph();
  }
});
