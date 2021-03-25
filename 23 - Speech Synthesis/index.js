const $pitch = document.querySelector('[name="pitch"]');
const $rate = document.querySelector('[name="rate"]');
const $speakButton = document.getElementById('speak');
const $stopButton = document.getElementById('stop');
const $text = document.querySelector('[name="text"]');
const $voices = document.querySelector('[name="voice"]');

const $options = [$pitch, $rate, $text];

const msg = new SpeechSynthesisUtterance();

msg.pitch = $pitch.value;
msg.rate = $rate.value;
msg.text = $text.value;

let voices = [];

const populateVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach(({ lang, name, voiceURI }) => {
    const $option = document.createElement('option');
    $option.value = voiceURI;
    $option.textContent = `${name} (${lang})`;
    $voices.append($option);
  });
};

speechSynthesis.addEventListener('voiceschanged', populateVoices);

$options.forEach(($option) => {
  $option.addEventListener('change', ({ target }) => {
    speechSynthesis.cancel();
    msg[target.name] = target.value;
    speechSynthesis.speak(msg);
  });
});

$voices.addEventListener('change', (event) => {
  speechSynthesis.cancel();
  msg.voice = voices.find((voice) => voice.voiceURI === event.target.value);
});

$speakButton.addEventListener('click', () => {
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
});

$stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
});
