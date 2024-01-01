import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";
// icons
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from "@mui/icons-material/Euro";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import BlenderIcon from "@mui/icons-material/Blender";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventIcon from "@mui/icons-material/Event";
import SpaIcon from "@mui/icons-material/Spa";
// components
import HalfRating from "../components/HalfRating";
import NutritionChart from "../components/NutritionChart";
import BasicAccordion from "../components/BasicAccordion";
import BasicTabs from "../components/BasicTabs";
import NutritionDonutChart from "../components/NutritionDonutChart";

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ReviewComponent from "../components/ReviewComponent";

const RecipeSummary = ({ summary }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: summary }}
      style={{ margin: "20px 0", textAlign: "justify" }}
    />
  );
};

const tips = [
  {
    tip: "Preparation is Key",
    description:
      "Before you start cooking, ensure you have all the ingredients prepped, chopped, and ready to use. This helps streamline the cooking process.",
  },
  {
    tip: "Taste as You Go",
    description:
      "Continuously taste your dish while cooking. This allows you to adjust flavors as needed and ensures a well-balanced final product.",
  },
  {
    tip: "Sharp Knives",
    description:
      "A sharp knife is your best friend in the kitchen. Keep your knives sharp; they're safer and make cutting and chopping much easier.",
  },
  {
    tip: "Controlled Heat",
    description:
      "Learn to control heat levels. Different dishes require different heat levels. Sometimes, lower heat for a longer time is better than high heat.",
  },
  {
    tip: "Rest Your Meat",
    description:
      "After cooking meat, let it rest before cutting. This allows the juices to redistribute, resulting in a juicier and more flavorful meal.",
  },
  {
    tip: "Experiment and Have Fun",
    description:
      "Don't be afraid to experiment with flavors and ingredients. Cooking is an art, and creativity often leads to fantastic dishes.",
  },
  {
    tip: "Read Recipes Thoroughly",
    description:
      "Before starting a new recipe, read it through entirely. It helps avoid surprises and ensures you have everything you need.",
  },
  {
    tip: "Clean as You Go",
    description:
      "Cleaning as you cook keeps your workspace organized and makes the post-cooking cleanup much more manageable.",
  },
  {
    tip: "Learn Basic Techniques",
    description:
      "Master basic techniques like sautéing, braising, roasting, and blanching. They form the foundation of many dishes.",
  },
  {
    tip: "Don't Be Discouraged by Mistakes",
    description:
      "Mistakes happen. Learn from them and keep experimenting. That's how you grow as a cook!",
  },
];

const CookingTips = ({ tips }) => {
  return (
    <div>
      {tips.map((tip, index) => (
        <div key={index}>
          <h3>{tip.tip}</h3>
          <p>{tip.description}</p>
        </div>
      ))}
    </div>
  );
};
function OccasionButtons({ occasions }) {
  // Check if occasions is defined before mapping through it
  if (!occasions || !Array.isArray(occasions)) {
    return null; // Return null or handle the case where occasions is undefined or not an array
  }

  return (
    <Stack direction="row" spacing={1} sx={{ margin: "20px 0" }}>
      {occasions.map((occasion) => (
        <Button
          key={occasion}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            background: "#1D1D1D !important",
          }}
        >
          {occasion}
        </Button>
      ))}
    </Stack>
  );
}
// Render dish type buttons
function DishTypeButtons({ dishTypes }) {
  return (
    <Stack direction="row" spacing={1} sx={{ margin: "20px 0" }}>
      {dishTypes.map((dishType) => (
        <Button
          key={dishType}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            background: "#1D1D1D !important",
          }}
        >
          {dishType}
        </Button>
      ))}
    </Stack>
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
    <Box sx={{ maxWidth: "100%" }}>
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
// function VerticalLinearStepper({ analyzedInstructions }) {
//   const [activeInstruction, setActiveInstruction] = React.useState(0);
//   const [activeStep, setActiveStep] = React.useState(0);

//   const instructions = analyzedInstructions.map((instruction) => ({
//     name: instruction.name,
//     steps: instruction.steps.map((step) => step.step),
//   }));

//   const handleNext = () => {
//     if (activeStep === instructions[activeInstruction].steps.length - 1) {
//       if (activeInstruction < instructions.length - 1) {
//         setActiveInstruction((prevActiveInstruction) => prevActiveInstruction + 1);
//         setActiveStep(0);
//       }
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep === 0) {
//       if (activeInstruction > 0) {
//         setActiveInstruction((prevActiveInstruction) => prevActiveInstruction - 1);
//         setActiveStep(instructions[activeInstruction - 1].steps.length - 1);
//       }
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     }
//   };

