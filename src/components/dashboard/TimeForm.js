// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const TimeForm = () => {
//   const [label, setLabel] = useState("");
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "label":
//         setLabel(value);
//         break;
//       case "hours":
//         setHours(value);
//         break;
//       case "minutes":
//         setMinutes(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/times", {
//         label,
//         value: {
//           hours,
//           minutes,
//         },
//       });

//       console.log("Time created:", response.data);

//       setSuccessMessage("Time created successfully!");
//       setLabel("");
//       setHours(0);
//       setMinutes(0);
//       setErrors({});
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         const errorObject = {};
//         serverErrors.forEach((err) => {
//           errorObject[err.path] = err.msg;
//         });
//         setErrors(errorObject);
//       } else {
//         console.error("Error creating time:", error.message);
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
//         <TextField label="Time Label" variant="outlined" fullWidth value={label} onChange={(e) => handleFieldChange("label", e.target.value)} margin="normal" error={!!errors.label} helperText={errors.label} />
//         <TextField label="Hours" variant="outlined" type="number" fullWidth value={hours} onChange={(e) => handleFieldChange("hours", e.target.value)} margin="normal" error={!!errors.hours} helperText={errors.hours} />
//         <TextField label="Minutes" variant="outlined" type="number" fullWidth value={minutes} onChange={(e) => handleFieldChange("minutes", e.target.value)} margin="normal" error={!!errors.minutes} helperText={errors.minutes} />
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Time"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default TimeForm;
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

const TimeForm = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFieldChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    setName(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/times", {
        name,
      });

      console.log("Time created:", response.data);

      setSuccessMessage("Time created successfully!");
      setName("");
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
        console.error("Error creating time:", error.message);
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
        <TextField label="Time Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Time"}
        </Button>
      </form>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default TimeForm;
