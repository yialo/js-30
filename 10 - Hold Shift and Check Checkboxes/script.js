const $checkboxes = [...document.querySelectorAll('.inbox input[type="checkbox"]')];

let $prevChanged = null;
let $justChanged = null;

const handleCheckboxClick = (event) => {
  $justChanged = event.target;

  if ($prevChanged === $justChanged) {
    return;
  }

  if ($prevChanged === null) {
    $prevChanged = $justChanged;
    return;
  }

  if (event.shiftKey) {
    let isBetween = false;

    $checkboxes.forEach(($checkbox) => {
      if ($checkbox === $prevChanged || $checkbox === $justChanged) {
        $checkbox.checked = true;
        isBetween = !isBetween;
      } else if (isBetween) {
        $checkbox.checked = true;
      }
    });
  }

  $prevChanged = $justChanged;
};

$checkboxes.forEach(($checkbox) => {
  $checkbox.addEventListener('click', handleCheckboxClick);
});
