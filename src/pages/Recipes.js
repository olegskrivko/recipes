import { useEffect, useState } from "react";
import React from "react";
import Grid from "@mui/material/Grid";
import RecipeCard from "../components/RecipeCard";
const API_KEY = "88345194a6e34c5e83770bdfa6af399c"; // Replace with your actual API key
const API_URL = `https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes when the component mounts
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes); // Assuming API returns an array of recipes
        } else {
          throw new Error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>

      <Grid container spacing={3}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
          //  <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
        ))}
      </Grid>
    </div>
  );
};

export default Recipes;

// function RecipeList({ recipes }) {
//     return (
//       <Grid container spacing={3}>
//         {recipes.map((recipe, index) => (
//           <RecipeCard key={index} recipe={recipe} />
//         ))}
//       </Grid>
//     );
//   }

//   export default RecipeList;
