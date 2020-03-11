import mongoose from "mongoose";
const recipe = mongoose.model("Recipe");

/**
 * Function to execute the create query to create the recipes.
 * @param {*} data recipe data
 * @param {*} callback callback function.
 */
exports.createRecipe = (data, callback) => {
  recipe.create(data).then(
    response => {
      callback(null, response);
    },
    error => {
      callback(error, null);
    }
  );
};

/**
 * Funtion to find the recipe from collections.
 * @param {*} query condition or expression to find the recipe from collection.
 * @param {*} callback callback function
 */
exports.findRecipe = (query, callback) => {
  recipe.findOne(query, callback);
};

/**
 * Function to execute the update query by recipe ID
 * @param {*} id recipe id
 * @param {*} data recipe data which we need to update.
 */
exports.updateRecipeById = (id, data, callback) => {
  recipe.findByIdAndUpdate(
    {
      _id: id
    },
    data,
    (err, response) => {
      callback(err, response);
    }
  );
};

/**
 * Function to execute the update query.
 * @param {*} query Condition or filter to find the recipe.
 * @param {*} data data which we need to update.
 * @param {*} options
 */
exports.updateRecipe = (query, data, options, callback) => {
  recipe.findOneAndUpdate(query, data, options, (err, response) => {
    callback(err, response);
  });
};

exports.deleteRecipe = function(query, callback) {
  recipe.deleteOne(query, callback);
};
