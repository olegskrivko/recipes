import React from "react";
import { Typography, Button, Grid, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

// icons
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BoltIcon from "@mui/icons-material/Bolt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from "@mui/icons-material/Euro";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShareIcon from "@mui/icons-material/Share";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NutritionPanel({ nutritionData }) {
  return (
    <div>
      {nutritionData && (
        <ul>
          {nutritionData.map((item) => (
            <li key={item.id}>
              {item.name} {item.amount} Percent Of Daily Needs:{" "}
              {item.percentOfDailyNeeds} Unit: {item.unit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IngredientsPanel({ ingredients }) {
  return (
    <div>
      {ingredients && (
        <div>
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id} // Ensure each key is unique
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id={ingredient.id}
                name={ingredient.original}
                value={ingredient.original}
                style={{
                  marginRight: "8px",
                  padding: "0",
                  width: "1rem",
                  height: "1rem",
                  accentColor: "#1D1D1D",
                }}
              />
              <label htmlFor={ingredient.id}>{ingredient.original}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BasicTabs({ nutritionData, ingredients, recipeDetails }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* side card always visible part */}
      <CardContent>
        <Box>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <BoltIcon />
            </Grid>
            <Grid item>
              <Typography>450 Calories</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <SignalCellularAltIcon />
            </Grid>
            <Grid item>
              <Typography>Beginner</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <AccessTimeIcon />
            </Grid>
            <Grid item>
              <Typography>{recipeDetails.readyInMinutes} minutes</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <MonetizationOnIcon />
            </Grid>
            <Grid item>
              <Typography>
                {recipeDetails.pricePerServing}$ per serving
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <RamenDiningIcon />
            </Grid>
            <Grid item>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">Servings</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    background: "#1D1D1D !important",
                    padding: "4px 8px", // Adjust padding here
                    marginLeft: "4px",
                    marginRight: "8px",
                    minWidth: "3rem",
                  }}
                >
                  -
                </Button>
                <Typography style={{ margin: "0 4px" }}>
                  {recipeDetails.servings}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    background: "#1D1D1D !important",
                    padding: "4px 8px", // Adjust padding here
                    marginLeft: "4px",
                    marginRight: "8px",
                    minWidth: "3rem",
                  }}
                >
                  +
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      {/* side card tabs */}
      <CustomTabPanel value={value} index={0}>
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", marginBottom: "0.6rem" }}
        >
          Ingredients
        </Typography>
        <IngredientsPanel ingredients={ingredients} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", marginBottom: "0.6rem" }}
        >
          Nutrition Facts
        </Typography>
        <NutritionPanel nutritionData={nutritionData} />

        {/* <NutritionChart nutritionData={nutritionData} /> */}
        {/* Include the chart component here */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      {/* side card bottom buttons */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            icon={<RestaurantIcon />}
            // label="Ingredients"
            {...a11yProps(0)}
            aria-label="Ingredients"
          />

          {/* <Tab
              icon={<DonutSmallIcon />}
              label="Nutrition"
              {...a11yProps(1)}
              aria-label="Nutrition"
            /> */}

          <Tab
            icon={<EuroIcon />}
            // label="Price"
            {...a11yProps(1)}
            aria-label="Price"
          />
          <Tab
            icon={<BookmarkIcon />}
            // label="Share"
            {...a11yProps(2)}
            aria-label="Bookmark"
          />
          <Tab
            icon={<ShareIcon />}
            // label="Share"
            {...a11yProps(2)}
            aria-label="Share"
          />
        </Tabs>
      </Box>
    </Box>
  );
}

export default BasicTabs;