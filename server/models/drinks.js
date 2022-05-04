const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema(
  {
    id: { type: String },
    ingredients: { type: Array },
    measures: { type: Array },
    strDrink: { type: String },
    strTags: { type: String },
    strCategory: { type: String },
    strIBA: { type: String },
    strAlcoholic: { type: String },
    strGlass: { type: String },
    strInstructions: { type: String },
    strDrinkThumb: { type: String },
    strImageSource: { type: String },
    strImageAttribution: { type: String },
    strCreativeCommonsConfirmed: { type: String },
    dateModified: { type: String },
  },
);

const Drink = mongoose.model('Drink', DrinkSchema);

module.exports = Drink;
