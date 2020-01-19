'use strict';

(() => {
  const $panels = document.querySelectorAll('.panel');

  const toggleOpen = function () {
    this.classList.toggle('js_open')
  };

  const toggleActive = function (evt) {
    if (evt.propertyName === 'flex-grow') {
      this.classList.toggle('js_active');
    }
  };

  $panels.forEach(($panel) => {
    $panel.addEventListener('click', toggleOpen);
    $panel.addEventListener('transitionend', toggleActive);
  });
})();
