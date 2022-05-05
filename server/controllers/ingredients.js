const Ingredient = require('../models/ingredient');

const IngredientsController = {
  Index: (req, res) => {
    Ingredient.find((err, ingredients) => {
      if (err) {
        throw err;
      }
      res.send({ ingredients });
    });
  },
};

module.exports = IngredientsController;
