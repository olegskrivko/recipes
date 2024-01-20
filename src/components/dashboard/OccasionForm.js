import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

const OccasionForm = () => {
  const [occasion, setOccasion] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFieldChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

    switch (field) {
      case "occasion":
        setOccasion(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/occasions", {
        name: occasion,
        description: description,
      });

      console.log("Occasion created:", response.data);

      setSuccessMessage("Occasion created successfully!");
      setOccasion("");
      setDescription("");
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const errorObject = {};
        serverErrors.forEach((err) => {
          errorObject[err.path] = err.msg;
        });
        setErrors(errorObject);
      } else {
        console.error("Error creating occasion:", error.message);
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
        <TextField label="Occasion" variant="outlined" fullWidth value={occasion} onChange={(e) => handleFieldChange("occasion", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
        <TextField label="Description" multiline rows={3} variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Occasion"}
        </Button>
      </form>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default OccasionForm;

// // export default OccasionForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const OccasionForm = () => {
//   const [occasion, setOccasion] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [season, setSeason] = useState("");
//   const [decorationIdeas, setDecorationIdeas] = useState("");
//   const [traditions, setTraditions] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [nameError, setNameError] = useState(null);
//   const [descriptionError, setDescriptionError] = useState(null);
//   const [dateError, setDateError] = useState(null);
//   const [seasonError, setSeasonError] = useState(null);
//   const [decorationIdeasError, setDecorationIdeasError] = useState(null);
//   const [traditionsError, setTraditionsError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleInputChange = (event) => {
//     setOccasion(event.target.value);
//     setNameError(null);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//     setDescriptionError(null);
//   };

//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//     setDateError(null);
//   };

//   const handleSeasonChange = (event) => {
//     setSeason(event.target.value);
//     setSeasonError(null);
//   };

//   const handleDecorationIdeasChange = (event) => {
//     setDecorationIdeas(event.target.value);
//     setDecorationIdeasError(null);
//   };

//   const handleTraditionsChange = (event) => {
//     setTraditions(event.target.value);
//     setTraditionsError(null);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/occasions", { name: occasion, description: description, date: date, season: season, decorationIdeas: decorationIdeas, traditions: traditions });

//       console.log("Occasion created:", response.data);

//       setSuccessMessage("Occasion created successfully!");
//       setOccasion("");
//       setDescription("");
//       setDate("");
//       setSeason("");
//       setDecorationIdeas("");
//       setTraditions("");
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
//           } else if (err.path === "date") {
//             setDateError(err.msg);
//           } else if (err.path === "season") {
//             setSeasonError(err.msg);
//           } else if (err.path === "decorationIdeas") {
//             setDecorationIdeasError(err.msg);
//           } else if (err.path === "traditions") {
//             setTraditionsError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error creating occasion:", error.message);
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
//         <TextField label="Occasion" variant="outlined" fullWidth value={occasion} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
//         <TextField label="Description" multiline rows={3} variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
//         <TextField
//           label="Date"
//           InputLabelProps={{
//             shrink: true, // Keep the label on the border
//           }}
//           variant="outlined"
//           type="date"
//           fullWidth
//           value={date}
//           onChange={handleDateChange}
//           margin="normal"
//           error={dateError !== null}
//           helperText={dateError}
//         />
//         <TextField label="Season" variant="outlined" fullWidth value={season} onChange={handleSeasonChange} margin="normal" error={seasonError !== null} helperText={seasonError} />
//         <TextField label="Decoration Ideas" multiline rows={3} variant="outlined" fullWidth value={decorationIdeas} onChange={handleDecorationIdeasChange} margin="normal" error={decorationIdeasError !== null} helperText={decorationIdeasError} />
//         <TextField label="Traditions" multiline rows={3} variant="outlined" fullWidth value={traditions} onChange={handleTraditionsChange} margin="normal" error={traditionsError !== null} helperText={traditionsError} />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Occasion"}
//         </Button>
//       </form>
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default OccasionForm;
