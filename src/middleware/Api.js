// api.js
import myrecipe from "../middleware/recipe.json";

export const fetchRecipe = () => {
  return new Promise((resolve) => {
    // Simulate API response delay (can be removed in a real API call)
    setTimeout(() => {
      resolve({
        recipe: myrecipe,
      });
    }, 1000); // Simulated delay of 1 second
  });
};
