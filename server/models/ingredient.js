const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: { type: String },
    type: { type: String },
    alcoholic: { type: String },
    abv: { type: String },
    description: { type: String },
    image: { type: String }
  },
);

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
