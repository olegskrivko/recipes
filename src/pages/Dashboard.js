// import React from "react";
// import DishTypeForm from "../components/dashboard/DishTypeForm";
// import DishTypeList from "../components/dashboard/DishTypeList";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {/* Dish Types Management */}
//       <section>
//         <h2>Dish Types</h2>
//         {/* Display a list of dish types */}
//         {/* Add form or dialog for creating new dish types */}
//         {/* Add functionality to edit or delete dish types */}
//         <DishTypeForm />
//         <DishTypeList />
//       </section>

//       {/* Recipe Management */}
//       <section>
//         <h2>Recipes</h2>
//         {/* Display a list of recipes */}
//         {/* Add form or dialog for creating new recipes */}
//         {/* Add functionality to edit or delete recipes */}
//       </section>

//       {/* Categories Management */}
//       <section>
//         <h2>Categories</h2>
//         {/* Display a list of categories */}
//         {/* Add form or dialog for creating new categories */}
//         {/* Add functionality to edit or delete categories */}
//       </section>

//       {/* User Profile */}
//       <section>
//         <h2>User Profile</h2>
//         {/* Display user information */}
//         {/* Allow users to update their profiles */}
//       </section>

//       {/* Statistics and Insights */}
//       <section>
//         <h2>Statistics</h2>
//         {/* Display charts or statistics */}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { Grid, CssBaseline, AppBar, Toolbar, Typography, Container, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import MealForm from "../components/dashboard/MealForm";
import MealList from "../components/dashboard/MealList";

import CuisineForm from "../components/dashboard/CuisineForm";
import CuisineList from "../components/dashboard/CuisineList";

import OccasionForm from "../components/dashboard/OccasionForm";
import OccasionList from "../components/dashboard/OccasionList";

import ToolForm from "../components/dashboard/ToolForm";
import ToolList from "../components/dashboard/ToolList";

import AllergenForm from "../components/dashboard/AllergenForm";
import AllergenList from "../components/dashboard/AllergenList";

import CookingMethodForm from "../components/dashboard/CookingMethodForm";
import CookingMethodList from "../components/dashboard/CookingMethodList";

import DietForm from "../components/dashboard/DietForm";
import DietList from "../components/dashboard/DietList";

import IngredientForm from "../components/dashboard/IngredientForm";
import IngredientList from "../components/dashboard/IngredientList";

import UnitForm from "../components/dashboard/UnitForm";
import UnitList from "../components/dashboard/UnitList";

import IngredientCategoryForm from "../components/dashboard/IngredientCategoryForm";
import IngredientCategoryList from "../components/dashboard/IngredientCategoryList";

import TimeForm from "../components/dashboard/TimeForm";
import TimeList from "../components/dashboard/TimeList";

