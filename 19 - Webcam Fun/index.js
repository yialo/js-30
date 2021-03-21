const $canvas = document.querySelector('.photo');
const $rgbInputs = document.querySelectorAll('.rgb input');
const $shutter = document.querySelector('.shutter');
const $snap = document.querySelector('.snap');
const $strip = document.querySelector('.strip');
const $video = document.querySelector('.player');

const ctx = $canvas.getContext('2d');

const effects = {
  red: ({ data }) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i + 0] += 100;
      data[i + 1] -= 50;
      data[i + 2] *= 0.5;
    }
  },

  rgbSplit: ({ data }) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i - 150] = data[i + 0];
      data[i + 100] = data[i + 1];
      data[i + 300] = data[i + 2];
    }
  },

  greenScreen: ({ data }) => {
    const levels = {};

    $rgbInputs.forEach(($input) => {
      levels[$input.name] = $input.value;
    });

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      const alpha = data[i + 3];

      if (
        red >= levels.rmin
        && red <= levels.rmax
        && green >= levels.gmin
        && green <= levels.gmax
        && blue >= levels.bmin
        && blue <= levels.bmax
      ) {
        data[i + 3] = 0;
      }
    }
  },
};

const paintToCanvas = () => {
  const { videoWidth: width, videoHeight: height } = $video;

  $canvas.width = width;
  $canvas.height = height;

  const requestIdRef = {
    value: null,
  };

  const paintFrame = () => {
    ctx.drawImage($video, 0, 0, width, height);

    const pixels = ctx.getImageData(0, 0, width, height);
    effects.greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);

    // ctx.globalAlpha = 0.5;

    requestIdRef.value = window.requestAnimationFrame(paintFrame);
  };

  window.requestAnimationFrame(paintFrame);

  return requestIdRef;
};

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((localMediaStream) => {
    $video.srcObject = localMediaStream;

    $video.play().then(() => {
      const requestIdRef = paintToCanvas();
    });
  }).catch((error) => {
    console.error('Oh no!', error);
  })
};

const takePhoto = () => {
  $snap.currentTime = 0;
  $snap.play();

  const dataFromCanvas = $canvas.toDataURL('image/jpeg');
  const $link = document.createElement('a');
  $link.href = dataFromCanvas;
  $link.setAttribute('download', 'photo');
  $link.setAttribute('aria-label', 'Download image');

  const $img = document.createElement('img');
  $img.src = dataFromCanvas;
  $img.alt = 'It\'s me';

  $link.append($img);

  $strip.prepend($link);

  if ($strip.childElementCount === 0) {
    $strip.classList.remove('strip_with-padding');
  } else {
    $strip.classList.add('strip_with-padding');
  }
};

$shutter.addEventListener('click', takePhoto);

getVideo();
