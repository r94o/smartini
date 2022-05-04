const Drink = require('../models/drink');

const DrinksController = {
  Index: (req, res) => {
    Drink.find((err, drinks) => {
      if (err) {
        throw err;
      }
      res.send({ drinks: drinks });
    })
  },
  FilterByIdString: (req, res) => {
    Drink.findOne({ id: req.params.id }).then((drink) => {
      console.log(drink.strDrink);
      res.send({ drinks: [drink] });
    });
  },
  FilterByIngredient: (req, res) => {
    const ingredients = req.body.ingredients;
    console.log("Contains Any:", ingredients);
    Drink.find({ ingredients: { $in: ingredients } }).then((drinks) => {
      res.send({ drinks: drinks });
    });
  },
  FilterByAllIngredientsAvailable: (req, res) => {
    const queryIngredients = req.body.ingredients;
    Drink.find({
      $expr: { $setIsSubset: ["$ingredients", queryIngredients] }
    }).then((drinks) => {
      res.json({ drinks: drinks });
    })
  }
}

module.exports = DrinksController;