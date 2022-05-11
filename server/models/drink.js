const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema(
  {
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    }],
    ingredientStrings: [{ type: String }],
    ingredientTypes: [{ type: String }],
    measures: [{ type: String }],
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

DrinkSchema.virtual('namedId').get(function() {
  return this.ingredients
})

const Drink = mongoose.model('Drink', DrinkSchema);

module.exports = Drink;
