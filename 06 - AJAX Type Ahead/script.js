'use strict';

const ENDPOINT = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

function findMatches(wordToMatch, listToFilter) {
  return listToFilter.filter((place) => {
    const matcher = new RegExp(wordToMatch, 'gi');
    return ['city', 'state'].some((it) => place[it].match(matcher));
  });
}

function displayMatches(dataList) {
  const $form = document.querySelector('.search-form');
  const $input = $form.querySelector('.search');
  const $list = $form.querySelector('.suggestions');

  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  $input.addEventListener('change', function () {
    const matchedList = findMatches(this.value, dataList);
    console.log(matchedList);
  });
}

function fetchList() {
  const cities = [];
  window.fetch(ENDPOINT)
    .then((response) => response.json())
    .then((list) => {
      cities.push(...list);
    })
    .then(() => {
      displayMatches(cities);
    })
    .catch((err) => {
      console.warn(err.message);
    });
}

fetchList();
