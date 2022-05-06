const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: { type: String },
  },
);

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
