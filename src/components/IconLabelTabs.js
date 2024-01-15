import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// Icons
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BlenderIcon from "@mui/icons-material/Blender";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Paper from "@mui/material/Paper";
import BoltIcon from "@mui/icons-material/Bolt";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import Grid from "@mui/material/Grid";
import NutritionDonutChart from "./NutritionDonutChart";

// const instruments = [
//   { id: 1, name: "Mixing Bowls", image: "mixing_bowls.jpg" },
//   { id: 2, name: "Rolling Pin", image: "rolling_pin.jpg" },
//   { id: 3, name: "Parchment Paper", image: "parchment_paper.jpg" },
//   { id: 4, name: "Measuring Cups and Spoons", image: "measuring_cups_spoons.jpg" },
//   { id: 5, name: "Spatula", image: "spatula.jpg" },
//   { id: 6, name: "Baking Trays", image: "baking_trays.jpg" },
//   { id: 7, name: "Sharp Knife", image: "sharp_knife.jpg" },
//   { id: 8, name: "Refrigerator", image: "refrigerator.jpg" },
//   { id: 9, name: "Pastry Brush", image: "pastry_brush.jpg" },
//   { id: 10, name: "Whisk or Hand Mixer", image: "whisk_hand_mixer.jpg" },
// ];
// const ingredients = ["flour", "milk", "sugar", "butter"];

