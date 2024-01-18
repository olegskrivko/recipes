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
import { Grid, CssBaseline, AppBar, Toolbar, Typography, Container, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MealForm from "../components/dashboard/MealForm";
import MealList from "../components/dashboard/MealList";

import CuisineForm from "../components/dashboard/CuisineForm";
import CuisineList from "../components/dashboard/CuisineList";

import OccasionForm from "../components/dashboard/OccasionForm";
import OccasionList from "../components/dashboard/OccasionList";

import RecipeForm from "../components/dashboard/RecipeForm";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import CakeIcon from "@mui/icons-material/Cake";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
