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
  const [dishTypes, setDishTypes] = useState([]); // Add state for dish types
  const [selectedDishTypes, setSelectedDishTypes] = useState([]); // Updated state for multiple selections

  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [difficultyError, setDifficultyError] = useState(null); // Add state for difficulty error
  const [dishTypeError, setDishTypeError] = useState(""); // Add state for dish type error
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Fetch dish types from the backend when the component mounts
    const fetchDishTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dishTypes");
        setDishTypes(response.data);
        console.log(dishTypes);
      } catch (error) {
        console.error("Error fetching dish types:", error.message);
      }
    };

    fetchDishTypes();
  }, []); // Empty dependency array ensures this effect runs once on mount

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

  const handleDishTypeChange = (event) => {
    // If event.target.value is not an array, wrap it in an array
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];

    setSelectedDishTypes(selectedValues);
    setDishTypeError(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // const response = await axios.post("http://localhost:3000/api/recipes", { title, description, difficulty, dishTypes });
      const response = await axios.post("http://localhost:3000/api/recipes", {
        title,
        description,
        difficulty,
        dishTypes: selectedDishTypes, // Include the selected dish type in the request payload
      });

      console.log("Recipe created:", response.data);

      setSuccessMessage("Recipe created successfully!");
      setTitle("");
      setDescription(""); // Clear description field after submission
      setDifficulty("");
      setSelectedDishTypes([]); // Clear selected dish type

      setTitleError(null);
      setDescriptionError(null);
      setDifficultyError(null);
      setDishTypeError(null);
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
          } else if (err.path === "dishTypes") {
            setDishTypeError(err.msg);
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
        <TextField label="Recipe Description" multiline rows={4} variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
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
        <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(dishTypeError)}>
          <InputLabel htmlFor="dish-type-select">Dish Type</InputLabel>
          <Select
            multiple
            value={selectedDishTypes} // This should always be an array
            onChange={handleDishTypeChange}
            label="Dish Types"
            inputProps={{
              id: "dish-type-select",
            }}
            MenuComponent="div"
          >
            {dishTypes.map((type) => (
              <MenuItem key={type._id} value={type._id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          {dishTypeError && <FormHelperText>{dishTypeError}</FormHelperText>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Recipe"}
        </Button>
      </form>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default RecipeForm;
