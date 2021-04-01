const list$trigger = document.querySelectorAll('.cool > li');
const $background = document.querySelector('.dropdown-background');
const $nav = document.querySelector('.top');

const DELAY = 150;

const handleMouseEnter = (event) => {
  const $el = event.currentTarget;

  $el.addEventListener('mouseleave', handleMouseLeave, { once: true });

  $el.classList.add('trigger-enter');

  window.setTimeout(() => {
    if ($el.classList.contains('trigger-enter')) {
      $el.classList.add('trigger-enter-active');
    }
  }, 0);

  const navCoords = $nav.getBoundingClientRect();

  const $dropdown = $el.querySelector('.dropdown');
  const dropdownCoords = $dropdown.getBoundingClientRect();

  $background.style.width = `${dropdownCoords.width}px`;
  $background.style.height = `${dropdownCoords.height}px`;
  $background.style.left = `${dropdownCoords.left - navCoords.left}px`
  $background.style.top = `${dropdownCoords.top - navCoords.top}px`;

  $background.classList.add('open');
};

const handleMouseLeave = (event) => {
  const $el = event.currentTarget;

  $el.classList.remove('trigger-enter-active');

  window.setTimeout(() => {
    $el.classList.remove('trigger-enter');
  }, DELAY);

  $background.classList.remove('open');
};

list$trigger.forEach(($trigger) => {
  $trigger.addEventListener('mouseenter', handleMouseEnter);
});
