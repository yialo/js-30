const $nav = document.getElementById('nav');

let initialNavY = $nav.offsetTop;

const fixNav = () => {
  if (window.scrollY >= initialNavY) {
    document.body.classList.add('fixed-nav');
    document.body.style.paddingTop = `${$nav.offsetHeight}px`;
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = null;
  }
};

window.addEventListener('scroll', fixNav);

window.addEventListener('resize', () => {
  initialNavY = $nav.offsetTop;
});
