'use strict';

const $inputs = document.querySelectorAll('.controls input');

const handleUpdate = function () {
  const suffix = this.dataset.unit || '';

  document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${suffix}`);
};

$inputs.forEach(($input) => {
  $input.addEventListener('change', handleUpdate);
});
