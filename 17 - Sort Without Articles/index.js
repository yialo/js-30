const BANDS = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const removeArticle = (str) => str.replace(/^(the|an?) /i, '');

const sortWithoutArticles = (nameList) => nameList.sort((left, right) => {
  const leftWithoutArticle = removeArticle(left);
  const rightWithoutArticle = removeArticle(right);

  if (leftWithoutArticle < rightWithoutArticle) {
    return -1;
  }

  if (leftWithoutArticle > rightWithoutArticle) {
    return 1;
  }

  return 0;
});

const init = () => {
  console.log(sortWithoutArticles(BANDS));
};

init();
