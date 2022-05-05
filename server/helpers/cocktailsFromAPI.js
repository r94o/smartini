const fs = require('fs');
const fetch = require('cross-fetch');

const baseUrl = 'https://www.thecocktaildb.com/api/json/v2/';

const apiKey = process.env.API_KEY || '1';

/* eslint-disable */
const writeData = (data) => {
  fs.writeFile('drinks.json', data, 'utf8', (err) => {
    if (err) {
      console.log('There was an error');
      return console.log(err);
    }
    return console.log('JSON file was saved');
  });
};
/* eslint-enable */

const stringsToArray = (...strings) => strings.filter((string) => string != null && string !== '');

const restructureDrinkObjects = (drinks) => drinks.map(
  (drink) => {
    let ingredients = stringsToArray(
      drink.strIngredient1,
      drink.strIngredient2,
      drink.strIngredient3,
      drink.strIngredient4,
      drink.strIngredient5,
      drink.strIngredient6,
      drink.strIngredient7,
      drink.strIngredient8,
      drink.strIngredient9,
      drink.strIngredient10,
      drink.strIngredient11,
      drink.strIngredient12,
      drink.strIngredient13,
      drink.strIngredient14,
      drink.strIngredient15,
    );
    ingredients = ingredients.map(ingredient => ingredient.toLowerCase());
    let measures = stringsToArray(
      drink.strMeasure1,
      drink.strMeasure2,
      drink.strMeasure3,
      drink.strMeasure4,
      drink.strMeasure5,
      drink.strMeasure6,
      drink.strMeasure7,
      drink.strMeasure8,
      drink.strMeasure9,
      drink.strMeasure10,
      drink.strMeasure11,
      drink.strMeasure12,
      drink.strMeasure13,
      drink.strMeasure14,
      drink.strMeasure15,
    );
    measures = measures.map(measure => measure.toLowerCase());
    return {
      id: drink.idDrink,
      ingredients,
      measures,
      name: drink.strDrink.toLowerCase(),
      displayName: drink.strDrink,
      category: drink.strCategory,
      iba: drink.strIBA,
      alcoholic: drink.strAlcoholic,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      image: drink.strDrinkThumb,
    };
  },
);

const alphanumeric = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

async function gatherDrinks(callback) {
  let allDrinks = [];
  /* eslint-disable */
  for (const letter of alphanumeric) {
    await fetch(
      `${baseUrl}${apiKey}/search.php?${new URLSearchParams({
        f: letter,
      })}`,
    )
      .then((response) => response.json())
      .then(({ drinks }) => {
        if (drinks) {
          const cleanedDrinks = restructureDrinkObjects(drinks);
          allDrinks = allDrinks.concat(cleanedDrinks);
        }
      });
    /* eslint-enable */
  }
  const content = JSON.stringify(allDrinks);
  callback(content);
}
gatherDrinks((data) => {
  writeData(data);
});
