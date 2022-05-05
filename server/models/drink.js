const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    ingredients: { type: Array },
    measures: { type: Array },
    name: { type: String },
    displayName: { type: String },
    category: { type: String },
    iba: { type: String },
    alcoholic: { type: String },
    glass: { type: String },
    instructions: { type: String },
    image: { type: String },
  },
);

const Drink = mongoose.model('Drink', DrinkSchema);

module.exports = Drink;
