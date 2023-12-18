import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

import EuroIcon from "@mui/icons-material/Euro";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
// import NutritionChart from "../components/NutritionChart";

// Render dish type buttons
function DishTypeButtons({ dishTypes }) {
  return (
    <Stack direction="row" spacing={1}>
      {dishTypes.map((dishType) => (
        <Button key={dishType} variant="contained" color="primary" size="small">
          {dishType}
        </Button>
      ))}
    </Stack>
  );
}

function HalfRating({ score }) {
  const [convertedScore, setConvertedScore] = useState(0);

  useEffect(() => {
    // Convert the score to fit within a 5-star rating system (assuming the score is out of 100)
    // const converted = Math.round((score / 100) * 5 * 2) / 2; // Convert 100 to 5, keeping precision
    // setConvertedScore(converted);

    const convertedScore = (score / 100) * 5;
    setConvertedScore(convertedScore);
  }, [score]);

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        value={convertedScore} // Set the health score as the value
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}

function RecipeSteps({ analyzedInstructions }) {
  return (
    <div>
      {analyzedInstructions.map((instruction, index) => (
        <div key={index}>
          <h3>{instruction.name}</h3>
          <ul>
            {instruction.steps.map((step) => (
              <li key={step.number}>
                <p>
                  Step {step.number}: {step.step}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
function VerticalLinearStepper({ analyzedInstructions }) {
  const steps = analyzedInstructions.flatMap((instruction) =>
    instruction.steps.map((step) => step.step)
  );

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

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
          <Typography>{children}</Typography>
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
              Name: {item.name} Amount: {item.amount} Percent Of Daily Needs:{" "}
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
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
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
      {/* <CustomTabPanel value={value} index={0}>
        <Typography>Ingredients</Typography>
        <IngredientsPanel ingredients={ingredients} />
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={0}>
        <Box mt={2}>
          <Typography variant="h6">Recipe Details</Typography>
          <Typography>Servings: {recipeDetails.servings}</Typography>
          <Typography>
            Ready in Minutes: {recipeDetails.readyInMinutes}
          </Typography>
          <Typography>
            Price Per Serving: ${recipeDetails.pricePerServing}
          </Typography>
          {/* Add other recipe details here */}
        </Box>
        <Typography>Ingredients</Typography>
        <IngredientsPanel ingredients={ingredients} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Typography>Nutrition Facts</Typography>
        <NutritionPanel nutritionData={nutritionData} />
        {/* <NutritionChart nutritionData={nutritionData} /> */}
        {/* Include the chart component here */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<RestaurantIcon />}
            label="Ingredients"
            {...a11yProps(0)}
            aria-label="Ingredients"
          />

          <Tab
            icon={<DonutSmallIcon />}
            label="Nutrition"
            {...a11yProps(1)}
            aria-label="Nutrition"
          />

          <Tab
            icon={<EuroIcon />}
            label="Price"
            {...a11yProps(2)}
            aria-label="Price"
          />
        </Tabs>
      </Box>
    </Box>
  );
}

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [analyzedInstructions, setAnalyzedInstructions] = useState([]); // New state

  // const [instructions, setInstructions] = useState([]);

  const API_KEY = "88345194a6e34c5e83770bdfa6af399c";
  const API_URL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data); // Set the fetched recipe data
          console.log(data);

          // Check if analyzedInstructions exist and has steps
          if (
            data.analyzedInstructions &&
            data.analyzedInstructions.length > 0
          ) {
            setInstructions(data.analyzedInstructions[0].steps);
            setAnalyzedInstructions(data.analyzedInstructions); // Set the analyzedInstructions state
          } else {
            setInstructions([]); // Set instructions as an empty array if not available
          }
        } else {
          throw new Error("Failed to fetch recipe details");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe.extendedIngredients);
      const nutrientsData = recipe.nutrition.nutrients.slice(0, 5);
      setNutritionData(nutrientsData);
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe.extendedIngredients);
      const nutrientsData = recipe.nutrition.nutrients.slice(0, 5);
      setNutritionData(nutrientsData);
    }
  }, [recipe]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
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
                {/* Pass health score to HalfRating component */}
                <HalfRating score={recipe.spoonacularScore} />

                {/* <p>Servings: {recipe.servings}</p>
                <p>ReadyInMinutes: {recipe.readyInMinutes}</p>
                <p>Price Per Serving: ${recipe.pricePerServing}</p> */}

                <Typography>Dish Types</Typography>
                <DishTypeButtons dishTypes={recipe.dishTypes} />

                <Typography>Cuisines</Typography>
                <DishTypeButtons dishTypes={recipe.cuisines} />
                <Typography>Diets</Typography>
                <DishTypeButtons dishTypes={recipe.diets} />
                <Typography>Occasions</Typography>
                <DishTypeButtons dishTypes={recipe.occasions} />

                <h3>Instructions:</h3>

                {analyzedInstructions.length > 0 ? (
                  <VerticalLinearStepper
                    analyzedInstructions={analyzedInstructions}
                  />
                ) : (
                  <p>No instructions available</p>
                )}
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
        <Grid item xs={12} md={4}>
          {/* Card with basic recipe details and tabs */}
          {recipe ? (
            <Card>
              <CardContent>
                {/* Basic recipe details */}
                <BasicTabs
                  nutritionData={nutritionData}
                  ingredients={ingredients}
                  recipeDetails={recipe} // Pass the recipe details here
                />
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
        {/* Chart */}
      </Grid>
    </>
  );
};

export default RecipeDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Chart from "chart.js/auto";
// import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
// import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
// import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
// import { Link } from "react-router-dom";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// // import { Button, CardActionArea, CardActions } from "@mui/material";
// // import CardMedia from "@mui/material/CardMedia";
// import Grid from "@mui/material/Grid";
// // import Container from "@mui/material/Container";
// // import RecipeCard from "../components/RecipeCard";
// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// import Box from "@mui/material/Box";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <CustomTabPanel value={value} index={0}>
//         Item One
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="Ingredients" {...a11yProps(0)} />
//           <Tab label="Nutrition Facts" {...a11yProps(1)} />
//           <Tab label="Price" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//     </Box>
//   );
// }

// const RecipeDetails = () => {
//   const { recipeId } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const API_KEY = "88345194a6e34c5e83770bdfa6af399c"; // Replace with your actual API key
//   const API_URL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`;
//   const [chartData, setChartData] = useState(null);
//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setRecipe(data); // Assuming API returns details of a single recipe
//         } else {
//           throw new Error("Failed to fetch recipe details");
//         }
//       } catch (error) {
//         console.error("Error fetching recipe details:", error);
//       }
//     };

//     fetchRecipeDetails();
//   }, [recipeId]);

//   const createMarkup = (htmlString) => {
//     return { __html: htmlString };
//   };

//   useEffect(() => {
//     if (recipe) {
//       const nutrientsData = recipe.nutrition.nutrients.slice(0, 5);

//       const labels = nutrientsData.map((nutrient) => nutrient.name);
//       const values = nutrientsData.map((nutrient) => nutrient.amount);

//       const data = {
//         labels: labels,
//         datasets: [
//           {
//             label: "Nutritional Values",
//             data: values,
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.6)",
//               "rgba(54, 162, 235, 0.6)",
//               "rgba(255, 206, 86, 0.6)",
//               "rgba(75, 192, 192, 0.6)",
//               "rgba(153, 102, 255, 0.6)",
//             ],
//             borderColor: [
//               "rgba(255, 99, 132, 1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(153, 102, 255, 1)",
//             ],
//             borderWidth: 1,
//           },
//         ],
//       };

//       setChartData(data);
//     }
//   }, [recipe]);

//   useEffect(() => {
//     let chart = null;

//     const renderChart = () => {
//       const ctx = document.getElementById("nutrientsChart");

//       if (chart) {
//         chart.destroy();
//       }

//       chart = new Chart(ctx, {
//         type: "pie",
//         data: chartData,
//       });
//     };

//     if (chartData) {
//       renderChart();
//     }

//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, [chartData]);

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={8} md={8} lg={8}>
//           {recipe ? (
//             <Card>
//               <CardContent>
//                 <Typography
//                   style={{
//                     fontSize: "1.5rem",
//                     fontWeight: "700",
//                     textAlign: "center",
//                   }}
//                 >
//                   {recipe.title}
//                 </Typography>
//                 {/* <h2>{recipe.title}</h2> */}

//                 <img src={recipe.image} alt={recipe.title} />
//                 <div dangerouslySetInnerHTML={createMarkup(recipe.summary)} />

//                 <p>Servings: {recipe.servings}</p>
//                 <p>ReadyInMinutes: {recipe.readyInMinutes}</p>
//                 <p>Price Per Serving: ${recipe.pricePerServing}</p>
//                 <h3>Dish Types:</h3>
//                 <ul>
//                   {recipe.dishTypes.map((dishType) => (
//                     <li key={dishType}>{dishType}</li>
//                   ))}
//                 </ul>
//                 <h3>Ingredients:</h3>
//                 <ul>
//                   {recipe.extendedIngredients.map((ingredient) => (
//                     <li key={ingredient.id}>{ingredient.original}</li>
//                   ))}
//                 </ul>
//                 {/* Display other details of the recipe */}
//                 <h3>Ingredients:</h3>
//                 <ul>
//                   {recipe.nutrition.nutrients.map((item) => (
//                     <li key={item.id}>
//                       Name: {item.name} Amount: {item.amount} Percent Of Daily
//                       Needs: {item.percentOfDailyNeeds} Unit: {item.unit}
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card>
//               <CardContent>
//                 <p>Loading...</p>
//               </CardContent>
//             </Card>
//           )}
//         </Grid>
//         <Grid item xs={12} md={4}>
//           {/* 2nd card */}
//           {/* Your second card content */}
//           {recipe ? (
//             <Card>
//               <CardContent>
//                 <Typography>
//                   <AlarmOutlinedIcon />
//                   Ready In Minutes: {recipe.readyInMinutes}
//                 </Typography>
//                 <Typography>
//                   <RestaurantOutlinedIcon />
//                   Servings: {recipe.servings}
//                 </Typography>
//                 <Typography>
//                   <EuroOutlinedIcon />
//                   Price: {recipe.pricePerServing}
//                 </Typography>

//                 <h3>Dish Types:</h3>
//                 <ul>
//                   {recipe.dishTypes.map((dishType) => (
//                     <li key={dishType}>{dishType}</li>
//                   ))}
//                 </ul>
//                 <h3>Ingredients:</h3>
//                 <ul>
//                   {recipe.extendedIngredients.map((ingredient) => (
//                     <li key={ingredient.id}>{ingredient.original}</li>
//                   ))}
//                 </ul>
//                 {/* Display other details of the recipe */}
//                 {/* <h3>Nutritional Data:</h3>
//                 <ul>
//                   {recipe.nutrition.nutrients.map((item) => (
//                     <li key={item.id}>
//                       Name: {item.name} Amount: {item.amount} Percent Of Daily
//                       Needs: {item.percentOfDailyNeeds} Unit: {item.unit}
//                     </li>
//                   ))}
//                 </ul> */}
//               </CardContent>

//               <BasicTabs />
//             </Card>
//           ) : (
//             <Card>
//               <CardContent>
//                 <p>Loading...</p>
//               </CardContent>
//             </Card>
//           )}
//         </Grid>
//       </Grid>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={8} md={8} lg={8}>
//           {recipe ? (
//             <Card>
//               <CardContent>
//                 {/* ... (Other recipe details) */}
//                 {chartData && (
//                   <div>
//                     <h3>Nutritional Values Chart:</h3>
//                     <canvas
//                       id="nutrientsChart"
//                       width="400"
//                       height="400"
//                     ></canvas>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default RecipeDetails;
