const fs = require('fs');
const fetch = require('cross-fetch');

const baseUrl = 'https://www.thecocktaildb.com/api/json/v2/';

const apiKey = process.env.API_KEY || '1';

/* eslint-disable */
const writeData = (data) => {
  fs.writeFile('db.json', data, 'utf8', (err) => {
    if (err) {
      console.log('tere was an error');
      return console.log(err);
    }
    return console.log('JSON file was saved');
  });
};
/* eslint-enable */

const stringsToArray = (...strings) => strings.filter((string) => string != null && string !== '');

const restructureDrinkObjects = (drinks) => drinks.map(
  ({
    strInstructionsDE,
    strInstructionsES,
    strInstructionsFR,
    strInstructionsIT,
    strInstructionsZH,
    strDrinkAlternate,
    strVideo,
    'strInstructionsZH-HANS': hans,
    'strInstructionsZH-HANT': hant,
    idDrink,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    ...rest
  }) => {
    const ingredients = stringsToArray(
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
    );
    const measures = stringsToArray(
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
      strMeasure14,
      strMeasure15,
    );
    return {
      id: idDrink,
      ingredients,
      measures,
      ...rest,
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
  const jsonData = { drinks: [] };
  jsonData.drinks = allDrinks;
  const content = JSON.stringify(jsonData);
  callback(content);
}
gatherDrinks((data) => {
  writeData(data);
});
