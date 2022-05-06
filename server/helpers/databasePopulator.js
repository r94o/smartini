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
      console.log("Caught Error on Ingredient Initialisation:", e.name);
    }
  });
  try {
    Ingredient.insertMany(documents, { ordered: false }).then((documents) => {
      console.log(`Inserted ${documents.length} Ingredients`);
    });
  } catch (err) {
    console.log("Caught Error on Insertion:", err.name);
  }
}

const populateDrinks = (drinks) => {
  const documents = [];
  drinks.forEach((drink) => {
    try {
      let document = new Drink({
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
      console.log("Caught Error on Drink Initialisation:", e.name);
    }
  });
  try {
    Drink.insertMany(documents, { ordered: false }).then((documents) => {
      console.log(`Inserted ${documents.length} Drinks`);
    });
  } catch (err) {
    console.log("Caught Error on Insertion:", err.name);
  }
}


const dropCollection = async (model) => {
  try {
    await model.collection.drop();
  } catch (e) {
    if (e.code === 26) {
      console.log('namespace %s not found', model.collection.name)
    } else {
      throw e;
    }
  }
}

const dropIngredientsCollection = async () => {
  let ingredientsDB = db.collection('ingredients');
  await ingredientsDB.countDocuments().then(async (count) => {
    console.log("Current Ingredient Count:", count);
    await dropCollection(Ingredient);
  });
  const ingredients = require('../ingredients.json');
  populateIngredients(ingredients);
};

const dropDrinksCollection = async () => {
  let drinksDB = db.collection('drinks');
  await drinksDB.countDocuments().then(async (count) => {
    console.log("Current Drink Count:", count);
    await dropCollection(Drink);
  });
  const drinks = require('../drinks.json');
  populateDrinks(drinks);
}

const populateDatabase = async (callback) => {
  await dropIngredientsCollection();
  await dropDrinksCollection();
  callback();
}

populateDatabase(() => {
  setTimeout(() => {
    mongoose.disconnect();
    console.log("Connection Closed")
  },
    2000)
});
