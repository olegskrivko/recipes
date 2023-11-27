import React from "react";
import Grid from "@mui/material/Grid";
import RecipeCard from "./RecipeCard";
import SkeletonRecipeCard from "./SkeletonRecipeCard";
import CustomAlert from "./CustomAlert";

const RecipeList = ({ recipes, loading, initialCardCount, error }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(initialCardCount)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <SkeletonRecipeCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <CustomAlert errorMessage={error} />; // Show an error message if there's an error
  }

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
};

export default RecipeList;