const ingredients = [
  {
    section: "Puff Pastry Layers",
    items: [
      {
        id: 12334,
        name: "Puff pastry sheets",
        nameClean: "puff pastry sheets",
        amount: 500,
        consistency: "SOLID",
        unit: "g",
        image: "puff-pastry-sheets.jpg",
        original: "500 g of puff pastry sheets",
        measure: {
          metric: {
            amount: 500,
            unitShort: "g",
            unitLong: "grams",
          },
          us: {
            amount: 17.637,
            unitShort: "oz",
            unitLong: "ounces",
          },
        },
      },
      {
        id: 12351,
        name: "Butter",
        nameClean: "Butter",
        amount: 200,
        consistency: "SOLID",
        unit: "g",
        image: "butter.jpg",
        original: "200 g of Butter",
        measure: {
          metric: {
            amount: 200,
            unitShort: "g",
            unitLong: "grams",
          },
          us: {
            amount: 7.055,
            unitShort: "oz",
            unitLong: "ounces",
          },
        },
      },
      {
        id: 12352,
        name: "Flour",
        nameClean: "Flour",
        amount: 150,
        consistency: "SOLID",
        unit: "g",
        image: "flour.jpg",
        original: "150 g of Flour",
        measure: {
          metric: {
            amount: 150,
            unitShort: "g",
            unitLong: "grams",
          },
          us: {
            amount: 5.291,
            unitShort: "oz",
            unitLong: "ounces",
          },
        },
      },
      {
        id: 12354,
        name: "Eggs",
        nameClean: "Eggs",
        amount: 4,
        consistency: "SOLID",
        unit: "pcs",
        image: "eggs.jpg",
        original: "4 Eggs",
        measure: {
          metric: {
            amount: 4,
            unitShort: "pcs",
            unitLong: "pieces",
          },
          us: {
            amount: 4,
            unitShort: "pcs",
            unitLong: "pieces",
          },
        },
      },
      {
        id: 12355,
        name: "Vanilla extract",
        nameClean: "Vanilla extract",
        amount: 1,
        consistency: "LIQUID",
        unit: "teaspoon",
        image: "vanilla-extract.jpg",
        original: "1 teaspoon of Vanilla extract",
        measure: {
          metric: {
            amount: 1,
            unitShort: "tsp",
            unitLong: "teaspoon",
          },
          us: {
            amount: 1,
            unitShort: "tsp",
            unitLong: "teaspoon",
          },
        },
      },
    ],
  },
  {
    section: "Pastry Cream",
    items: [
      {
        id: 12346,
        name: "Milk",
        nameClean: "Milk",
        amount: 500,
        consistency: "LIQUID",
        unit: "ml",
        image: "milk.jpg",
        original: "500 ml of milk",
        measure: {
          metric: {
            amount: 500,
            unitShort: "ml",
            unitLong: "milliliters",
          },
          us: {
            amount: 16.907,
            unitShort: "fl oz",
            unitLong: "fluid ounces",
          },
        },
      },
      {
        id: 12347,
        name: "Sugar",
        nameClean: "Sugar",
        amount: 150,
        consistency: "POWDER",
        unit: "g",
        image: "sugar.jpg",
        original: "150 g of sugar",
        measure: {
          metric: {
            amount: 150,
            unitShort: "g",
            unitLong: "grams",
          },
          us: {
            amount: 5.291,
            unitShort: "oz",
            unitLong: "ounces",
          },
        },
      },
      {
        id: 12348,
        name: "Egg yolks",
        nameClean: "Egg yolks",
        amount: 6,
        consistency: "LIQUID",
        unit: "pcs",
        image: "egg-yolks.jpg",
        original: "6 Egg yolks",
        measure: {
          metric: {
            amount: 6,
            unitShort: "pcs",
            unitLong: "pieces",
          },
          us: {
            amount: 6,
            unitShort: "pcs",
            unitLong: "pieces",
          },
        },
      },
      {
        id: 12349,
        name: "Cornstarch",
        nameClean: "Cornstarch",
        amount: 30,
        consistency: "POWDER",
        unit: "g",
        image: "cornstarch.jpg",
        original: "30 g of Cornstarch",
        measure: {
          metric: {
            amount: 30,
            unitShort: "g",
            unitLong: "grams",
          },
          us: {
            amount: 1.058,
            unitShort: "oz",
            unitLong: "ounces",
          },
        },
      },
      {
        id: 12345,
        name: "Butter",
        nameClean: "Butter",
        amount: 200,
        consistency: "SOLID",
        unit: "g",
        image: "butter.jpg",
        original: "200 g of butter",
        measure: {
          metric: {
            amount: 200,
            unitShort: "g",
            unitLong: "grams",
          },
          us: {
            amount: 7.055,
            unitShort: "oz",
            unitLong: "ounces",
          },
        },
      },
      {
        id: 12350,
        name: "Vanilla extract",
        nameClean: "Vanilla extract",
        amount: 1,
        consistency: "LIQUID",
        unit: "tsp",
        image: "vanilla-extract.jpg",
        original: "1 tsp of Vanilla extract",
        measure: {
          metric: {
            amount: 1,
            unitShort: "tsp",
            unitLong: "teaspoon",
          },
          us: {
            amount: 1,
            unitShort: "tsp",
            unitLong: "teaspoon",
          },
        },
      },
    ],
  },
];

// const ingredients = [
//   {
//     sectionName: "Dough",
//     items: [
//       {
//         id: 1,
//         name: "Flour",
//         amount: 250,
//         unit: "g",
//         image: "flour.jpg",
//       },
//       {
//         id: 2,
//         name: "Sugar",
//         amount: 150,
//         unit: "g",
//         image: "sugar.jpg",
//       },
//       {
//         id: 3,
//         name: "Butter",
//         amount: 200,
//         unit: "g",
//         image: "butter.jpg",
//       },
//       // More ingredients for the dough
//     ],
//   },
//   {
//     sectionName: "Cream",
//     items: [
//       {
//         id: 4,
//         name: "Milk",
//         amount: 500,
//         unit: "ml",
//         image: "milk.jpg",
//       },
//       {
//         id: 5,
//         name: "Sugar",
//         amount: 100,
//         unit: "g",
//         image: "sugar.jpg",
//       },
//       {
//         id: 6,
//         name: "Vanilla extract",
//         amount: 1,
//         unit: "tsp",
//         image: "vanilla.jpg",
//       },
//       // More ingredients for the cream
//     ],
//   },
//   // More sections if needed
// ];

