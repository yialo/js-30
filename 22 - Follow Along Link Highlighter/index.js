const list$link = document.querySelectorAll('a');

const $highlight = document.createElement('span');
$highlight.classList.add('highlight');
document.body.append($highlight);

const  highlightLink = ({ target }) => {
  const { left, top, width, height } = target.getBoundingClientRect();

  $highlight.style.left = `${window.scrollX + left}px`;
  $highlight.style.top = `${window.scrollY + top}px`;

  $highlight.style.width = `${width}px`;
  $highlight.style.height = `${height}px`;
};

list$link.forEach(($link) => {
  $link.addEventListener('mouseenter', highlightLink);
});
