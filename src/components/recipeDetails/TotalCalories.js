// TotalCalories.js

import React from "react";

const TotalCalories = ({ ingredients }) => {
  const calculateTotalNutrition = (data) => {
    return data.reduce(
      (total, category) => {
        category.items.forEach((item) => {
          const allowedUnit = item.ingredient.allowedUnits.find((unit) => unit.unit.name === item.unit);

          if (allowedUnit) {
            const adjustedQuantity = item.quantity * allowedUnit.conversionFactor;
            total.calories += (item.ingredient.calories / 100) * adjustedQuantity;
          } else {
            console.error(`Conversion factor not found for unit ${item.unit} in ingredient ${item.ingredient.name}`);
          }
        });

        return total;
      },
      { calories: 0 }
    );
  };
  // Calculate the total nutrition for all ingredients
  const totalNutrition = calculateTotalNutrition(ingredients);
  //const totalNutrition = calculateTotalNutrition(ingredients.reduce((allItems, category) => allItems.concat(category.items), []));

  return <>{totalNutrition.calories.toFixed()}</>;
};

export default TotalCalories;
