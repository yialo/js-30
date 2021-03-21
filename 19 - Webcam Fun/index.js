const $canvas = document.querySelector('.photo');
const $shutter = document.querySelector('.shutter');
const $snap = document.querySelector('.snap');
const $strip = document.querySelector('.strip');
const $video = document.querySelector('.player');

const ctx = $canvas.getContext('2d');

const paintToCanvas = () => {
  const { videoWidth: width, videoHeight: height } = $video;

  $canvas.width = width;
  $canvas.height = height;

  const requestIdRef = {
    value: null,
  };

  const paintFrame = () => {
    ctx.drawImage($video, 0, 0, width, height);
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
