const Drink = require('../models/drink');

const DrinksController = {
  Index: (req, res) => {
    try {
      Drink.find().then((drinks) => {
        res.send({ drinks });
      });
    } catch (err) {
      res.status(500);
      return 'Error';
      // res.send(err);
    }
  },
  FilterByIdString: (req, res) => {
    try {
      Drink.findOne({ id: req.params.id }).then((drink) => {
        res.send({ drinks: [drink] });
      });
    } catch (err) {
      res.status(500);
      return 'Error';
      // res.send(err);
    }
  },
  FilterByIngredient: (req, res) => {
    const { ingredients } = req.body;
    try {
      Drink.find({ ingredients: { $in: ingredients } }).then((drinks) => {
        res.send({ drinks });
      });
    } catch (err) {
      res.status(500);
      // res.send(err);
    }
  },
  FilterByAllIngredientsAvailable: (req, res) => {
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({
        $expr: { $setIsSubset: ['$ingredients', queryIngredients] },
      }).then((drinks) => {
        res.json({ drinks });
      });
    } catch (err) {
      res.status(500);
      // res.send(err);
    }
  },
};

module.exports = DrinksController;
