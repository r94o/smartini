require('dotenv').config();
const mongoose = require('mongoose');
const mongoDb = process.env.MONGODB_TARGET || "cocktail_dev";
const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

mongoose.connect(mongoDbUrl);
const db = mongoose.connection;

const Drink = require('./models/drink');

const removeSearchIngredients = (ingredients, searchIngredients) => {
  // console.log("Cocktail:", ingredients);
  // console.log("Search:", searchIngredients);
  // console.log("Search Ingredients Contains:", searchIngredients);
  return ingredients.filter((ingredient) => !(searchIngredients.includes(ingredient)));
  // console.log("Cocktail After Filter:", ingredients);
};

const missingIngredient = {
  FilterByOneIngredientMissing: (req) => {
    const searchIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    console.log("Search Ingredients", searchIngredients)
    try {
      Drink.find({ ingredientStrings: { $in: searchIngredients } }).lean()
        .then((drinks) => {
          let pojoDrinks = drinks.map((drink) => {
            let returnObject = {};
            // console.log(drink._id);
            returnObject.id = drink._id;
            // console.log(drink.ingredientStrings);
            returnObject.ingredients = drink.ingredientStrings;
            return returnObject;
          })
          // console.log(pojoDrinks);

          pojoDrinks.forEach((drink) => {
            drink.ingredients = removeSearchIngredients(drink.ingredients, searchIngredients);
            drink.ingredientsFilteredLength = drink.ingredients.length;
          })
          console.log("Drinks", pojoDrinks);
        });
    } catch (e) {
      console.log("error");
    }
  }
};

let req = {
  body: {
    ingredients: [
      "vodka",
      "orange juice"
    ]
  }
}

missingIngredient.FilterByOneIngredientMissing(req);

module.exports = missingIngredient;
