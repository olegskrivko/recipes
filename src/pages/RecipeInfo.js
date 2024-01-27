import React from "react";
import { useEffect, useState } from "react";
import { fetchRecipe } from "../middleware/Api"; // Import the function to fetch recipe data
// import { useParams } from "react-router-dom";

// React MUI components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import Paper from "@mui/material/Paper";

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

// import NutritionDonutChart from "./NutritionDonutChart";

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
import StepIcon from "@mui/material/StepIcon";

// components
import HalfRating from "../components/HalfRating";
import IconLabelTabs from "../components/IconLabelTabs";
import ReviewComponent from "../components/ReviewComponent";

// import NutritionDonutChart from "../../src/components/NutritionDonutChart";

// import Congratulations from "../components/Congratulations";

import Confetti from "react-confetti";

const RecipePreparationButton = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    setShowConfetti(true);
    setButtonDisabled(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
        Have you successfully prepared this delicious recipe?
      </Typography>

      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={buttonDisabled}>
          Yes
        </Button>
      </div>

      <div style={{ position: "relative" }}>{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} style={{ position: "fixed", top: 0, left: 0 }} />}</div>
    </div>
  );
};

// const Congratulations = () => {
//   const [showMessage, setShowMessage] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   const handleFinish = () => {
//     setShowMessage(true);
//     setShowConfetti(true);
//     setTimeout(() => {
//       setShowConfetti(false);
//     }, 5000); // Adjust the duration for confetti as needed
//   };

//   return (
//     <div>
//       <button onClick={handleFinish}>Finish</button>
//       {showMessage && <h1>Congratulations! You've Finished!</h1>}
//       {showConfetti && <Confetti />}
//     </div>
//   );
// };

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

