const BOOST_FACTOR = 2;

const $slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

const activate = (event) => {
  isDown = true;
  $slider.classList.add('active');
  startX = event.pageX - $slider.offsetLeft;
  scrollLeft = $slider.scrollLeft;
}

const deactivate = () => {
  isDown = false;
  $slider.classList.remove('active');
};

const move = (event) => {
  if (!isDown) {
    return;
  }

  event.preventDefault();

  const x = event.pageX - $slider.offsetLeft;
  const shiftX = (x - startX) * BOOST_FACTOR;
  $slider.scrollLeft = scrollLeft - shiftX;
};

$slider.addEventListener('mousedown', activate);
$slider.addEventListener('mousemove', move);
$slider.addEventListener('mouseleave', deactivate);
$slider.addEventListener('mouseup', deactivate);
