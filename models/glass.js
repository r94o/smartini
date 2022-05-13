const mongoose = require('mongoose');

const GlassSchema = new mongoose.Schema(
  {
    name: String,
    displayName: String,
    image: String,
  },
);

const Glass = mongoose.model("Glass", GlassSchema);

module.exports = Glass;