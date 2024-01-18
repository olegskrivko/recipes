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
import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress, MenuItem, Snackbar, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import axios from "axios";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(""); // Add state for difficulty
  const [meals, setMeals] = useState([]); // Add state for meals
  const [selectedMeals, setSelectedMeals] = useState([]); // Updated state for multiple selections
  const [occasions, setOccasions] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [difficultyError, setDifficultyError] = useState(null); // Add state for difficulty error
  const [mealError, setMealError] = useState(""); // Add state for meal error
  const [occasionError, setOccasionError] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);

  const [instructions, setInstructions] = useState([{ name: "", steps: [{ step: 1, description: "", image: "" }] }]);

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

  const handleMealChange = (event) => {
    // If event.target.value is not an array, wrap it in an array
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];

    setSelectedMeals(selectedValues);
    setMealError(null);
  };

  const handleOccasionChange = (event) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedOccasions(selectedValues);
    setOccasionError(null);
  };

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // const response = await axios.post("http://localhost:3000/api/recipes", { title, description, difficulty, meals });
      const response = await axios.post("http://localhost:3000/api/recipes", {
        title,
        description,
        difficulty,
        meals: selectedMeals, // Include the selected meal in the request payload
        occasions: selectedOccasions, // Include the selected occasions in the request payload
        instructions,
      });

      console.log("Recipe created:", response.data);

      setSuccessMessage("Recipe created successfully!");
      setTitle("");
      setDescription(""); // Clear description field after submission
      setDifficulty("");
      setSelectedMeals([]); // Clear selected meal
      setSelectedOccasions([]);

      setTitleError(null);
      setDescriptionError(null);
      setDifficultyError(null);
      setMealError(null);
      setOccasionError(null);
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
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(mealError)}>
          <InputLabel htmlFor="meal-select">Dish Type</InputLabel>
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
