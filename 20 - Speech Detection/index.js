window.SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

const $words = document.querySelector('.words');

const addParagraph = (text) => {
  let $paragraph = document.createElement('p');
  $paragraph.textContent = text;
  $words.appendChild($paragraph);
};

recognition.addEventListener('result', (event) => {
  const phase = Array.from(event.results[0], ({ transcript }) => transcript ).join(' ');
  addParagraph(phase);
});

recognition.addEventListener('end', recognition.start);

recognition.start();
