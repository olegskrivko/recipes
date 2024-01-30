// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const RecipeForm = () => {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [titleError, setTitleError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//     setTitleError(null);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/recipes", { title });

//       console.log("Recipe created:", response.data);

//       setSuccessMessage("Recipe created successfully!");
//       setTitle("");
//       setTitleError(null);
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path === "title") {
//             setTitleError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error creating recipe:", error.message);
//         setTitleError("An error occurred while creating the recipe. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSuccessMessage = () => {
//     setSuccessMessage(null);
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit}>
//         <TextField label="Recipe Title" variant="outlined" fullWidth value={title} onChange={handleTitleChange} margin="normal" error={titleError !== null} helperText={titleError} />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Recipe"}
//         </Button>
//       </form>
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default RecipeForm;

/////////////////////

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, CircularProgress, MenuItem, Snackbar, IconButton, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(""); // Add state for difficulty
  const [meals, setMeals] = useState([]); // Add state for meals
  const [selectedMeals, setSelectedMeals] = useState([]); // Updated state for multiple selections
  const [occasions, setOccasions] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [tools, setTools] = useState([]);
  const [cookingMethods, setCookingMethods] = useState([]);
  const [servings, setServings] = useState(1);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedCookingMethods, setSelectedCookingMethods] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([{ label: "", hours: 0, minutes: 0 }]);

  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);

  // const [availableCategories, setAvailableCategories] = useState([]);
  // const [category, setCategory] = useState("");
  // const [subcategories, setSubcategories] = useState([]);
  // const [subcategory, setSubcategory] = useState("");

  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [difficultyError, setDifficultyError] = useState(null); // Add state for difficulty error
  const [mealError, setMealError] = useState(""); // Add state for meal error
  const [occasionError, setOccasionError] = useState("");
  const [cuisineError, setCuisineError] = useState("");
  const [toolError, setToolError] = useState("");
  const [cookingMethodError, setCookingMethodError] = useState("");
  const [servingsError, setServingsError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [instructions, setInstructions] = useState([{ name: "", steps: [{ step: 1, description: "", image: "" }] }]);
  const [ingredientCategories, setIngredientCategories] = useState([{ name: "", items: [{ ingredient: "", quantity: 0, unit: "", ingredientPrice: "" }] }]);
  // check how long user is on page and if he clicks after preparation time than it means he did it
  // Fetch times from the backend on component mount

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/times");
        setTimes(response.data);
      } catch (error) {
        console.error("Error fetching times:", error.message);
      }
    };

    fetchTimes();
  }, []);

  // new down
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/ingredient-categories");

  //       const topLevelCategories = response.data.filter((category) => category.parentCategory === null);
  //       setAvailableCategories(topLevelCategories);
  //       // setAvailableCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error.message);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  // new up
  const handleTimeChange = (event, index) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[index].label = event.target.value;
    setSelectedTimes(updatedTimes);
  };

  const handleHoursChange = (event, index) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[index].hours = event.target.value;
    setSelectedTimes(updatedTimes);
  };

  const handleMinutesChange = (event, index) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[index].minutes = event.target.value;
    setSelectedTimes(updatedTimes);
  };

  const handleAddTime = () => {
    setSelectedTimes([...selectedTimes, { label: "", hours: 0, minutes: 0 }]);
  };

  const handleRemoveTime = (index) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes.splice(index, 1);
    setSelectedTimes(updatedTimes);
  };

  useEffect(() => {
    // Fetch meals from the backend when the component mounts
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/meals");
        setMeals(response.data);
        console.log(meals);
      } catch (error) {
        console.error("Error fetching meals:", error.message);
      }
    };

    fetchMeals();
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Fetch occasions from the backend when the component mounts
  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/occasions");
        setOccasions(response.data);
      } catch (error) {
        console.error("Error fetching occasions:", error.message);
      }
    };

    fetchOccasions();
  }, []);

  // Fetch cuisines from the backend when the component mounts
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cuisines");
        setCuisines(response.data);
      } catch (error) {
        console.error("Error fetching cuisines:", error.message);
      }
    };

    fetchCuisines();
  }, []);

  // Fetch tools from the backend when the component mounts
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tools");
        setTools(response.data);
      } catch (error) {
        console.error("Error fetching tools:", error.message);
      }
    };

    fetchTools();
  }, []);

  // Fetch cooking methods from the backend when the component mounts
  useEffect(() => {
    const fetchCookingMethods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cooking-methods");
        setCookingMethods(response.data);
      } catch (error) {
        console.error("Error fetching tools:", error.message);
      }
    };

    fetchCookingMethods();
  }, []);
  // Fetch ingredients from the backend when the component mounts
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredients");
        setAvailableIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error.message);
      }
    };

    fetchIngredients();
  }, []);

  // Fetch ingredients from the backend when the component mounts
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredients");
        setAvailableIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error.message);
      }
    };

    fetchIngredients();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError(null);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(null);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setDifficultyError(null);
  };

  // Meal
  const handleMealChange = (event) => {
    // If event.target.value is not an array, wrap it in an array
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];

    setSelectedMeals(selectedValues);
    setMealError(null);
  };
  // Occasion
  const handleOccasionChange = (event) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedOccasions(selectedValues);
    setOccasionError(null);
  };
  // Cuisine
  const handleCuisineChange = (event) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedCuisines(selectedValues);
    setCuisineError(null);
  };
  // Tool
  const handleToolChange = (event) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedTools(selectedValues);
    setToolError(null);
  };

  // Cooking Method
  const handleCookingMethodChange = (event) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedCookingMethods(selectedValues);
    setCookingMethodError(null);
  };

  // Servings
  const handleServingsChange = (event) => {
    setServings(event.target.value);
    setServingsError(null);
  };
  // Utility function to map selected times

  const mapSelectedTimes = (selectedTimes, times, selectedHours, selectedMinutes) => {
    return selectedTimes.map((time) => ({
      name: times.find((t) => t._id === time).name,
      hours: selectedHours[time],
      minutes: selectedMinutes[time],
    }));
  };

  // Instruction Name
  const handleInstructionNameChange = (index, event) => {
    const newInstructions = [...instructions];
    newInstructions[index].name = event.target.value;
    setInstructions(newInstructions);
  };

  const handleStepChange = (index, stepIndex, field, event) => {
    const newInstructions = [...instructions];
    newInstructions[index].steps[stepIndex][field] = event.target.value;
    setInstructions(newInstructions);
  };

  const handleAddStep = (index) => {
    const newInstructions = [...instructions];
    newInstructions[index].steps.push({ step: newInstructions[index].steps.length + 1, description: "", image: "" });
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { name: "", steps: [{ step: 1, description: "", image: "" }] }]);
  };

  // Ingredient
  const handleIngredientCategoryChange = (index, event) => {
    const newIngredientCategories = [...ingredientCategories];
    newIngredientCategories[index].name = event.target.value;
    setIngredientCategories(newIngredientCategories);
  };

  // Ingredient Name
  const handleIngredientNameChange = (categoryIndex, itemIndex, event) => {
    const newIngredientCategories = [...ingredientCategories];
    const selectedIngredientId = event.target.value; // Capture the selected ingredient's ID
    newIngredientCategories[categoryIndex].items[itemIndex].ingredient = selectedIngredientId;
    setIngredientCategories(newIngredientCategories);
  };

  const handleIngredientQuantityChange = (categoryIndex, itemIndex, event) => {
    const newIngredientCategories = [...ingredientCategories];
    newIngredientCategories[categoryIndex].items[itemIndex].quantity = event.target.value;
    setIngredientCategories(newIngredientCategories);
  };

  const handleIngredientUnitChange = (categoryIndex, itemIndex, event) => {
    const newIngredientCategories = [...ingredientCategories];
    newIngredientCategories[categoryIndex].items[itemIndex].unit = event.target.value;
    setIngredientCategories(newIngredientCategories);
  };

  const handleAddIngredientItem = (categoryIndex) => {
    const newIngredientCategories = [...ingredientCategories];
    newIngredientCategories[categoryIndex].items.push({ ingredient: "", quantity: 0, unit: "", ingredientPrice: "" });
    setIngredientCategories(newIngredientCategories);
  };

  const handleAddIngredientCategory = () => {
    setIngredientCategories([...ingredientCategories, { name: "", items: [{ ingredient: "", quantity: 0, unit: "", ingredientPrice: "" }] }]);
  };

  // new down
  // const handleFieldChange = (field, value) => {
  //   // setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

  //   switch (field) {
  //     case "category":
  //       setCategory(value);
  //       fetchSubcategories(value);
  //       break;
  //     case "subcategory":
  //       setSubcategory(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const fetchSubcategories = async (categoryId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/ingredient-categories/${categoryId}/subcategories`);
  //     setSubcategories(response.data);
  //   } catch (error) {
  //     console.error("Error fetching subcategories:", error.message);
  //   }
  // };
  // new up

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Validate Servings
      // if (servings < 1 || servings > 10) {
      //   setServingsError("Servings must be between 1 and 10");
      //   setLoading(false);
      //   return;
      // }

      // const response = await axios.post("http://localhost:3000/api/recipes", { title, description, difficulty, meals });
      const response = await axios.post("http://localhost:3000/api/recipes", {
        title,
        description,
        difficulty,
        meals: selectedMeals, // Include the selected meal in the request payload
        occasions: selectedOccasions, // Include the selected occasions in the request payload
        cuisines: selectedCuisines,
        tools: selectedTools,
        cookingMethods: selectedCookingMethods,
        instructions,
        ingredients: ingredientCategories,
        servings,
        times: selectedTimes,
      });

      console.log("Recipe created:", response.data);

      setSuccessMessage("Recipe created successfully!");
      setTitle("");
      setDescription(""); // Clear description field after submission
      setDifficulty("");
      setSelectedMeals([]); // Clear selected meal
      setSelectedOccasions([]);
      setSelectedCuisines([]);
      setSelectedTools([]);
      setSelectedCookingMethods([]);
      setServings(1);

      setTitleError(null);
      setDescriptionError(null);
      setDifficultyError(null);
      setMealError(null);
      setOccasionError(null);
      setCuisineError(null);
      setToolError(null);
      setCookingMethodError(null);
      setServingsError(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "title") {
            setTitleError(err.msg);
          } else if (err.path === "description") {
            setDescriptionError(err.msg);
          } else if (err.path === "difficulty") {
            setDifficultyError(err.msg);
          } else if (err.path === "meals") {
            setMealError(err.msg);
          } else if (err.path === "occasions") {
            setOccasionError(err.msg);
          } else if (err.path === "cuisines") {
            setCuisineError(err.msg);
          } else if (err.path === "tools") {
            setToolError(err.msg);
          } else if (err.path === "cookingMethods") {
            setCookingMethodError(err.msg);
          } else if (err.path === "servings") {
            setServingsError(err.msg);
          }
        });
      } else {
        console.error("Error creating recipe:", error.message);
        setTitleError("An error occurred while creating the recipe. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };
  // Array of available times (0 to 24 hours)
  const hours = Array.from({ length: 25 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <TextField label="Recipe Title" variant="outlined" fullWidth value={title} onChange={handleTitleChange} margin="normal" error={titleError !== null} helperText={titleError} />
        <TextField label="Recipe Description" multiline rows={3} variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
        <FormControl fullWidth variant="outlined" margin="normal" error={difficultyError !== null}>
          <InputLabel htmlFor="difficulty-select">Difficulty Level</InputLabel>
          <Select
            native
            value={difficulty}
            onChange={handleDifficultyChange}
            label="Difficulty Level"
            inputProps={{
              id: "difficulty-select",
            }}
          >
            <option aria-label="None" value="" />
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Select>
          {difficultyError && <FormHelperText>{difficultyError}</FormHelperText>}
        </FormControl>
        <TextField label="Number of Servings" type="number" variant="outlined" fullWidth value={servings} onChange={handleServingsChange} margin="normal" error={Boolean(servingsError)} helperText={servingsError} />
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(mealError)}>
          <InputLabel htmlFor="meal-select">Meal</InputLabel>
          <Select
            multiple
            value={selectedMeals} // This should always be an array
            onChange={handleMealChange}
            label="Meals"
            inputProps={{
              id: "meal-select",
            }}
            MenuComponent="div"
          >
            {meals.map((type) => (
              <MenuItem key={type._id} value={type._id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          {mealError && <FormHelperText>{mealError}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(occasionError)}>
          <InputLabel htmlFor="occasion-select">Occasions</InputLabel>
          <Select
            multiple
            value={selectedOccasions}
            onChange={handleOccasionChange}
            label="Occasions"
            inputProps={{
              id: "occasion-select",
            }}
            MenuComponent="div"
          >
            {occasions.map((occasion) => (
              <MenuItem key={occasion._id} value={occasion._id}>
                {occasion.name}
              </MenuItem>
            ))}
          </Select>
          {occasionError && <FormHelperText>{occasionError}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(cuisineError)}>
          <InputLabel htmlFor="cuisine-select">Cuisines</InputLabel>
          <Select
            multiple
            value={selectedCuisines}
            onChange={handleCuisineChange}
            label="Cuisines"
            inputProps={{
              id: "cuisine-select",
            }}
            MenuComponent="div"
          >
            {cuisines.map((cuisine) => (
              <MenuItem key={cuisine._id} value={cuisine._id}>
                {cuisine.name}
              </MenuItem>
            ))}
          </Select>
          {cuisineError && <FormHelperText>{cuisineError}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(toolError)}>
          <InputLabel htmlFor="tool-select">Tools</InputLabel>
          <Select
            multiple
            value={selectedTools}
            onChange={handleToolChange}
            label="Tools"
            inputProps={{
              id: "tool-select",
            }}
            MenuComponent="div"
          >
            {tools.map((tool) => (
              <MenuItem key={tool._id} value={tool._id}>
                {tool.name}
              </MenuItem>
            ))}
          </Select>
          {toolError && <FormHelperText>{toolError}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(cookingMethodError)}>
          <InputLabel htmlFor="cookingMethod-select">Cooking Methods</InputLabel>
          <Select
            multiple
            value={selectedCookingMethods}
            onChange={handleCookingMethodChange}
            label="Cooking Methods"
            inputProps={{
              id: "cookingMethod-select",
            }}
            MenuComponent="div"
          >
            {cookingMethods.map((cookingMethod) => (
              <MenuItem key={cookingMethod._id} value={cookingMethod._id}>
                {cookingMethod.name}
              </MenuItem>
            ))}
          </Select>
          {cookingMethodError && <FormHelperText>{cookingMethodError}</FormHelperText>}
        </FormControl>
        {selectedTimes.map((time, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
              <IconButton color="secondary" onClick={() => handleRemoveTime(index)}>
                <DeleteIcon />
              </IconButton>
              <TextField label="Select Time" variant="outlined" fullWidth select value={time.name} onChange={(e) => handleTimeChange(e, index)} margin="normal">
                {times.map((availableTime) => (
                  <MenuItem key={availableTime._id} value={availableTime.name}>
                    {availableTime.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Hours" variant="outlined" fullWidth select value={time.hours} onChange={(e) => handleHoursChange(e, index)} margin="normal">
                {hours.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField label="Minutes" variant="outlined" fullWidth select value={time.minutes} onChange={(e) => handleMinutesChange(e, index)} margin="normal">
                {[0, 15, 30, 45].map((minute) => (
                  <MenuItem key={minute} value={minute}>
                    {minute}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        ))}

        <Button type="button" variant="outlined" color="primary" onClick={handleAddTime}>
          Add Time
        </Button>

        {/* new down */}
        {/* <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
            <MenuItem value="">Select Category</MenuItem>
            {availableCategories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* Display subcategories dropdown */}
        {/* {subcategories.length > 0 && (
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select value={subcategory} onChange={(e) => handleFieldChange("subcategory", e.target.value)} label="Subcategory">
              <MenuItem value="">Select Subcategory</MenuItem>
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )} */}

        {/* new up  */}
        <div>
          {ingredientCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <TextField label={`Ingredient Category ${categoryIndex + 1}`} variant="outlined" fullWidth value={category.name} onChange={(event) => handleIngredientCategoryChange(categoryIndex, event)} margin="normal" />
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <TextField
                    label={`Ingredient Name ${itemIndex + 1}`}
                    variant="outlined"
                    fullWidth
                    value={item.ingredient}
                    onChange={(event) => handleIngredientNameChange(categoryIndex, itemIndex, event)}
                    margin="normal"
                    select // Use select for dropdown
                  >
                    {availableIngredients.map((ingredient) => (
                      <MenuItem key={ingredient._id} value={ingredient._id}>
                        {ingredient.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField label={`Ingredient Quantity ${itemIndex + 1}`} variant="outlined" fullWidth type="number" value={item.quantity} onChange={(event) => handleIngredientQuantityChange(categoryIndex, itemIndex, event)} margin="normal" />

                  <TextField label={`Ingredient Unit ${itemIndex + 1}`} variant="outlined" fullWidth select value={item.unit} onChange={(event) => handleIngredientUnitChange(categoryIndex, itemIndex, event)} margin="normal">
                    {item.ingredient &&
                      availableIngredients
                        .find((ingredient) => ingredient._id === item.ingredient)
                        ?.allowedUnits?.map((allowedUnit) => (
                          <MenuItem key={allowedUnit.unit} value={allowedUnit.unit}>
                            {allowedUnit.unit} (Conversion Factor: {allowedUnit.conversionFactor})
                          </MenuItem>
                        ))}
                  </TextField>
                </div>
              ))}
              <Button onClick={() => handleAddIngredientItem(categoryIndex)}>Add Ingredient</Button>
            </div>
          ))}
          <Button onClick={handleAddIngredientCategory}>Add Ingredient Category</Button>
        </div>
        <div>
          {instructions.map((instruction, index) => (
            <div key={index}>
              <TextField label={`Instruction ${index + 1} Name`} variant="outlined" fullWidth value={instruction.name} onChange={(event) => handleInstructionNameChange(index, event)} margin="normal" />
              {instruction.steps.map((step, stepIndex) => (
                <div key={stepIndex}>
                  <TextField label={`Step ${stepIndex + 1} Description`} multiline rows={2} variant="outlined" fullWidth value={step.description} onChange={(event) => handleStepChange(index, stepIndex, "description", event)} margin="normal" />
                  <TextField label={`Step ${stepIndex + 1} Image`} variant="outlined" fullWidth value={step.image} onChange={(event) => handleStepChange(index, stepIndex, "image", event)} margin="normal" />
                </div>
              ))}
              <Button onClick={() => handleAddStep(index)}>Add Step</Button>
            </div>
          ))}
          <Button onClick={handleAddInstruction}>Add Instruction</Button>
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Recipe"}
        </Button>
      </form>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default RecipeForm;