//   const handleReset = () => {
//     setActiveInstruction(0);
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ maxWidth: "100%" }}>
//       <Stepper activeStep={activeInstruction} orientation="vertical">
//         {instructions.map((instruction, index) => (
//           <Step key={index}>
//             <StepLabel>{instruction.name}</StepLabel>
//             <StepContent>
//               <Stepper activeStep={activeStep} orientation="vertical">
//                 {instruction.steps.map((step, stepIndex) => (
//                   <Step key={stepIndex}>
//                     <StepLabel>{step}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//               <Box sx={{ mb: 2 }}>
//                 <div>
//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     {index === instructions.length - 1 ? "Finish" : "Next"}
//                   </Button>
//                   <Button
//                     disabled={index === 0}
//                     onClick={handleBack}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     Back
//                   </Button>
//                 </div>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeInstruction === instructions.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you're finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )}
//     </Box>
//   );
// }

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [extendedNutritionData, setExtendedNutritionData] = useState(null);
  const [caloriesData, setCaloriesData] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [analyzedInstructions, setAnalyzedInstructions] = useState([]); // New state

  // const [instructions, setInstructions] = useState([]);

  const API_KEY = "88345194a6e34c5e83770bdfa6af399c";
  const API_URL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`;
  // const isSmallScreen = useMediaQuery("(max-width:600px)"); // Example breakpoint for small screens
  const isXsOrSmScreen = useMediaQuery("(max-width:960px)"); // Example breakpoint for xs and sm screens
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

  // useEffect(() => {
  //   if (recipe) {
  //     setIngredients(recipe.extendedIngredients);
  //     const nutrientsData = recipe.nutrition.nutrients.slice(0, 5);
  //     setNutritionData(nutrientsData);
  //   }
  // }, [recipe]);

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe.extendedIngredients);
      const nutrientsArray = recipe.nutrition.nutrients;
      let caloriesToExtract = ["Calories"];
      let nutrientsToExtract = [
        // "Calories",
        "Fat",
        "Saturated Fat",
        "Carbohydrates",
        "Net Carbohydrates",
        "Sugar",
        "Protein",
        "Fiber",
      ];
      const nutrientsData = nutrientsArray.filter((nutrient) =>
        nutrientsToExtract.includes(nutrient.name)
      );
      const caloriesData = nutrientsArray.filter((cal) =>
        caloriesToExtract.includes(cal.name)
      );
      setCaloriesData(caloriesData);
      setNutritionData(nutrientsData);
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe) {
      const extendedNutrientsArray = recipe.nutrition.nutrients;
      let nutrientsToExtract = [
        "Calories",
        "Fat",
        "Saturated Fat",
        "Carbohydrates",
        "Net Carbohydrates",
        "Sugar",
        "Protein",
        "Fiber",
      ];

      const extendedNutrientsData = extendedNutrientsArray.filter(
        (nutrient) => !nutrientsToExtract.includes(nutrient.name)
      );

      setExtendedNutritionData(extendedNutrientsData);
    }
  }, [recipe]);

  // useEffect(() => {
  //   if (recipe) {
  //     // setIngredients(recipe.extendedIngredients);
  //     const extendedNutrientsData = recipe.nutrition.nutrients;
  //     setExtendedNutritionData(extendedNutrientsData);
  //   }
  // }, [recipe]);

  // useEffect(() => {
  //   const fetchAnalyzedInstructions = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${API_KEY}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAnalyzedInstructions(data);
  //         console.log("setAnalyzedInstructions", data); // Log the fetched data
  //       } else {
  //         throw new Error("Failed to fetch analyzed instructions");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching analyzed instructions:", error);
  //     }
  //   };

  //   fetchAnalyzedInstructions();
  // }, [recipeId]);

  // Extract unique equipment from all steps
  // const allEquipment = analyzedInstructions.flatMap((instruction) =>
  //   instruction.steps.flatMap((step) => step.equipment)
  // );

  // // Create a Set to remove duplicates
  // const uniqueEquipmentSet = new Set(allEquipment.map((equip) => equip.name));

  // // Convert the Set back to an array
  // const uniqueEquipment = Array.from(uniqueEquipmentSet);

  return (
    <>
      {/* img & side panel */}

      {/* new down */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {recipe ? (
            <Card
              sx={{
                background: "none",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  fontWeight: "bold",
                }}
              >
                {recipe.title}
              </Typography>
              <HalfRating
                score={recipe.spoonacularScore}
                count={recipe.aggregateLikes}
              />
              <Stack direction="row" spacing={1} sx={{ marginBottom: "1rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    background: "#1D1D1D !important",
                  }}
                >
                  Save <BookmarkIcon />
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    background: "#1D1D1D !important",
                  }}
                >
                  Download <DownloadIcon />
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    background: "#1D1D1D !important",
                  }}
                >
                  Share <ShareIcon />
                </Button>
              </Stack>
              <div>
                <p>
                  Recipe by{" "}
                  <a href={recipe.sourceUrl} rel="noreferrer" target="_blank">
                    <b>{recipe.sourceName}</b>
                  </a>{" "}
                  | Updated on December 12, 2023
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <p>Loading...</p>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          {recipe ? (
            <Card
              sx={{
                background: "none",
                boxShadow: "none",
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: "100%", // Expand to fill the container
                  objectFit: "cover", // Fill the container while maintaining aspect ratio
                  height: "400px", // Set the desired height to make the image larger
                }}
              />
              {/* <img src={recipe.image} alt={recipe.title} /> */}
              <DishTypeButtons dishTypes={recipe.dishTypes} />
              {/* <DishTypeButtons dishTypes={recipe.occasions} /> */}

              {/* <RecipeSummary summary={recipe.summary} /> */}
            </Card>
          ) : (
            <Card>
              <CardContent>
                <p>Loading...</p>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Card
            sx={{
              background: "none",
              boxShadow: "none",
            }}
          >
            {recipe ? (
              <Card
                sx={
                  {
                    // background: "#F3F1EF",
                    // borderRadius: "2rem",
                  }
                }
              >
                <CardContent>
                  {/* <Box sx={{ p: 0, marginBottom: "2rem" }}> */}
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    style={{ marginBottom: "5px" }}
                  >
                    <Grid item>
                      <LocalFireDepartmentIcon />
                    </Grid>
                    <Grid item>
                      <Typography>
                        {caloriesData &&
                          caloriesData.map((item) => (
                            <div key={item.id}>
                              {item.amount} {item.unit}
                            </div>
                          ))}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                  {/* Basic recipe details */}
                  <Box sx={{ p: 0 }} recipe={recipe}>
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
                        <BlenderIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.preparationMinutes === -1
                            ? 0
                            : recipe.preparationMinutes}{" "}
                          Preparation minutes
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
                        <OutdoorGrillIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.cookingMinutes === -1
                            ? 0
                            : recipe.cookingMinutes}{" "}
                          Cooking minutes
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
                        <AccessTimeIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.readyInMinutes} Ready in minutes
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
                        <MonetizationOnIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.pricePerServing}$ per serving
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
                        <SpaIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.vegetarian ? "Vegetarian" : "Non Vegetarian"}
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
                        <SpaIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.vegan ? "Vegan" : "Non Vegan"}
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
                        <SpaIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.glutenFree
                            ? "Gluten Free"
                            : "Non Gluten Free"}
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
                        <SpaIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {recipe.dairyFree ? "Dairy Free" : "Non Dairy Free"}
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
                            {recipe.servings}
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
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <p>Loading...</p>
                </CardContent>
              </Card>
            )}
          </Card>
        </Grid>
      </Grid>
      {/* new up */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <BasicTabs
            nutritionData={nutritionData}
            caloriesData={caloriesData}
            ingredients={ingredients}
            recipeDetails={recipe}
            analyzedInstructions={analyzedInstructions}
            // Pass the recipe details here
          />
        </Grid>
      </Grid>
      {/* instructions & tips */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "400",
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              Instructions{" "}
              <VolumeUpIcon
                sx={{
                  marginLeft: "4px",
                }}
              />
            </Typography>

            {analyzedInstructions.length > 0 ? (
              <VerticalLinearStepper
                analyzedInstructions={analyzedInstructions}
              />
            ) : (
              <p>No instructions available</p>
            )}
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={5} lg={5} sx={{ margin: "20px 0" }}>
          <Card
            sx={
              {
                // borderRadius: "2rem",
                // background: "#F3F1EF",
                // background: "none",
                // boxShadow: "none",
              }
            }
          >
            <CardContent>
              <Typography
                variant="h5"
                // align="center"
                sx={{ marginBottom: "20px" }}
              >
                Kitchen Tips & TrickS
              </Typography>

              <CookingTips tips={tips} />
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={12} sx={{ margin: "20px 0" }}>
          <Card>
            <CardContent>
              <h5>You may also like</h5>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ margin: "20px 0" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", paddingBottom: "0", marginBottom: "0" }}
          >
            Nutrition Facts{" "}
            <span style={{ fontSize: "0.8rem", fontWeight: "400" }}>
              {" "}
              (per serving)
            </span>
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="nutrition data table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Percent of Daily Needs</TableCell>
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{ margin: "20px 0", padding: "0 0 0 5 !important" }}
        >
          <NutritionDonutChart nutritionData={nutritionData} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={8} sx={{ margin: "20px 0" }}>
          <Card
            sx={
              {
                // borderRadius: "2rem",
                // background: "#F3F1EF",
              }
            }
            // sx={{
            //   background: "none",
            //   boxShadow: "none",
            // }}
          >
            <BasicAccordion nutritionData={extendedNutritionData} />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={7} lg={8} sx={{ margin: "20px 0" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", paddingBottom: "0", marginBottom: "0" }}
          >
            Reviews{" "}
            <span style={{ fontSize: "0.8rem", fontWeight: "400" }}> (0)</span>
          </Typography>
          <ReviewComponent />
          {/* {analyzedInstructions.length > 0 ? (
            <div>
              {analyzedInstructions.map((instruction, index) => (
                <div key={index}>
                  <h3>{instruction.name}</h3>
                  <ol>
                    {instruction.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>
                        <p>{step.step}</p>
                        {step.equipment && step.equipment.length > 0 && (
                          <ul>
                            {step.equipment.map((equip, equipIndex) => (
                              <li key={equipIndex}>{equip.name}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          ) : (
            <p>No instructions available</p>
          )} */}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={7} lg={8} sx={{ margin: "20px 0" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", paddingBottom: "0", marginBottom: "0" }}
          >
            You may also like
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default RecipeDetails;