const notes = ["Dietary Information", "Recipe Scaling", "Ingredient Details", "Cooking Techniques", "Related Recipes", "Equipment Care Tips", "Seasonal Variations", "User-Generated Content", "Serving Suggestions", "Health Benefits", "Historical/Cultural Insights", "Cooking Troubleshooting", "Ingredient Sources", "User Interaction", "Food Pairing Suggestions"];
// const nutritionData = [
//   { id: 1, name: "Protein", amount: "25", percentOfDailyNeeds: "50", unit: "g" },
//   { id: 2, name: "Fat", amount: "15", percentOfDailyNeeds: "30", unit: "g" },
//   { id: 3, name: "Carbohydrates", amount: "60", percentOfDailyNeeds: "20", unit: "g" },
//   { id: 4, name: "Fiber", amount: "10", percentOfDailyNeeds: "40", unit: "g" },
//   // Add more fake data as needed...
// ];

const nutritionData = [
  { id: 2, name: "Total Fat", amount: 20, unit: "g", dailyNeedPercent: "31%" },
  { id: 3, name: "Saturated Fat", amount: 10, unit: "g", dailyNeedPercent: "50%" },
  { id: 5, name: "Sodium", amount: 1, unit: "g", dailyNeedPercent: "6%" },
  { id: 6, name: "Total Carbohydrates", amount: 25, unit: "g", dailyNeedPercent: "8%" },
  { id: 7, name: "Dietary Fiber", amount: 3, unit: "g", dailyNeedPercent: "12%" },
  { id: 8, name: "Sugars", amount: 15, unit: "g", dailyNeedPercent: "1%" },
  { id: 9, name: "Proteins", amount: 4.5, unit: "g", dailyNeedPercent: "9%" },
];

// const nutritionData = [
//   { id: 1, name: "Calories", amount: "250-350", unit: "calories", dailyNeedPercent: "12-17%" },
//   { id: 2, name: "Total Fat", amount: "15-25", unit: "grams", dailyNeedPercent: "23-38%" },
//   { id: 3, name: "Saturated Fat", amount: "8-12", unit: "grams", dailyNeedPercent: "40-60%" },
//   { id: 4, name: "Cholesterol", amount: "30-60", unit: "milligrams", dailyNeedPercent: "10-20%" },
//   { id: 5, name: "Sodium", amount: "100-200", unit: "milligrams", dailyNeedPercent: "4-8%" },
//   { id: 6, name: "Total Carbohydrates", amount: "20-30", unit: "grams", dailyNeedPercent: "6-10%" },
//   { id: 7, name: "Dietary Fiber", amount: "2-4", unit: "grams", dailyNeedPercent: "8-16%" },
//   { id: 8, name: "Sugars", amount: "10-20", unit: "grams", dailyNeedPercent: "NA" },
//   { id: 9, name: "Proteins", amount: "3-6", unit: "grams", dailyNeedPercent: "6-12%" },
// ];

