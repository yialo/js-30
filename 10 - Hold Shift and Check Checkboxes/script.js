const SHIFT_KEY = 'Shift';

const $container = document.querySelector('.inbox');
const $checkboxes = [...$container.querySelectorAll('input[type="checkbox"]')];

let isCheckStarted = false;
let startIndex = null;
let isShiftPressed = false;

const checkBetween = (first, second) => {
  const needCheck = $checkboxes[second].checked;

  if (needCheck) {
    let $list = [];

    if (first < second) {
      $list = $checkboxes.slice(first + 1, second);
    } else if (first > second) {
      $list = $checkboxes.slice(second + 1, first);
    }

    $list.forEach(($checkbox) => {
      $checkbox.checked = true;
    });
  }
}

const handleKeyDown = (event) => {
  if (event.key === SHIFT_KEY) {
    isShiftPressed = true;
  }
};

const addKeyDownListener = () => {
  document.addEventListener('keydown', handleKeyDown, { once: true });
};

const addKeyUpListener = () => {
  document.addEventListener('keyup', (event) => {
    if (event.key === SHIFT_KEY) {
      isShiftPressed = false;
      addKeyDownListener();
    }
  });
};

const handleCheck = (event) => {
  const inputIndex = $checkboxes.indexOf(event.target);

  if (isCheckStarted) {
    if (isShiftPressed) {
      checkBetween(startIndex, inputIndex);
    }

    startIndex = null;
  } else {
    startIndex = inputIndex;
  }

  isCheckStarted = !isCheckStarted;
};

const init = () => {
  $checkboxes.forEach(($checkbox) => {
    $checkbox.addEventListener('change', handleCheck);
  })
  addKeyDownListener();
  addKeyUpListener();
};

init();