import RecipeForm from "../components/dashboard/RecipeForm";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import CakeIcon from "@mui/icons-material/Cake";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BlenderIcon from "@mui/icons-material/Blender";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ScaleIcon from "@mui/icons-material/Scale";
import SchemaIcon from "@mui/icons-material/Schema";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("recipes");

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <Grid container spacing={2}>
      <CssBaseline />
      {/* <Grid item xs={12}>
        <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
        </AppBar>
      </Grid> */}
      <Grid item xs={4}>
        <Container>
          {/* Sidebar with Icons */}
          <List>
            <ListItem button selected={selectedPage === "recipes"} onClick={() => handlePageChange("recipes")}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Recipes" />
            </ListItem>
            <Divider component="li" />
            <ListItem button selected={selectedPage === "meals"} onClick={() => handlePageChange("meals")}>
              <ListItemIcon>
                <BrunchDiningIcon />
              </ListItemIcon>
              <ListItemText primary="Meals" />
            </ListItem>
            <ListItem button selected={selectedPage === "cuisines"} onClick={() => handlePageChange("cuisines")}>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Cuisines" />
            </ListItem>
            <ListItem button selected={selectedPage === "occasions"} onClick={() => handlePageChange("occasions")}>
              <ListItemIcon>
                <CakeIcon />
              </ListItemIcon>
              <ListItemText primary="Occasions" />
            </ListItem>
            <ListItem button selected={selectedPage === "tools"} onClick={() => handlePageChange("tools")}>
              <ListItemIcon>
                <BlenderIcon />
              </ListItemIcon>
              <ListItemText primary="Tools" />
            </ListItem>
            <ListItem button selected={selectedPage === "allergens"} onClick={() => handlePageChange("allergens")}>
              <ListItemIcon>
                <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText primary="Allergens" />
            </ListItem>
            <ListItem button selected={selectedPage === "cookingMethods"} onClick={() => handlePageChange("cookingMethods")}>
              <ListItemIcon>
                <OutdoorGrillIcon />
              </ListItemIcon>
              <ListItemText primary="Cooking Methods" />
            </ListItem>
            <ListItem button selected={selectedPage === "diets"} onClick={() => handlePageChange("diets")}>
              <ListItemIcon>
                <NoMealsIcon />
              </ListItemIcon>
              <ListItemText primary="Diets" />
            </ListItem>
            <ListItem button selected={selectedPage === "ingredients"} onClick={() => handlePageChange("ingredients")}>
              <ListItemIcon>
                <KitchenIcon />
              </ListItemIcon>
              <ListItemText primary="Ingredients" />
            </ListItem>
            <ListItem button selected={selectedPage === "units"} onClick={() => handlePageChange("units")}>
              <ListItemIcon>
                <ScaleIcon />
              </ListItemIcon>
              <ListItemText primary="Units" />
            </ListItem>
            <ListItem button selected={selectedPage === "ingredientCategories"} onClick={() => handlePageChange("ingredientCategories")}>
              <ListItemIcon>
                <SchemaIcon />
              </ListItemIcon>
              <ListItemText primary="Ingredient Categories" />
            </ListItem>

            <ListItem button selected={selectedPage === "times"} onClick={() => handlePageChange("times")}>
              <ListItemIcon>
                <AccessTimeSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Times" />
            </ListItem>

            <ListItem button selected={selectedPage === "userProfile"} onClick={() => handlePageChange("userProfile")}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItem>
            {/* Add more sidebar items with icons for other pages */}
          </List>
        </Container>
      </Grid>
      <Grid item xs={8}>
        <Container>
          {/* Main Content */}
          {selectedPage === "recipes" && (
            <section>
              <h2>Recipes</h2>
              <RecipeForm />
              {/* Add components for managing recipes */}
            </section>
          )}
          {selectedPage === "meals" && (
            <section>
              <h2>Meals</h2>
              <MealForm />
              <MealList />
            </section>
          )}
          {selectedPage === "cuisines" && (
            <section>
              <h2>Cuisines</h2>
              <CuisineForm />
              <CuisineList />
              {/* Add components for managing cuisines */}
            </section>
          )}
          {selectedPage === "occasions" && (
            <section>
              <h2>Occasions</h2>
              <OccasionForm />
              <OccasionList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "tools" && (
            <section>
              <h2>Tools</h2>
              <ToolForm />
              <ToolList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "allergens" && (
            <section>
              <h2>Allergens</h2>
              <AllergenForm />
              <AllergenList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "cookingMethods" && (
            <section>
              <h2>Cooking Methods</h2>
              <CookingMethodForm />
              <CookingMethodList />
              {/* Add components for managing occasions */}
            </section>
          )}
          {selectedPage === "diets" && (
            <section>
              <h2>Diets</h2>
              <DietForm />
              <DietList />
              {/* Add components for managing occasions */}
            </section>
          )}
          {selectedPage === "ingredients" && (
            <section>
              <h2>Ingredients</h2>
              <IngredientForm />
              <IngredientList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "units" && (
            <section>
              <h2>Units</h2>
              <UnitForm />
              <UnitList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "ingredientCategories" && (
            <section>
              <h2>Ingredient Categories</h2>
              <IngredientCategoryForm />
              <IngredientCategoryList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "times" && (
            <section>
              <h2>Times</h2>
              <TimeForm />
              <TimeList />
              {/* Add components for managing occasions */}
            </section>
          )}

          {selectedPage === "userProfile" && (
            <section>
              <h2>User Profile</h2>
              {/* Add components for managing user profile */}
            </section>
          )}
          {/* Add more sections for other pages */}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
