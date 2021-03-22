window.SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let $paragraph = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild($paragraph);

recognition.addEventListener('result', (event) => {
  console.log(event);
});

recognition.start();
