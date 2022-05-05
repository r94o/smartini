const fs = require('fs');
const fetch = require('cross-fetch');

const baseUrl = 'https://www.thecocktaildb.com/api/json/v2/';

const apiKey = process.env.API_KEY || '1';

/* eslint-disable */
const writeData = (data) => {
  fs.writeFile('ingredients.json', data, 'utf8', (err) => {
    if (err) {
      console.log('There was an error');
      return console.log(err);
    }
    return console.log('JSON file was saved');
  });
};
/* eslint-enable */

const restructureIngredientObjects = (ingredients) => ingredients.map(
  (ingredient) => ({
    displayName: ingredient.strIngredient1,
    name: ingredient.strIngredient1.toLowerCase(),
  }),
);

async function gatherIngredients(callback) {
  /* eslint-disable */
  await fetch(
    `${baseUrl}${apiKey}/list.php?${new URLSearchParams({
      i: "list",
    })}`,
  )
    .then((response) => response.json())
    .then(({ drinks }) => {
      const cleanedIngredients = restructureIngredientObjects(drinks);
      /* eslint-enable */
      const content = JSON.stringify(cleanedIngredients);
      callback(content);
    });
}
gatherIngredients((data) => {
  writeData(data);
});
