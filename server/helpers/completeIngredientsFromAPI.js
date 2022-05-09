const fs = require('fs');
const fetch = require('cross-fetch');

const baseUrl = 'https://www.thecocktaildb.com/api/json/v2/';

const apiKey = process.env.API_KEY || '1';

/* eslint-disable */
const writeData = (data) => {
  fs.writeFile('completeIngredients.json', data, 'utf8', (err) => {
    if (err) {
      console.log('There was an error');
      return console.log(err);
    }
    return console.log('JSON file was saved');
  });
};
/* eslint-enable */

const restructureIngredientObjects = (ingredients) => ingredients.map(
  (ingredient) => {
    let ingredientName = ingredient.strIngredient.toLowerCase();
    return {
      id: ingredient.idIngredient,
      displayName: ingredient.strIngredient,
      name: ingredientName,
      type: ingredient.strType,
      alcoholic: ingredient.strAlcohol,
      abv: ingredient.strABV,
      description: ingredient.strDescription,
      image: `www.thecocktaildb.com/images/ingredients/${encodeURI(ingredientName)}.png`,
    };
  },
);

const ingredients = require('../ingredients.json');

async function gatherCompleteIngredients(ingredients, callback) {
  let allIngredients = [];
  /* eslint-disable */
  for (const ingredient of ingredients) {
    await fetch(
      `${baseUrl}${apiKey}/search.php?${new URLSearchParams({
        i: ingredient.name,
      })}`,
    )
      .then((response) => response.json())
      .then(({ ingredients }) => {
        if (ingredients) {
          const cleanedIngredients = restructureIngredientObjects(ingredients);
          allIngredients = allIngredients.concat(cleanedIngredients);
        }
      });
    /* eslint-enable */
  }
  const content = JSON.stringify(allIngredients);
  callback(content);
}

console.log("WARNING - this will take a while to complete as it makes 488 GET requests");
gatherCompleteIngredients(ingredients, (data) => {
  writeData(data);
});
