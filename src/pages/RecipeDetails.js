import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";

import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions } from "@mui/material";
// import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import RecipeCard from "../components/RecipeCard";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const API_KEY = "88345194a6e34c5e83770bdfa6af399c"; // Replace with your actual API key
  const API_URL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`;
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRecipe(data); // Assuming API returns details of a single recipe
        } else {
          throw new Error("Failed to fetch recipe details");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  useEffect(() => {
    if (recipe) {
      const nutrientsData = recipe.nutrition.nutrients.slice(0, 5);

      const labels = nutrientsData.map((nutrient) => nutrient.name);
      const values = nutrientsData.map((nutrient) => nutrient.amount);

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Nutritional Values",
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    }
  }, [recipe]);

  useEffect(() => {
    let chart = null;

    const renderChart = () => {
      const ctx = document.getElementById("nutrientsChart");

      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: "pie",
        data: chartData,
      });
    };

    if (chartData) {
      renderChart();
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          {recipe ? (
            <Card>
              <CardContent>
                <Typography
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {recipe.title}
                </Typography>
                {/* <h2>{recipe.title}</h2> */}

                <img src={recipe.image} alt={recipe.title} />
                <div dangerouslySetInnerHTML={createMarkup(recipe.summary)} />

                <p>Servings: {recipe.servings}</p>
                <p>ReadyInMinutes: {recipe.readyInMinutes}</p>
                <p>Price Per Serving: ${recipe.pricePerServing}</p>
                <h3>Dish Types:</h3>
                <ul>
                  {recipe.dishTypes.map((dishType) => (
                    <li key={dishType}>{dishType}</li>
                  ))}
                </ul>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
                {/* Display other details of the recipe */}
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.nutrition.nutrients.map((item) => (
                    <li key={item.id}>
                      Name: {item.name} Amount: {item.amount} Percent Of Daily
                      Needs: {item.percentOfDailyNeeds} Unit: {item.unit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <p>Loading...</p>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          {recipe ? (
            <Card>
              <CardContent>
                {/* ... (Other recipe details) */}
                {chartData && (
                  <div>
                    <h3>Nutritional Values Chart:</h3>
                    <canvas
                      id="nutrientsChart"
                      width="400"
                      height="400"
                    ></canvas>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default RecipeDetails;
