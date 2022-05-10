const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    ingredients: [{ type: String }],
    measures: { type: Array },
    name: { type: String, unique: true, required: true },
    displayName: { type: String, required: true },
    category: { type: String },
    iba: { type: String },
    alcoholic: { type: String },
    glass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Glass",
    },
    instructions: { type: String, required: true },
    image: { type: String },
  },
);

const Drink = mongoose.model('Drink', DrinkSchema);

module.exports = Drink;
