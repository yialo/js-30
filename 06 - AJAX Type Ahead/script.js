'use strict';

const ENDPOINT = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

function findMatches(wordToMatch) {
  return cities.filter((place) => {
    const matcher = new RegExp(wordToMatch, 'gi');
    return ['city', 'state'].some((it) => place[it].match(matcher));
  });
}

function addSearchHandlers() {
  const $form = document.querySelector('.search-form');
  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const $list = $form.querySelector('.suggestions');
  function handleMatch() {
    const matchedList = findMatches(this.value);
    const markup = matchedList.reduce((acc, place) => (
      `${acc}
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>`
    ), '');
    $list.innerHTML = markup;
  }

  const $input = $form.querySelector('.search');
  $input.addEventListener('change', handleMatch);
  $input.addEventListener('input', handleMatch);
}

function fetchList() {
  window.fetch(ENDPOINT)
    .then((response) => response.json())
    .then((list) => {
      cities.push(...list);
    })
    .then(() => {
      addSearchHandlers();
    })
    .catch((err) => {
      console.warn(err.message);
    });
}

fetchList();
