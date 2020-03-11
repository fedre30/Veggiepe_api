import recipeService from "../service/recipe";

/**
 * Function to create the recipe in recipe collection.
 */
exports.create = (req, res, next) => {
  const body = new Recipe(req.body);
  if (!body.recipename) {
    res.status(400).send("Recipe is missing");
    return;
  }
  recipeService.createRecipe(body, function(error, response) {
    if (response) {
      res.status(201).send(response);
    } else if (error) {
      res.status(400).send(error);
    }
  });
};

/**
 * Function to find recipe from recipe collection.
 */
exports.find = (req, res) => {
  const params = req.params || {};
  const query = {
    recipe: params.recipe
  };
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  recipeService.findRecipe(query, function(error, response) {
    if (error) {
      res.status(404).send(error);
      return;
    }
    if (response) {
      res.status(200).send(response);
      return;
    }
    if (!response) {
      res.status(204).send("No Data Found");
    }
  });
};

/**
 * Function to update the recipe data  by their ID.
 */
exports.updateById = (req, res) => {
  const body = req.body;

  if (!body.id) {
    res.status(400).send("Id is missing");
    return;
  }
  const updateData = body.data || {};
  recipeService.updateRecipeById(body.id, updateData, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

/**
 * Function to uodate the recipe data by filter condition.
 */
exports.update = (req, res) => {
  const body = req.body;
  const query = body.query;
  const data = body.data;
  const options = body.options;
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  recipeService.updateRecipe(query, data, options, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

/**
 * Function to delete the recipe from collection.
 */
exports.delete = (req, res) => {
  const body = req.body || {};
  const query = body.query;
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  recipeService.deleteRecipe(query, function(error, response) {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (response) {
      if (response.n === 1 && response.ok === 1) {
        res.status(202).send(body);
      }
      if (response.n === 0 && response.ok === 1) {
        res.status(204).send({
          message: "No data found"
        });
      }
    }
  });
};
//TODO:
// Model.find()
// Model.findById()

class Recipe {
  constructor(recipeData) {
    this.name = recipeData.name || "";
    this.url = recipeData.url || "";
    this.image = recipeData.image || "";
    this.healthLabels = recipeData.healthLabels || [];
    this.ingredients = recipeData.ingredients || [];
    this.calories = recipeData.calories || "";
    this.digest = recipeData.digest || [];
  }
}
