const Drink = require('../models/drink');
const Glass = require('../models/glass');

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
  FilterByIngredient: (req, res) => {
    const searchIngredient = decodeURI(req.params.ingredient);
    try {
      Drink.find({ ingredients: { $in: searchIngredient } })
        .populate("glass")
        .then((drinks) => {
          res.send({ drinks });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  FilterByAllIngredientsAvailable: (req, res) => {
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({
        $expr: { $setIsSubset: ['$ingredients', queryIngredients] },
      })
        .populate("glass")
        .then((drinks) => {
          res.json({ drinks });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
};

module.exports = DrinksController;
