const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    difficulty: String,
    prepTime: Number,
    cookTime: Number,
    ingredients: [{ type: String }],
    instructions: [{ type: String }],
    imageUrl: String,
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
