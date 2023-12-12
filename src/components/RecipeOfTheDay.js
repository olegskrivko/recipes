import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const RecipeOfTheDay = () => {
  const API_KEY = "88345194a6e34c5e83770bdfa6af399c";
  const API_URL = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;

  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.recipes) && data.recipes.length > 0) {
            setRandomRecipe(data.recipes[0]);
          } else {
            throw new Error("Failed to fetch the random recipe");
          }
        } else {
          throw new Error("Failed to fetch the random recipe");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4" style={{ margin: "2rem", textAlign: "center" }}>
        Random Recipe of the Day
      </Typography>
      {/* Display the random recipe */}
      {!loading && !error && randomRecipe && (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h5">{randomRecipe.title}</Typography>
          <img
            src={randomRecipe.image} // Assuming the API response contains an 'image' property
            alt={randomRecipe.title}
            style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
          />
          {/* Display other details of the random recipe */}
          {/* You can include additional details as needed */}
        </div>
      )}
      {/* Display loading state */}
      {loading && (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Loading...
        </Typography>
      )}
      {/* Display error state */}
      {error && (
        <Typography
          variant="body1"
          style={{ textAlign: "center", color: "red" }}
        >
          {error}
        </Typography>
      )}
    </>
  );
};

export default RecipeOfTheDay;
