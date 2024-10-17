require("dotenv").config();
const { initializeDB } = require("./db/db.connect");
const Recipe = require("./models/recipe.model");
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
initializeDB();

// to add data in recipe database
async function addData(data) {
  try {
    const recipe = new Recipe(data);
    return recipe.save();
  } catch (error) {
    throw error;
  }
}

app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await addData(req.body);
    res.status(200).json({ message: "Recipe added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe data ", error });
  }
});

//to get all recipes
async function getAllRecipes() {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    throw error;
  }
}
app.get("/recipes", async (req, res) => {
  try {
    const recipe = await getAllRecipes();
    if (recipe.length !== 0) {
      res.json(recipe);
    } else {
      res.status(400).json({ error: "No Recipe found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to get data" });
  }
});

// recipe details by title
async function recipeByTitle(recipeTitle) {
  try {
    const recipe = await Recipe.findOne({ title: recipeTitle });
    return recipe;
  } catch (error) {
    throw error;
  }
}
app.get("/recipes/:recipeTitle", async (req, res) => {
  try {
    const recipe = await recipeByTitle(req.params.recipeTitle);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(400).json({ error: "No recipe found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipe data" });
  }
});

// all recipes by author
async function getRecipesByAuthor(authorName) {
  try {
    const recipe = await Recipe.find({ author: authorName });
    return recipe;
  } catch (error) {
    throw error;
  }
}
app.get("/recipes/author/:authorName", async (req, res) => {
  try {
    const recipe = await getRecipesByAuthor(req.params.authorName);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status.json({ error: "No Recipe Found" });
    }
  } catch (error) {
    res.status.json({ error: "Failed to get data" });
  }
});
// get recipe with difficulty level easy
async function getEasyRecipe(difficultyLevel) {
  try {
    const recipe = await Recipe.find({ difficulty: difficultyLevel });
    //console.log(recipe);
    return recipe;
  } catch (error) {
    throw error;
  }
}
app.get("/recipes/difficulty/:level", async (req, res) => {
  try {
    const recipe = await getEasyRecipe(req.params.level);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(400).json({ error: "No recipe found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Data" });
  }
});
//update a recipe's difficulty level
async function updateDifficultyLevel(recipeId, dataToUpdate) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate);
    return recipe;
  } catch (error) {
    throw error;
  }
}
app.post("/recipes/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    if (recipeId) {
      const recipe = await updateDifficultyLevel(recipeId, req.body);
      res.status(200).json({ message: "Recipe updated successfully" });
    } else {
      res.status(400).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get data" });
  }
});
//update a recipe's
async function updateRecipe(recipeTitle, dataToUpdate) {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { title: recipeTitle },
      dataToUpdate
    );
    return recipe;
  } catch (error) {
    throw error;
  }
}
app.post("/recipes/title/:title", async (req, res) => {
  try {
    const recipeTitle = req.params.title;
    if (recipeTitle) {
      const recipe = await updateRecipe(recipeTitle, req.body);
      res.status(200).json({ message: "Recipe updated successfully" });
    } else {
      res.status(400).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get data" });
  }
});
// delete recipe with id
async function deleteRecipe(recipeId) {
  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    return recipe;
  } catch (error) {
    throw error;
  }
}
app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    if (recipeId) {
      const recipe = await deleteRecipe(recipeId);
      res
        .status(200)
        .json({ message: "Recipe Deleted successfully", recipe: recipe });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipe" });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
