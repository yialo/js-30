const SHIFT_KEY = 'Shift';

const createShiftHandler = () => {
  let isPressed = false;

  const handleKeyDown = (event) => {
    if (event.key === SHIFT_KEY) {
      isPressed = true;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === SHIFT_KEY) {
      isPressed = false;
      addKeyDownListener();
    }
  };

  const addKeyDownListener = () => {
    document.addEventListener('keydown', handleKeyDown, { once: true });
  }

  const addKeyUpListener = () => {
    document.addEventListener('keyup', handleKeyUp);
  }

  return {
    get isPressed() {
      return isPressed;
    },
    init() {
      addKeyDownListener();
      addKeyUpListener();
    },
  };
};

const setCheckboxStateAttribute = ($checkbox, needCheck) => {
  if (needCheck) {
    $checkbox.setAttribute('checked', 'checked');
  } else {
    $checkbox.removeAttribute('checked');
  }
};

const createCheckHandler = () => {
  const $container = document.querySelector('.inbox');
  const $checkboxes = [...$container.querySelectorAll('input[type="checkbox"]')];

  const fillBetween = (firstIndex, secondIndex, needCheck) => {
    let $list = [];

    if (firstIndex < secondIndex) {
      $list = $checkboxes.slice(firstIndex + 1, secondIndex);
    } else {
      $list = $checkboxes.slice(secondIndex + 1, firstIndex);
    }

    $list.forEach(($checkbox) => {
      setCheckboxStateAttribute($checkbox, needCheck);
      $checkbox.checked = needCheck;
    });
  };

  const shiftHandler = createShiftHandler();

  let fillStartIndex = null;
  let lastChangedIndex = null;

  const handleCheckboxChange = (event) => {
    const $target = event.target;
    const isJustChecked = $target.checked;

    setCheckboxStateAttribute($target, isJustChecked);

    lastChangedIndex = $checkboxes.indexOf($target);

    if (fillStartIndex === lastChangedIndex) {
      return;
    }

    if (fillStartIndex === null) {
      fillStartIndex = lastChangedIndex;
      return;
    }

    if (shiftHandler.isPressed) {
      const isPreviousChecked = $checkboxes[fillStartIndex].checked;

      if (isJustChecked) {
        fillBetween(fillStartIndex, lastChangedIndex, true);
      } else if (!isPreviousChecked) {
        fillBetween(fillStartIndex, lastChangedIndex, false);
      }
    }

    fillStartIndex = lastChangedIndex;
  };

  return {
    init() {
      shiftHandler.init();
      $checkboxes.forEach(($checkbox) => {
        $checkbox.addEventListener('change', handleCheckboxChange);
      });
    },
  };
};

const checkHandler = createCheckHandler();
checkHandler.init();
