const fs = require("fs");
const fetch = require("cross-fetch");
const baseUrl = "https://www.thecocktaildb.com/api/json/v2/";

const apiKey = process.env.API_KEY || "1";
console.log(apiKey);

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

const allDrinks = []



async function gatherDrinks(callback) {
  for (let letter of alphanumeric) {
    await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${apiKey}/search.php?` +
      new URLSearchParams({
        f: letter,
      })
    )
    .then((response) => response.json())
    .then((data) => {
      if(data.drinks){
        for (let drink of data.drinks) {
          allDrinks.push(drink)
        }
      }
    })
  }
  const jsonData = {drinks: []}
  jsonData.drinks = allDrinks
  const content = JSON.stringify(jsonData)
  callback(content)
}

gatherDrinks((data) => {
  writeData(data)    
})

const writeData = (data) => {
  fs.writeFile(`db.json`, data, "utf8", function (err) {
    if (err) {
      console.log("tere was an error");
      return console.log(err);
    }
    console.log("JSON file was saved");
  });
};

