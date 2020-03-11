const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
  healthLabels: Array,
  ingredients: Array,
  calories: String,
  digest: Array
});

new mongoose.Schema({});

const recipe = new mongoose.model("Recipe", schema);

module.exports = recipe;
