import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

const MealForm = () => {
  const [meal, setMeal] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (event) => {
    setMeal(event.target.value);
    setNameError(null);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/meals", { name: meal, description: description });

      console.log("Meal created:", response.data);

      setSuccessMessage("Meal created successfully!");
      setMeal("");
      setDescription("");
      setNameError(null);
      setDescriptionError(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "name") {
            setNameError(err.msg);
          } else if (err.path === "description") {
            setDescriptionError(err.msg);
          }
        });
      } else {
        console.error("Error creating meal:", error.message);
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
        <TextField label="Meal" variant="outlined" fullWidth value={meal} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
        <TextField label="Description" multiline rows={3} variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Meal"}
        </Button>
      </form>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default MealForm;

// export default MealForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const MealForm = () => {
//   const [meal, setMeal] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [nameError, setNameError] = useState(null);
//   const [descriptionError, setDescriptionError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleInputChange = (event) => {
//     setMeal(event.target.value);
//     setNameError(null);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//     setDescriptionError(null);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/meals", { name: meal, description: description });

//       console.log("Meal created:", response.data);

//       setSuccessMessage("Meal created successfully!");
//       setMeal("");
//       setDescription("");
//       setNameError(null);
//       setDescriptionError(null);
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path === "name") {
//             setNameError(err.msg);
//           } else if (err.path === "description") {
//             setDescriptionError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error creating meal:", error.message);
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
//         <TextField label="Meal" variant="outlined" fullWidth value={meal} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
//         <TextField label="Description" multiline rows={3} variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Meal"}
//         </Button>
//       </form>
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default MealForm;

// MULTILANGUAGES
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import axios from "axios";

// const MealForm = () => {
//   const [language, setLanguage] = useState("en"); // Default language is English
//   const [names, setNames] = useState({ en: "", ru: "", lv: "" });
//   const [descriptions, setDescriptions] = useState({ en: "", ru: "", lv: "" });
//   const [loading, setLoading] = useState(false);
//   const [nameError, setNameError] = useState(null);
//   const [descriptionError, setDescriptionError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleInputChange = (event) => {
//     setNames({ ...names, [language]: event.target.value });
//     setNameError(null);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescriptions({ ...descriptions, [language]: event.target.value });
//     setDescriptionError(null);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/meals", {
//         names,
//         descriptions,
//       });

//       console.log("Meal created:", response.data);

//       setSuccessMessage("Meal created successfully!");
//       setNames({ en: "", ru: "", lv: "" });
//       setDescriptions({ en: "", ru: "", lv: "" });
//       setNameError(null);
//       setDescriptionError(null);
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path.endsWith("name")) {
//             setNameError(err.msg);
//           } else if (err.path.endsWith("description")) {
//             setDescriptionError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error creating meal:", error.message);
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
//         <FormControl fullWidth variant="outlined" margin="normal">
//           <InputLabel htmlFor="language-select">Language</InputLabel>
//           <Select
//             value={language}
//             onChange={handleLanguageChange}
//             label="Language"
//             inputProps={{
//               id: "language-select",
//             }}
//           >
//             <MenuItem value="en">English</MenuItem>
//             <MenuItem value="ru">Russian</MenuItem>
//             <MenuItem value="lv">Latvian</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField label={`Meal (${language.toUpperCase()})`} variant="outlined" fullWidth value={names[language]} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
//         <TextField label={`Description (${language.toUpperCase()})`} multiline rows={3} variant="outlined" fullWidth value={descriptions[language]} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Meal"}
//         </Button>
//       </form>
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default MealForm;
