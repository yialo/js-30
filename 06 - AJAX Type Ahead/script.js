'use strict';

const ENDPOINT = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const CITY_OBJECT_FIELDS = ['city', 'state'];

const cities = [];

function findMatches(wordToMatch) {
  return cities.filter((place) => {
    const matcher = new RegExp(wordToMatch, 'gi');
    return CITY_OBJECT_FIELDS.some((it) => place[it].match(matcher));
  });
}

function addCommasToNumString(num) {
  return String(num).replace(/\B(?=(\d{3})+$)/g, '.');
}

function addSearchHandlers() {
  const $form = document.querySelector('.search-form');
  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const $list = $form.querySelector('.suggestions');
  function handleMatch() {
    const matchedList = findMatches(this.value);

    const markup = matchedList.reduce((acc, place) => {
      const matcher = new RegExp(this.value, 'gi');
      const [cityName, stateName] = CITY_OBJECT_FIELDS.map((str) => (
        place[str].replace(matcher, `<span class="hl">${this.value}</span>`)
      ));
      const population = addCommasToNumString(place.population);

      return (
        `${acc}
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${population}</span>
        </li>`
      );
    }, '');

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
