const Drink = require('../models/drink');
const Glass = require('../models/glass');
const fetch = require('cross-fetch');

const removeSearchIngredients = (ingredients, searchIngredients) => {
  return ingredients.filter((ingredient) => !(searchIngredients.includes(ingredient)));
};

const DrinksController = {
  Index: (req, res) => {
    try {
      Drink.find()
        .populate("glass")
        .then((drinks) => {
          res.send({ drinks });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  FindByIdString: (req, res) => {
    try {
      Drink.findOne({ id: req.params.id })
        .populate("glass")
        .then((drink) => {
          res.send({ drinks: [drink] });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  FindByName: (req, res) => {
    const searchName = decodeURI(req.params.name);
    try {
      Drink.findOne({ name: searchName })
        .populate("glass")
        .then((drink) => {
          res.send({ drinks: [drink] });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  FilterByIngredients: (req, res) => {
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({
        $expr: { $setIsSubset: [queryIngredients, '$ingredientStrings'] },
      })
        .populate("glass")
        .then((drinks) => {
          res.json({ drinks });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  FilterByAllIngredientsAvailable: (req, res) => {
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({
        $expr: { $setIsSubset: ['$ingredientStrings', queryIngredients] },
      })
        .populate("glass")
        .then((drinks) => {
          res.json({ drinks });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
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
  },
  FindVideoByName: (req, res) => {
    const drinkName = encodeURIComponent(req.params.name).replace("'", "%27");
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=how%20to%20make%20${drinkName}%20cocktail&type=video&key=${process.env.YOUTUBE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          const videoId = data.items[0].id.videoId
          res.json({ videoId })
        } else {
          res.json({ videoId: ""})
        }
      });
  }
};

module.exports = DrinksController;
