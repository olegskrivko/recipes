import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Typography from "@mui/material/Typography";
// ... (other imports)

const CustomRecipesPage = () => {
  const API_URL = "http://localhost:3000/api/recipes";
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
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
    return <Typography variant="h4">Loading Recipes...</Typography>;
  }

  if (error) {
    return <Typography variant="h4">Error Loading Recipes: {error}</Typography>;
  }

  return (
    <>
      <Typography variant="h4" style={{ margin: "2rem", textAlign: "center" }}>
        All Recipes
      </Typography>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          {/* Link to the detailed view of the recipe */}
          <Link to={`/recipes/${recipe._id}`}>
            <Typography variant="h5" style={{ cursor: "pointer", textDecoration: "underline" }}>
              {recipe.title}
            </Typography>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CustomRecipesPage;
