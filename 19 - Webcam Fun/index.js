const $video = document.querySelector('.player');
const $canvas = document.querySelector('.photo');
const $strip = document.querySelector('.strip');
const $snap = document.querySelector('.snap');

const ctx = $canvas.getContext('2d');

const paintToCanvas = () => {
  const { videoWidth: width, videoHeight: height } = $video;

  $canvas.width = width;
  $canvas.height = height;

  const paintFrame = () => {
    ctx.drawImage($video, 0, 0, width, height);
    window.requestAnimationFrame(paintFrame);
  };

  window.requestAnimationFrame(paintFrame);
};

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((localMediaStream) => {
    $video.srcObject = localMediaStream;

    $video.play().then(() => {
      paintToCanvas();
    });
  }).catch((error) => {
    console.error('Oh no!', error);
  })
};

getVideo();