export default function IconLabelTabs({ recipe }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Section = ({ section }) => (
    <div key={section.section}>
      <Typography variant="h6">{section.section}:</Typography>
      {section.items.map((ingredient) => (
        <div key={ingredient.id}>
          {/* <FormControlLabel control={<Checkbox />} label={`${ingredient.name} (${ingredient.amount} ${ingredient.unit})`} /> */}
          <FormControlLabel control={<Checkbox color="default" icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} />} label={`${ingredient.name} (${ingredient.amount} ${ingredient.unit})`} />
        </div>
      ))}
    </div>
  );

  const TabPanel = ({ value, index, children }) => {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ padding: "1rem 0" }}>{children}</Box>}
      </div>
    );
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div style={{ margin: "2rem 0" }}>
      <Tabs value={value} centered onChange={handleChange} aria-label="icon label tabs example">
        <Tab icon={<RestaurantIcon />} label="INGREDIENTS" sx={{ fontSize: "0.7rem" }} />
        <Tab icon={<BlenderIcon />} label="TOOLS" sx={{ fontSize: "0.7rem" }} />
        <Tab icon={<ShoppingCartIcon />} label="PRICE" sx={{ fontSize: "0.7rem" }} />
        <Tab icon={<DonutSmallIcon />} label="NUTRITION" sx={{ fontSize: "0.7rem" }} />
        {/* Add other tabs here */}
      </Tabs>

      <TabPanel value={value} index={0}>
        {/* <Typography variant="h6">Ingredients</Typography> */}
        {/* {ingredients.map((ingredient, index) => (
          <Typography key={index}>{ingredient}</Typography>
        ))} */}
        {/* {ingredients.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <Typography variant="h6">{section.sectionName}</Typography>
            {section.items.map((ingredient, ingredientIndex) => (
              <div key={ingredientIndex}>
                <img src={ingredient.image} alt={ingredient.name} />
                <Typography>{ingredient.name}</Typography>
                <Typography>
                  {ingredient.amount} {ingredient.unit}
                </Typography>
              </div>
            ))}
          </div>
        ))} */}
        {ingredients.map((section) => (
          <Section key={section.section} section={section} />
        ))}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* <Typography variant="h6">Instruments/Tools</Typography> */}
        {/* {instruments.map((instrument, index) => (
          <Typography key={index}>{instrument}</Typography>
        ))} */}
        {/* <Checkbox {...label} defaultChecked color="default" /> */}
        {/* <Checkbox {...label} defaultChecked color="default" icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}

        {recipe && recipe.instruments && (
          <div>
            {recipe.instruments.map((instrument) => (
              <div
                key={instrument.id} // Ensure each key is unique
                style={{
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControlLabel control={<Checkbox defaultChecked color="default" icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} />} label={instrument.name} />
                {/* <input
                  type="checkbox"
                  id={instrument.id}
                  name={instrument.name}
                  value={instrument.id}
                  style={{
                    marginRight: "8px",
                    padding: "0",
                    width: "16px",
                    height: "16px",
                    accentColor: "#1D1D1D",
                  }}
                />
                <label htmlFor={instrument.id}>{instrument.name}</label> */}
              </div>
            ))}
          </div>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* <Typography variant="h6">Ingredients Price</Typography> */}
        {/* {ingredients.map((ingredient, index) => (
          <Typography key={index}>{ingredient} 2$</Typography>
        ))} */}
        {ingredients.map((section) => (
          <Section key={section.section} section={section} />
        ))}
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid container spacing={3}>
          {/* <Typography variant="h6">Nutrition</Typography> */}
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              margin: "20px 0",
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="nutrition data table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Percent of Daily Needs</TableCell>
                    {/* <TableCell>Unit</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nutritionData &&
                    nutritionData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {item.amount} {item.unit}
                        </TableCell>
                        <TableCell>{item.dailyNeedPercent}</TableCell>
                        {/* <TableCell>{item.unit}</TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              margin: "20px 0",
            }}
          >
            <NutritionDonutChart nutritionData={nutritionData} />
          </Grid>
          {/* {notes.map((note, index) => (
          <Typography key={index}>{note}</Typography>
        ))} */}
        </Grid>
      </TabPanel>

      {/* Add more TabPanel components for other tabs */}
    </div>
  );
}

// export default function IconLabelTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Tabs value={value} centered onChange={handleChange} aria-label="icon label tabs example">
//       <Tab icon={<RestaurantIcon />} label="INGREDIENTS" />
//       <Tab icon={<BlenderIcon />} label="TOOLS" />
//       <Tab icon={<ShoppingCartIcon />} label="PRICE" />
//       <Tab icon={<NoteAltIcon />} label="NOTES" />
//     </Tabs>
//   );
// }
