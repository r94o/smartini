require('dotenv').config();
const mongoose = require('mongoose');
const mongoDb = process.env.MONGODB_TARGET || "cocktail_dev";
const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

mongoose.connect(mongoDbUrl);
const db = mongoose.connection;

const Drink = require('./models/drink');

const removeSearchIngredients = (ingredients, searchIngredients) => {
  return ingredients.filter((ingredient) => !(searchIngredients.includes(ingredient)));
};

const missingIngredient = {
  FilterByOneIngredientMissing: (req, res) => {
    const searchIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({ ingredientStrings: { $in: searchIngredients } })
        .lean()
        .then((drinks) => {
          let pojoDrinks = drinks.map((drink) => {
            let returnObject = {};
            returnObject._id = drink._id;
            returnObject.ingredients = drink.ingredientStrings;
            return returnObject;
          })

          pojoDrinks.forEach((drink) => {
            drink.ingredients = removeSearchIngredients(drink.ingredients, searchIngredients);
            drink.ingredientsFilteredLength = drink.ingredients.length;
          })
          const oneMissing = pojoDrinks.filter((drink) => drink.ingredientsFilteredLength == 1);
          const oneMissingIds = oneMissing.map(drink => drink._id);

          Drink.find({
            '_id': {
              $in: oneMissingIds
            }
          }).then((drinks) => {
            res.send(drinks);
          });
        })
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

const res = {
  send: (input) => {
    console.log(input)
  }
}

missingIngredient.FilterByOneIngredientMissing(req, res);

module.exports = missingIngredient;
