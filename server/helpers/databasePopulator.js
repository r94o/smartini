require('dotenv').config();
const mongoose = require("mongoose");
const Drink = require("../models/drink");
const Glass = require("../models/glass");
const Ingredient = require("../models/ingredient");

const mongoDb = process.env.MONGODB_TARGET || "cocktail_dev";
const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

mongoose.connect(mongoDbUrl);
const db = mongoose.connection;

const ingredientsTable = {};
const glassesTable = {};

const retrieveObjectId = (table, name) => {
  let glassName = name.toLowerCase();
  return table[glassName];
}

const updateTable = (table, document) => {
  table[`${document.name}`] = document._id;
}

const insertManyDocuments = (model, documents) => {
  try {
    model.insertMany(documents, { ordered: false }).then((documents) => {
      console.log(`Inserted ${documents.length} ${model.collection.name}`);
    });
  } catch (err) {
    console.log("Caught Error on Insertion:", err.name);
  }
}

const populateIngredients = (ingredients) => {
  const documents = [];
  ingredients.forEach((ingredient) => {
    try {
      let document = new Ingredient({
        name: ingredient.name,
        displayName: ingredient.displayName,
      });
      updateTable(ingredientsTable, document);
      documents.push(document)
    } catch (e) {
      console.log("Caught Error on Ingredient Initialisation:", e.name);
    }
  });
  insertManyDocuments(Ingredient, documents);
}

const populateGlasses = (glasses) => {
  const documents = [];
  glasses.forEach((glass) => {
    try {
      let document = new Glass({
        name: glass.name.toLowerCase(),
        displayName: glass.displayName,
        image: glass.image,
      });
      updateTable(glassesTable, document);
      documents.push(document)
    } catch (e) {
      console.log("Caught Error on Glass Initialisation:", e.name);
    }
  });
  insertManyDocuments(Glass, documents);
}

const populateDrinks = (drinks) => {
  const documents = [];
  drinks.forEach((drink) => {
    const glassObjectId = retrieveObjectId(glassesTable, drink.glass);
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
        glass: glassObjectId,
        instructions: drink.instructions,
        image: drink.image,
      });
      documents.push(document);
    } catch (e) {
      console.log("Caught Error on Drink Initialisation:", e.name);
    }
  });
  insertManyDocuments(Drink, documents);
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

const updateIngredientsCollection = async () => {
  let ingredientsDB = db.collection('ingredients');
  await ingredientsDB.countDocuments().then(async (count) => {
    console.log("Current Ingredient Count:", count);
    await dropCollection(Ingredient);
  });
  const ingredients = require('../ingredients.json');
  populateIngredients(ingredients);
};

const updateGlassesCollection = async () => {
  let glassesDB = db.collection('glasses');
  await glassesDB.countDocuments().then(async (count) => {
    console.log("Current Glass Count:", count);
    await dropCollection(Glass);
  });
  const glasses = require('../glasses.json');
  populateGlasses(glasses);
};

const updateDrinksCollection = async () => {
  let drinksDB = db.collection('drinks');
  await drinksDB.countDocuments().then(async (count) => {
    console.log("Current Drink Count:", count);
    await dropCollection(Drink);
  });
  const drinks = require('../drinks.json');
  const customDrinks = require('../customDrinks.json');
  populateDrinks(drinks);
  populateDrinks(customDrinks);
}

const populateDatabase = async (callback) => {
  await updateGlassesCollection();
  await updateIngredientsCollection();
  await updateDrinksCollection();
  callback();
}

populateDatabase(() => {
  setTimeout(() => {
    mongoose.disconnect();
    console.log("Connection Closed")
  },
    2000)
});
