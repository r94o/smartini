const mongoose = require("mongoose");
const Drink = require("../models/drink");
const Ingredient = require("../models/ingredient");

const mongoDb = process.env.MONGODB_TARGET || "cocktail_dev";
const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

mongoose.connect(mongoDbUrl);
const db = mongoose.connection;

const populateIngredients = (ingredients) => {
  const documents = [];
  ingredients.forEach((ingredient) => {
    try {
      let document = new Ingredient({
        name: ingredient.name,
        displayName: ingredient.displayName,
      });
      documents.push(document)
    } catch (e) {
      console.log("Caught Error on Ingredient Initialisation:", e);
    }
  });
  try {
    Ingredient.insertMany(documents).then((documents) => {
      console.log(`Inserted ${documents.length} Ingredients`);
    });
  } catch (err) {
    console.log("Caught Error on Insertion:", err);
  }
}

const populateDrinks = (drinks) => {
  const documents = [];
  drinks.forEach((drink) => {
    try {
      let document = new Drink({
        id: drink.id,
        name: drink.name,
        displayName: drink.displayName,
        ingredients: drink.ingredients,
        measures: drink.measures,
        name: drink.name,
        displayName: drink.displayName,
        category: drink.category,
        iba: drink.iba,
        alcoholic: drink.alcoholic,
        glass: drink.glass,
        instructions: drink.instructions,
        image: drink.image,
      });
      documents.push(document);
    } catch (e) {
      console.log("Caught Error on Drink Initialisation:", e);
    }
  });
  try {
    Drink.insertMany(documents).then((documents) => {
      console.log(`Inserted ${documents.length} Drinks`);
    });
  } catch (err) {
    console.log("Caught Error on Insertion:", err);
  }
}


const dropIngredientsCollection = () => {
  db.collections.ingredients.drop()
  const ingredients = require('../ingredients.json');
  populateIngredients(ingredients);
}

const dropDrinksCollection = () => {
  db.collections.drinks.drop()
  const drinks = require('../drinks.json');
  populateDrinks(drinks);
}

const populateDatabase = (callback) => {
  dropIngredientsCollection();
  dropDrinksCollection();
  callback();
}

populateDatabase(() => { });
