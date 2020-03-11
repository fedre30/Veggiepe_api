import express from "express";
const router = express.Router();
import recipe from "../controller/recipe";

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

/**
 * To create the New recipe
 */
router.post("/", recipe.create);

/**
 * TO get the single recipe by their recipename eg.email
 */
router.get("/recipe/:name", recipe.find);

/**
 * To update recipe data(fields) by recipe ID
 */
router.put("/updatebyid", recipe.updateById);

/**
 * To update the recipe data by filter condition
 */
router.put("/update", recipe.update);

/**
 * To delete the recipe by condition
 */
router.delete("/delete", recipe.delete);

module.exports = router;
