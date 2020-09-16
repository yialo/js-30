const setCheckboxStateAttribute = ($checkbox, needCheck) => {
  if (needCheck) {
    $checkbox.setAttribute('checked', 'checked');
  } else {
    $checkbox.removeAttribute('checked');
  }
};

const createCheckHandler = () => {
  const $checkboxes = [...document.querySelectorAll('.inbox input[type="checkbox"]')];

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

  let fillStartIndex = null;
  let lastChangedIndex = null;

  const handleCheckboxChange = (event) => {
    const {
      target: $target,
      shiftKey: isShiftPressed,
    } = event;

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

    if (isShiftPressed) {
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
      $checkboxes.forEach(($checkbox) => {
        $checkbox.addEventListener('click', handleCheckboxChange);
      });
    },
  };
};

const checkHandler = createCheckHandler();
checkHandler.init();
