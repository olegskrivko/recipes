import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Icons
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BlenderIcon from "@mui/icons-material/Blender";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Paper from "@mui/material/Paper";
import BoltIcon from "@mui/icons-material/Bolt";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const instruments = ["Mixing Bowls", "Rolling Pin", "Parchment Paper", "Measuring Cups and Spoons", "Spatula", "Baking Trays", "Sharp Knife", "Refrigerator", "Pastry Brush", "Whisk or Hand Mixer"];
const ingredients = ["flour", "milk", "sugar", "butter"];

const notes = ["Dietary Information", "Recipe Scaling", "Ingredient Details", "Cooking Techniques", "Related Recipes", "Equipment Care Tips", "Seasonal Variations", "User-Generated Content", "Serving Suggestions", "Health Benefits", "Historical/Cultural Insights", "Cooking Troubleshooting", "Ingredient Sources", "User Interaction", "Food Pairing Suggestions"];
const nutritionData = [
  { id: 1, name: "Protein", amount: "25", percentOfDailyNeeds: "50", unit: "g" },
  { id: 2, name: "Fat", amount: "15", percentOfDailyNeeds: "30", unit: "g" },
  { id: 3, name: "Carbohydrates", amount: "60", percentOfDailyNeeds: "20", unit: "g" },
  { id: 4, name: "Fiber", amount: "10", percentOfDailyNeeds: "40", unit: "g" },
  // Add more fake data as needed...
];
export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({ value, index, children }) => {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  return (
    <div>
      <Tabs value={value} centered onChange={handleChange} aria-label="icon label tabs example">
        <Tab icon={<RestaurantIcon />} label="INGREDIENTS" />
        <Tab icon={<BlenderIcon />} label="TOOLS" />
        <Tab icon={<ShoppingCartIcon />} label="PRICE" />
        <Tab icon={<BoltIcon />} label="NUTRITION" />
        {/* Add other tabs here */}
      </Tabs>

      <TabPanel value={value} index={0}>
        {/* <Typography variant="h6">Ingredients</Typography> */}
        {ingredients.map((ingredient, index) => (
          <Typography key={index}>{ingredient}</Typography>
        ))}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* <Typography variant="h6">Instruments/Tools</Typography> */}
        {instruments.map((instrument, index) => (
          <Typography key={index}>{instrument}</Typography>
        ))}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* <Typography variant="h6">Ingredients Price</Typography> */}
        {ingredients.map((ingredient, index) => (
          <Typography key={index}>{ingredient} 2$</Typography>
        ))}
      </TabPanel>

      <TabPanel value={value} index={3}>
        {/* <Typography variant="h6">Nutrition</Typography> */}
        <TableContainer component={Paper}>
          <Table aria-label="nutrition data table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>% of Daily Needs</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutritionData &&
                nutritionData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.percentOfDailyNeeds}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {notes.map((note, index) => (
          <Typography key={index}>{note}</Typography>
        ))} */}
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
