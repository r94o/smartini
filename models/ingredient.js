const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
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

IngredientSchema.virtual('namedId').get(function() {
  return `${this.id} <${this.name}>`
})

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
