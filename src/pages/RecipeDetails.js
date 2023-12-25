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

// icons

// components
import HalfRating from "../components/HalfRating";
import NutritionChart from "../components/NutritionChart";
import BasicAccordion from "../components/BasicAccordion";
import BasicTabs from "../components/BasicTabs";

// Render dish type buttons
function DishTypeButtons({ dishTypes }) {
  return (
    <Stack direction="row" spacing={1}>
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
        <Grid item xs={12} sm={12} md={7} lg={8}>
          {recipe ? (
            <Card
            // sx={{
            //   borderRadius: "2rem",
            //   background: "#F3F1EF",
            // }}
            >
              <CardContent
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4" // Choose appropriate variant for desired size
                  style={{
                    fontWeight: "bold",
                    paddingBottom: "1rem", // Add padding at the bottom for spacing
                  }}
                >
                  {recipe.title}
                </Typography>
                {/* <h2>{recipe.title}</h2> */}

                <img src={recipe.image} alt={recipe.title} />
                <HalfRating score={recipe.spoonacularScore} />
              </CardContent>
              <CardContent>
                {/* <p>Servings: {recipe.servings}</p>
                <p>ReadyInMinutes: {recipe.readyInMinutes}</p>
                <p>Price Per Serving: ${recipe.pricePerServing}</p> */}

                {/* <Typography>Dish Types</Typography> */}
                <DishTypeButtons dishTypes={recipe.dishTypes} />

                {/* <Typography>Cuisines</Typography>
                <DishTypeButtons dishTypes={recipe.cuisines} /> */}
                {/* <Typography>Diets</Typography>
                <DishTypeButtons dishTypes={recipe.diets} /> */}
                {/* <Typography>Occasions</Typography>
                <DishTypeButtons dishTypes={recipe.occasions} /> */}

                {/* <h3>Instructions</h3> */}
                {/* <Typography variant="h6" sx={{ fontWeight: "400" }}>
                  Instruments
                </Typography> */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "400", marginTop: "20px" }}
                >
                  Instructions
                </Typography>

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
        <Grid item xs={12} sm={12} md={5} lg={4}>
          {/* Card with basic recipe details and tabs */}
          {recipe ? (
            <Card
            // sx={{
            //   background: "#F3F1EF",
            //   borderRadius: "2rem",
            // }}
            >
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
          <Grid item xs={12} sx={{ margin: "20px 0" }}>
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
                <p>User`s Tips and Tricks</p>
                <p>Vote Up</p>
                <p>Vote Down</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sx={{ margin: "20px 0" }}>
            <Card
            // sx={{
            //   borderRadius: "2rem",
            //   background: "#F3F1EF",
            //   // background: "none",
            //   // boxShadow: "none",
            // }}
            >
              <CardContent>
                <h5>You may also like</h5>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
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
            <BasicAccordion nutritionData={nutritionData} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RecipeDetails;
