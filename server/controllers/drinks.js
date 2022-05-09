const Drink = require('../models/drink');
const Glass = require('../models/glass');

const DrinksController = {
  Index: (req, res) => {
    Drink.find()
      .populate("glass")
      .then((drinks) => {
        res.send({ drinks });
      });
  },
  FindByIdString: (req, res) => {
    Drink.findOne({ id: req.params.id })
      .populate("glass")
      .then((drink) => {
        res.send({ drinks: [drink] });
      });
  },
  FindByName: (req, res) => {
    const searchName = decodeURI(req.params.name);
    Drink.findOne({ name: searchName })
      .populate("glass")
      .then((drink) => {
        res.send({ drinks: [drink] });
      });
  },
  FilterByIngredient: (req, res) => {
    // const { ingredients } = req.body;
    const searchIngredient = decodeURI(req.params.ingredient);
    Drink.find({ ingredients: { $in: searchIngredient } })
      .populate("glass")
      .then((drinks) => {
        res.send({ drinks });
      });
  },
  FilterByAllIngredientsAvailable: (req, res) => {
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    Drink.find({
      $expr: { $setIsSubset: ['$ingredients', queryIngredients] },
    })
      .populate("glass")
      .then((drinks) => {
        res.json({ drinks });
      });
  },
};

module.exports = DrinksController;
