const Ingredient = require('../models/ingredient');

const IngredientsController = {
  Index: (req, res) => {
    Ingredient.find((err, ingredients) => {
      if (err) {
        // res.send(err);
        res.sendStatus(500);
      }
      res.status(200).send({ ingredients });
    });
  },
};

module.exports = IngredientsController;
