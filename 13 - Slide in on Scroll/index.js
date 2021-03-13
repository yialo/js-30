const debounce = (func, wait = 20, immediate = true) => {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        func(...args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func(...args);
    }
  };
};

const $images = document.querySelectorAll('.slide-in');

const checkSlide = debounce((event) => {
  $images.forEach(($image) => {
    const windowBottom = window.scrollY + window.innerHeight;
    const imageBottom = $image.offsetTop + $image.offsetHeight;

    const isHalfShown = windowBottom >= $image.offsetTop + $image.offsetHeight / 2;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      $image.classList.add('active');
    } else {
      $image.classList.remove('active');
    }
  });
});

window.addEventListener('scroll', checkSlide);
