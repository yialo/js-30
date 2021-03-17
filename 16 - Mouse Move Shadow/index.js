const OPACITY_FACTOR = 50;
const WALK_FACTOR = 100;

const $hero = document.querySelector('.hero');
const $text = $hero.querySelector('h1');

const { offsetWidth: width, offsetHeight: height } = $hero;

const centerX = width / 2;
const centerY = height / 2;

const {
  offsetWidth: textWidth,
  offsetHeight: textHeight,
  offsetLeft: textLeft,
  offsetTop: textTop,
} = $text;

const changeShadow = (event) => {
  let { offsetX: x, offsetY: y } = event;

  if (event.target === $text) {
    x += textLeft;
    y += textTop;
  }

  const shiftX = Math.round((x / width - 0.5) * WALK_FACTOR);
  const shiftY = Math.round((y / height - 0.5) * WALK_FACTOR);

  const opacity = OPACITY_FACTOR / Math.hypot(x - centerX, y - centerY);

  console.log(opacity);

  $text.style.textShadow = `${shiftX}px ${shiftY}px 0 rgb(0 0 0 / ${opacity})`;
};

$hero.addEventListener('mousemove', changeShadow);
