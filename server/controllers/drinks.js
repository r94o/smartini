const Drink = require('../models/drink');
const Glass = require('../models/glass');
const fetch = require('cross-fetch');

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
    console.log(req.body.ingredients);
    try {
      Drink.find({ $or:
        [{$expr: { $setIsSubset: ['$ingredientStrings', queryIngredients]} },
        {$expr: { $setIsSubset: ['$ingredientStrings', queryIngredients]} }]
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
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({ ingredients: { $in: searchIngredient } })
        .populate("glass")
        .then((drinks) => {
          res.json({ drinks });
        });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  FindVideoByName: (req, res) => {
    const drinkName = encodeURI(req.params.name);
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=how%20to%20make%20${drinkName}%20cocktail&type=video&key=${process.env.YOUTUBE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          const videoId = data.items[0].id.videoId
          res.json({ videoId })
        }
      });
  }
};

module.exports = DrinksController;
