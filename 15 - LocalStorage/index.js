const $addItems = document.querySelector('.add-items');
const $platesList = document.querySelector('.plates');

let plates = [];

const addItem = (event) => {
  event.preventDefault();

  const plate = {
    text: event.target.querySelector('input[name="item"]').value,
    isDone: false,
  };

  plates.push(plate);
  event.target.reset();

  populateList();
  localStorage.setItem('plates', JSON.stringify(plates));
};

const populateList = () => {
  $platesList.innerHTML = plates.reduce((acc, { text, isDone }, i) => {
    const id = `item-${i}`;

    return (
      `${acc}
      <li>
        <input type="checkbox" id="${id}"${isDone ? ' checked' : ''}>
        <label for="${id}">${text}</label>
      </li>`
    );
  }, '')
    .replace(/\s+</g, '<')
    .replace(/>\s+/g, '>');
};

const init = () => {
  try {
    const savedPlates = JSON.parse(localStorage.getItem('plates'));

    if (savedPlates) {
      plates = savedPlates;
    }
  } catch {
    window.alert('Ooops, we cannot load saved plates');
  }

  populateList();

  $addItems.addEventListener('submit', addItem);
};

init();
