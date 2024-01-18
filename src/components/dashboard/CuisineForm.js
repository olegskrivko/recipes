// export default CuisineForm;
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

const CuisineForm = () => {
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (event) => {
    setCuisine(event.target.value);
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

      const response = await axios.post("http://localhost:3000/api/cuisines", { name: cuisine, description: description });

      console.log("Cuisine created:", response.data);

      setSuccessMessage("Cuisine created successfully!");
      setCuisine("");
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
        console.error("Error creating cuisine:", error.message);
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
        <TextField label="Cuisine" variant="outlined" fullWidth value={cuisine} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
        <TextField label="Description" multiline rows={3} variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Cuisine"}
        </Button>
      </form>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default CuisineForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import axios from "axios";

// const CuisineForm = () => {
//   const [name, setName] = useState({ en: "", rus: "", lv: "" });
//   const [description, setDescription] = useState({ en: "", rus: "", lv: "" });
//   const [loading, setLoading] = useState(false);
//   const [nameError, setNameError] = useState({ en: null, rus: null, lv: null });
//   const [descriptionError, setDescriptionError] = useState({ en: null, rus: null, lv: null });
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState("en");

//   const handleInputChange = (event) => {
//     const { value } = event.target;
//     setName((prevName) => ({ ...prevName, [selectedLanguage]: value }));
//     setNameError((prevErrors) => ({ ...prevErrors, [selectedLanguage]: null }));
//   };

//   const handleDescriptionChange = (event) => {
//     const { value } = event.target;
//     setDescription((prevDescription) => ({ ...prevDescription, [selectedLanguage]: value }));
//     setDescriptionError((prevErrors) => ({ ...prevErrors, [selectedLanguage]: null }));
//   };

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/cuisines", {
//         name,
//         description,
//       });

//       console.log("Cuisine created:", response.data);

//       setSuccessMessage("Cuisine created successfully!");
//       setName({ en: "", rus: "", lv: "" });
//       setDescription({ en: "", rus: "", lv: "" });
//       setNameError({ en: null, rus: null, lv: null });
//       setDescriptionError({ en: null, rus: null, lv: null });
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path.startsWith("name")) {
//             setNameError((prevErrors) => ({ ...prevErrors, [err.path.split(".")[1]]: err.msg }));
//           } else if (err.path.startsWith("description")) {
//             setDescriptionError((prevErrors) => ({ ...prevErrors, [err.path.split(".")[1]]: err.msg }));
//           }
//         });
//       } else {
//         console.error("Error creating cuisine:", error.message);
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
//         <FormControl fullWidth margin="normal">
//           <InputLabel id="language-select-label">Language</InputLabel>
//           <Select labelId="language-select-label" id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
//             <MenuItem value="en">English</MenuItem>
//             <MenuItem value="rus">Russian</MenuItem>
//             <MenuItem value="lv">Latvian</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField label={`Cuisine Name (${selectedLanguage.toUpperCase()})`} variant="outlined" fullWidth value={name[selectedLanguage]} onChange={handleInputChange} margin="normal" error={nameError[selectedLanguage] !== null} helperText={nameError[selectedLanguage]} />
//         <TextField label={`Description (${selectedLanguage.toUpperCase()})`} multiline rows={3} variant="outlined" fullWidth value={description[selectedLanguage]} onChange={handleDescriptionChange} margin="normal" error={descriptionError[selectedLanguage] !== null} helperText={descriptionError[selectedLanguage]} />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Cuisine"}
//         </Button>
//       </form>
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default CuisineForm;
