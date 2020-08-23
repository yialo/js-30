const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.globalCompositeOperation = 'source-out';

let isDrawing = false;
let isForward = true;
let lastX = 0;
let lastY = 0;
let hue = 0;

const draw = (evt) => {
  if (!isDrawing) {
    return;
  }

  const offsets = [evt.offsetX, evt.offsetY];

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(...offsets);
  ctx.stroke();

  [lastX, lastY] = offsets;

  hue += 1;
  if (hue === 360) {
    hue = 0;
  }

  if (ctx.lineWidth === 180 || ctx.lineWidth === 1) {
    isForward = !isForward;
  }

  if (isForward) {
    ctx.lineWidth += 1;
  } else {
    ctx.lineWidth -= 1;
  }
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (evt) => {
  isDrawing = true;
  [lastX, lastY] = [evt.offsetX, evt.offsetY];
});
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});
