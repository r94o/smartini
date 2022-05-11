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
  FilterByIngredients: (req, res) => {
    const queryIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());
    try {
      Drink.find({
        $expr: { $setIsSubset: [queryIngredients, '$ingredients'] },
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
  FindVideoByName: (req, res) => {
    const drinkName = encodeURIComponent(req.params.name).replace("'", "%27");
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
