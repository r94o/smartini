const mongoose = require("mongoose");
const Drink = require("../models/drink");
const Ingredient = require("../models/ingredient");

const mongoDb = process.env.MONGODB_TARGET || "cocktail_dev";
const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

mongoose.connect(mongoDbUrl);

const db = mongoose.connection;

const ingredients = [
  {
    name: "gin",
    displayName: "Gin",
  },
  {
    name: "vermouth",
    displayName: "Vermouth",
  },
  {
    name: "olive",
    displayName: "Olive",
  },
];

ingredients.forEach((ingredient) => {
  try {
    Ingredient.create({
      name: ingredient.name,
      displayName: ingredient.displayName,
    });
  } catch (e) {
    console.log("Caught Error:", e);
  }
});

setTimeout(() => mongoose.disconnect(), 5000);
