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
const ingredientTypeDict = require("../ingredientTypeDict")

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

const populateIngredients = async (ingredients) => {
  const documents = [];
  ingredients.forEach((ingredient) => {
    let ingredientType = ingredientTypeDict[ingredient.name];
    try {
      let document = new Ingredient({
        name: ingredient.name,
        displayName: ingredient.displayName,
        type: ingredientType,
        alcoholic: ingredient.alcoholic,
        abv: ingredient.abv,
        description: ingredient.description,
        image: ingredient.image,
      });
      updateTable(ingredientsTable, document);
      documents.push(document)
    } catch (e) {
      console.log("Caught Error on Ingredient Initialisation:", e.name);
    }
  });
  insertManyDocuments(Ingredient, documents);
  console.log("Table:", ingredientsTable);
}

const populateGlasses = async (glasses) => {
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

const populateDrinks = async (drinks) => {
  const documents = [];
  drinks.forEach((drink) => {
    const glassObjectId = retrieveObjectId(glassesTable, drink.glass);
    const ingredientsIds = drink.ingredients.map((ingredient) => {
      console.log(`Mapping ${ingredient} to objectID`);
      return retrieveObjectId(ingredientsTable, ingredient);
    });
    console.log("Should be array of IDs", ingredientsIds)
    try {
      let document = new Drink({
        id: drink.id,
        name: drink.name,
        displayName: drink.displayName,
        ingredients: ingredientsIds,
        ingredientStrings: drink.ingredients,
        ingredientTypes: drink.types,
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
    await model.syncIndexes();
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
  if (ingredientsDB.name != null) {
    await ingredientsDB.countDocuments().then(async (count) => {
      console.log("Current Ingredient Count:", count);
      await dropCollection(Ingredient);
    });
  }
  const ingredients = require('../completeIngredients.json');
  const customIngredients = require('../customIngredients.json');
  await populateIngredients(ingredients);
  await populateIngredients(customIngredients);
};

const updateGlassesCollection = async () => {
  let glassesDB = db.collection('glasses');
  if (glassesDB.name != null) {
    await glassesDB.countDocuments().then(async (count) => {
      console.log("Current Glass Count:", count);
      await dropCollection(Glass);
    });
  }
  const glasses = require('../glasses.json');
  await populateGlasses(glasses);
};

const updateDrinksCollection = async () => {
  let drinksDB = db.collection('drinks');
  if (drinksDB.name != null) {
    await drinksDB.countDocuments().then(async (count) => {
      console.log("Current Drink Count:", count);
      await dropCollection(Drink);
    });
  }
  const drinks = require('../drinks.json');
  const customDrinks = require('../customDrinks.json');
  await populateDrinks(drinks);
  await populateDrinks(customDrinks);
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
