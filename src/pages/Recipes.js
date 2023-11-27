import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import RecipeCard from "../components/RecipeCard";
import SkeletonRecipeCard from "../components/SkeletonRecipeCard";
import CustomAlert from "../components/CustomAlert";

const Recipes = () => {
  const API_KEY = "88345194a6e34c5e83770bdfa6af399cz";
  const initialCardCount = 12; // Initial number of cards to load
  const API_URL = `https://api.spoonacular.com/recipes/random?number=${initialCardCount}&apiKey=${API_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes);
        } else {
          throw new Error("Failed to fetch recipes");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <h1>All Recipes</h1>
        <Grid container spacing={3}>
          {[...Array(initialCardCount)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <SkeletonRecipeCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  if (error) {
    return <CustomAlert errorMessage={error} />; // Show an error message if there's an error
  }

  return (
    <>
      <h1>All Recipes</h1>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
    </>
  );
};

export default Recipes;