const RecipeInfo = () => {
  const [recipe, setRecipe] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRecipePrepared = () => {
    // You can perform any other actions here, e.g., send analytics data, etc.
    setShowConfetti(true);
  };

  useEffect(() => {
    // Simulate fetching data from API
    fetchRecipe().then((data) => {
      setRecipe(data.recipe); // Set the fetched recipe data
      console.log(data.recipe); // Log the fetched recipe data
    });
  }, []);

  const formatUpdatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  function ParentComponent({ recipeInstructions }) {
    return (
      <div>
        {recipeInstructions.map((section, index) => (
          <MultipleSteppers key={index} section={section} />
        ))}
      </div>
    );
  }
  function MultipleSteppers({ section }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showReset, setShowReset] = React.useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    console.log(activeStep);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log(section.steps.length);
      if (activeStep + 1 === section.steps.length) {
        console.log("its max");
        setShowReset(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000); // Adjust the duration for confetti as needed
      }
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
      setActiveStep(0);
      setShowReset(false);
    };

    const handleFinish = () => {
      setShowReset(true);
      console.log("finished");
    };

    const CustomStepIcon = (props) => {
      const { active, completed } = props;

      // Define your custom styles for completed steps
      const completedStyles = {
        color: "green", // Change the color for completed steps
        zIndex: 1, // Adjust additional styles if needed
      };

      return <StepIcon {...props} style={completed ? completedStyles : {}} />;
    };

    return (
      <div>
        <div style={{ position: "relative" }}>{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} style={{ position: "fixed", top: 0, left: 0 }} />}</div>

        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            {section.name}
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {section.steps.map((step, stepIndex) => (
              <Step key={stepIndex}>
                <StepLabel StepIconComponent={CustomStepIcon}>{`${step.description}`}</StepLabel>
                <StepContent>
                  <img src={step.image} alt="" style={{ maxWidth: "100%", height: "auto" }} />

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {activeStep !== section.steps.length && (
                        <Button variant="contained" size="small" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                          {activeStep === section.steps.length - 1 ? "Finish" : "Next Step"}
                        </Button>
                      )}
                      <Button disabled={activeStep === 0} size="small" onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
        {showReset && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="contained" size="small" onClick={handleReset}>
              Reset
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* General Info */}
      <Grid container spacing={3}>
        {/* Title | Rating | Action Buttons | Author | Description */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <>
            {recipe && recipe.title && (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {recipe.title}
              </Typography>
            )}
            {recipe && recipe.likes && recipe.score && <HalfRating score={recipe.score} count={recipe.likes} />}
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  background: "#1D1D1D",
                }}
              >
                Save <BookmarkIcon />
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  background: "#1D1D1D",
                }}
              >
                Download <DownloadIcon />
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  background: "#1D1D1D",
                }}
              >
                Share <ShareIcon />
              </Button>
            </Stack>
            {recipe && recipe.source && recipe.source.url && recipe.source.name && recipe.updatedAt && (
              <Typography
                variant="subtitle2"
                sx={{
                  margin: "1rem 0",
                }}
              >
                Recipe by{" "}
                <Link href={recipe.source.url} rel="noreferrer" target="_blank" underline="always">
                  {recipe.source.name}
                </Link>{" "}
                | Updated on {formatUpdatedAt(recipe.updatedAt)}
              </Typography>
            )}
            {recipe && recipe.description && (
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify",
                }}
              >
                {recipe.description}
              </Typography>
            )}
          </>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} sm={12} md={7} lg={7}>
          {recipe && recipe.mainImage && (
            <CardMedia
              component="img"
              image={recipe.mainImage}
              alt={recipe.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          )}
        </Grid>
        {/* Icons Sections */}
        <Grid item xs={12} sm={12} md={5} lg={5}>
          {recipe ? (
            <>
              {/* Calories */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <LocalFireDepartmentIcon />
                </Grid>
                <Grid item>
                  <Typography>
                    {recipe && recipe.nutritionFacts && recipe.nutritionFacts.calories && (
                      <>
                        {recipe.nutritionFacts.calories.amount} {recipe.nutritionFacts.calories.unit}
                      </>
                    )}
                  </Typography>
                </Grid>
              </Grid>
              {/* Difficulty */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <SignalCellularAltIcon />
                </Grid>
                <Grid item>{recipe && recipe.difficulty && <Typography>{recipe.difficulty}</Typography>}</Grid>
              </Grid>
              {/* Preparation */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <BlenderIcon />
                </Grid>
                <Grid item>
                  {recipe && recipe.cookingTime && recipe.cookingTime.preparation && (
                    <Typography>
                      Preparation {recipe.cookingTime.preparation.time} {recipe.cookingTime.preparation.unit}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Cooking */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <OutdoorGrillIcon />
                </Grid>
                <Grid item>
                  {recipe && recipe.cookingTime && recipe.cookingTime.cooking && (
                    <Typography>
                      Cooking {recipe.cookingTime.cooking.time} {recipe.cookingTime.cooking.unit}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Total Time */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <AccessTimeIcon />
                </Grid>
                <Grid item>
                  {recipe && recipe.cookingTime && recipe.cookingTime.total && (
                    <Typography>
                      Ready in {recipe.cookingTime.total.time} {recipe.cookingTime.total.unit}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Price Per Serving */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <MonetizationOnIcon />
                </Grid>
                <Grid item>
                  {recipe && recipe.pricePerServing && (
                    <Typography>
                      {recipe.pricePerServing.amount}
                      {recipe.pricePerServing.currency} per serving
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Vegetarian */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <SpaIcon />
                </Grid>
                <Grid item>
                  <Typography>{recipe.isVegetarian ? "Vegetarian" : "Non Vegetarian"}</Typography>
                </Grid>
              </Grid>
              {/* Vegan */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <SpaIcon />
                </Grid>
                <Grid item>
                  <Typography>{recipe.isVegan ? "Vegan" : "Non Vegan"}</Typography>
                </Grid>
              </Grid>
              {/* Gluten Free */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <SpaIcon />
                </Grid>
                <Grid item>
                  <Typography>{recipe.isGlutenFree ? "Gluten Free" : "Non Gluten Free"}</Typography>
                </Grid>
              </Grid>
              {/* Dairy Free */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <SpaIcon />
                </Grid>
                <Grid item>
                  <Typography>{recipe.isDairyFree ? "Dairy Free" : "Non Dairy Free"}</Typography>
                </Grid>
              </Grid>
              {/* Servings */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "5px",
                }}
              >
                <Grid item>
                  <RamenDiningIcon />
                </Grid>
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        marginRight: "1rem",
                      }}
                    >
                      Servings
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        background: "#1D1D1D !important",
                        minWidth: "2rem",
                      }}
                    >
                      -
                    </Button>
                    <Typography
                      style={{
                        margin: "0 12px",
                      }}
                    >
                      3
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        background: "#1D1D1D !important",
                        minWidth: "2rem",
                      }}
                    >
                      +
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </>
          ) : (
            <CircularIndeterminate />
            // <Typography variant="body1">Loading...</Typography>
          )}
        </Grid>
      </Grid>
      {/* Horizontal Tabs - Ingredients | Equipment | Price | Notes */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <IconLabelTabs recipe={recipe} />
        </Grid>
      </Grid>
      {/* Instructions */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* {recipe && recipe.instructions && <VerticalLinearStepper recipe={recipe} />} */}
          {/* <VerticalLinearStepper /> */}
          {recipe && recipe.instructions && <ParentComponent recipeInstructions={recipe.instructions} />}
          {/* <MultipleSteppers /> */}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            margin: "20px 0",
          }}
        >
          <RecipePreparationButton />
        </Grid>
      </Grid>

      {/* Similar Recipes */}
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            margin: "20px 0",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            margin: "20px 0",
          }}
        ></Grid>
      </Grid>
      {/* Reviews */}
      <Grid container spacing={3}>
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
          Reviews
          <ReviewComponent />
        </Grid>
      </Grid>
      {/* You May Also Like */}
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={8}
          sx={{
            margin: "20px 0",
          }}
        >
          You may also like
        </Grid>
      </Grid>
      <Grid>{/* <RecipePreparationButton /> */}</Grid>
    </React.Fragment>
  );
};

export default RecipeInfo;
