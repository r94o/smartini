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

const onlyUnique = (value, index, self) => {
  console.log(`value: ${value}, index ${index}, self ${self}`)
  return self.indexOf(value) === index;
};

const missingIngredient = {
  FilterByOneIngredientMissing: (req, res) => {
    const searchIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    console.log(searchIngredients)
    try {
      Drink.find({ ingredientStrings: { $in: searchIngredients } })
        // Drink.find()
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
          const oneMissingIngredients = oneMissing.map(drink => drink.ingredients[0]);
          const oneMissingIngredientsDict = [];
          oneMissingIngredients.forEach((ingredient) => {
            let missingObject = {};
            missingObject.name = ingredient;
            missingObject.number = oneMissingIngredients.filter((value) => value === ingredient).length;
            oneMissingIngredientsDict.push(missingObject);
          });
          const returnIngredients = {};
          oneMissingIngredients.forEach((ingredient) => {
            if (returnIngredients[ingredient]) {
              returnIngredients[ingredient] += 1;
            } else {
              returnIngredients[ingredient] = 1;
            }
          })

          const mappedReturnIngredients = [];
          for (const [key, value] of Object.entries(returnIngredients)) {
            mappedReturnIngredients.push(
              {
                name: key,
                number: value
              }
            )
          }

          const sortedReturnIngredients = mappedReturnIngredients.sort((a, b) => a.number > b.number ? -1 : 1)

          Drink.find({
            '_id': {
              $in: oneMissingIds
            }
          }).then((drinks) => {
            res.send({
              drinks: drinks,
              ingredientsToBuy: sortedReturnIngredients
            });
          });
        })
    } catch (e) {
      res.sendStatus(500);
    }
  }
};

let req = {
  body: {
    ingredients: [
      "grenadine",
      "orange juice",
      "cranberry juice",
      "dry vermouth",
      "olive"
    ]
  }
}

const res = {
  send: (input) => {
    console.log(input)
  },
  sendStatus: (input) => {
    console.log("Error:", input)
  },
}

missingIngredient.FilterByOneIngredientMissing(req, res);

module.exports = missingIngredient;
