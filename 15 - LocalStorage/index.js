const $form = document.querySelector('form');
const $platesList = document.querySelector('.plates');
const $checkButton = document.getElementById('check');
const $uncheckButton = document.getElementById('uncheck');
const $clearButton = document.getElementById('clear');

let plates = [];

const updateStorage = () => {
  localStorage.setItem('plates', JSON.stringify(plates));
};

const renderList = () => {
  $platesList.innerHTML = plates.reduce((acc, { text, isDone }, i) => {
    const id = `item-${i}`;

    return (
      `${acc}
      <li>
        <input type="checkbox" id="${id}"${isDone ? ' checked' : ''} data-index="${i}">
        <label for="${id}">${text}</label>
      </li>`
    );
  }, '')
    .replace(/\s+</g, '<')
    .replace(/>\s+/g, '>');
};

const handleItemAddition = (event) => {
  event.preventDefault();

  const plate = {
    text: event.target.querySelector('input[name="item"]').value,
    isDone: false,
  };

  plates.push(plate);
  event.target.reset();

  updateStorage();
  renderList();
};

const handleItemStateChange = (event) => {
  event.preventDefault();

  const $target = event.target;

  if (!$target.matches('input')) {
    return;
  }

  const { index } = $target.dataset;
  plates[index].isDone = !plates[index].isDone;

  updateStorage();
  renderList();
};

const handleCheckAll = () => {
  plates.forEach((plate) => {
    plate.isDone = true;
  });

  updateStorage();
  renderList();
};

const handleUncheckAll = () => {
  plates.forEach((plate) => {
    plate.isDone = false;
  });

  updateStorage();
  renderList();
};

const handleClear = () => {
  plates = [];

  updateStorage();
  renderList();
};

const init = () => {
  try {
    const savedPlates = JSON.parse(localStorage.getItem('plates'));

    if (savedPlates !== null) {
      plates = savedPlates;
    }
  } catch {
    window.alert('Ooops, we cannot load saved plates');
  }

  $form.addEventListener('submit', handleItemAddition);
  $platesList.addEventListener('change', handleItemStateChange);
  $checkButton.addEventListener('click', handleCheckAll);
  $uncheckButton.addEventListener('click', handleUncheckAll);
  $clearButton.addEventListener('click', handleClear);

  renderList();
};

init();
