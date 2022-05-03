const fs = require("fs");
const fetch = require("cross-fetch");
const baseUrl = "https://www.thecocktaildb.com/api/json/v2/";

const apiKey = process.env.API_KEY || "1";
console.log(apiKey);

// const jsonData = {
//   "drinks": [
//       {
//           "idDrink": "11007",
//           "strDrink": "Margarita",
//           "strDrinkAlternate": null,
//           "strTags": "IBA,ContemporaryClassic",
//           "strVideo": null,
//           "strCategory": "Ordinary Drink",
//           "strIBA": "Contemporary Classics",
//           "strAlcoholic": "Alcoholic",
//           "strGlass": "Cocktail glass",
//           "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
//           "strInstructionsES": null,
//           "strInstructionsDE": "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben.",
//           "strInstructionsFR": null,
//           "strInstructionsIT": "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere.",
//           "strInstructionsZH-HANS": null,
//           "strInstructionsZH-HANT": null,
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
//           "strIngredient1": "Tequila",
//           "strIngredient2": "Triple sec",
//           "strIngredient3": "Lime juice",
//           "strIngredient4": "Salt",
//           "strIngredient5": null,
//           "strIngredient6": null,
//           "strIngredient7": null,
//           "strIngredient8": null,
//           "strIngredient9": null,
//           "strIngredient10": null,
//           "strIngredient11": null,
//           "strIngredient12": null,
//           "strIngredient13": null,
//           "strIngredient14": null,
//           "strIngredient15": null,
//           "strMeasure1": "1 1/2 oz ",
//           "strMeasure2": "1/2 oz ",
//           "strMeasure3": "1 oz ",
//           "strMeasure4": null,
//           "strMeasure5": null,
//           "strMeasure6": null,
//           "strMeasure7": null,
//           "strMeasure8": null,
//           "strMeasure9": null,
//           "strMeasure10": null,
//           "strMeasure11": null,
//           "strMeasure12": null,
//           "strMeasure13": null,
//           "strMeasure14": null,
//           "strMeasure15": null,
//           "strImageSource": "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
//           "strImageAttribution": "Cocktailmarler",
//           "strCreativeCommonsConfirmed": "Yes",
//           "dateModified": "2015-08-18 14:42:59"
//       }
//   ]
// }

// fetch("//api.github.com/users/lquixada")
// fetch("thecocktaildb.com/api/json/v2/9973533")
// fetch("http://www.thecocktaildb.com/api/json/v2/9973533")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const alphanumeric = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

for (let letter of alphanumeric) {
  fetch(
    `https://www.thecocktaildb.com/api/json/v2/${apiKey}/search.php?` +
      new URLSearchParams({
        f: letter,
      })
  )
    .then((response) => response.json())
    .then((data) => JSON.stringify(data))
    .then((content) => writeData(letter, content));

  // const jsonObj = JSON.parse(jsonData);
  // console.log(jsonObj)

  // const jsonContent = JSON.stringify(jsonData)
  // console.log(jsonContent)

  const writeData = (letter, data) => {
    fs.writeFile(`output_${letter}.json`, data, "utf8", function (err) {
      if (err) {
        console.log("tere was an error");
        return console.log(err);
      }
      console.log("JSON file was saved");
    });
  };
}
