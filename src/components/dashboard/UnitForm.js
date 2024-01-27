// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const UnitForm = () => {
//   const [name, setName] = useState("");
//   const [abbreviation, setAbbreviation] = useState("");
//   const [isBaseUnit, setIsBaseUnit] = useState(false);
//   const [conversionFactor, setConversionFactor] = useState(1);
//   const [system, setSystem] = useState("metric");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "abbreviation":
//         setAbbreviation(value);
//         break;
//       case "isBaseUnit":
//         setIsBaseUnit(value);
//         break;
//       case "conversionFactor":
//         setConversionFactor(value);
//         break;
//       case "system":
//         setSystem(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/units", {
//         name,
//         abbreviation,
//         isBaseUnit,
//         conversionFactor,
//         system,
//       });

//       console.log("Unit created:", response.data);

//       setSuccessMessage("Unit created successfully!");
//       setName("");
//       setAbbreviation("");
//       setIsBaseUnit(false);
//       setConversionFactor(1);
//       setSystem("metric");
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
//         console.error("Error creating unit:", error.message);
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
//         <TextField label="Unit Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Abbreviation" variant="outlined" fullWidth value={abbreviation} onChange={(e) => handleFieldChange("abbreviation", e.target.value)} margin="normal" error={!!errors.abbreviation} helperText={errors.abbreviation} />
//         <TextField label="Is Base Unit" variant="outlined" fullWidth type="checkbox" checked={isBaseUnit} onChange={(e) => handleFieldChange("isBaseUnit", e.target.checked)} margin="normal" />
//         <TextField label="Conversion Factor" variant="outlined" fullWidth type="number" value={conversionFactor} onChange={(e) => handleFieldChange("conversionFactor", e.target.value)} margin="normal" error={!!errors.conversionFactor} helperText={errors.conversionFactor} />
//         <TextField label="System" variant="outlined" fullWidth select value={system} onChange={(e) => handleFieldChange("system", e.target.value)} margin="normal" error={!!errors.system} helperText={errors.system}>
//           <option value="Metric">Metric</option>
//           <option value="Imperial">Imperial</option>
//         </TextField>
//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Unit"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default UnitForm;
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";

const UnitForm = () => {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [isBaseUnit, setIsBaseUnit] = useState(false);
  const [conversionFactor, setConversionFactor] = useState(1);
  const [system, setSystem] = useState("Metric");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFieldChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

    switch (field) {
      case "name":
        setName(value);
        break;
      case "abbreviation":
        setAbbreviation(value);
        break;
      case "isBaseUnit":
        setIsBaseUnit(value);
        break;
      case "conversionFactor":
        setConversionFactor(value);
        break;
      case "system":
        setSystem(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/units", {
        name,
        abbreviation,
        isBaseUnit,
        conversionFactor,
        system,
      });

      console.log("Unit created:", response.data);

      setSuccessMessage("Unit created successfully!");
      setName("");
      setAbbreviation("");
      setIsBaseUnit(false);
      setConversionFactor(1);
      setSystem("Metric");
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
        console.error("Error creating unit:", error.message);
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
        <TextField label="Unit Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
        <TextField label="Abbreviation" variant="outlined" fullWidth value={abbreviation} onChange={(e) => handleFieldChange("abbreviation", e.target.value)} margin="normal" error={!!errors.abbreviation} helperText={errors.abbreviation} />
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Is Base Unit</FormLabel>
          <RadioGroup row value={isBaseUnit} onChange={(e) => handleFieldChange("isBaseUnit", e.target.value === "true")} name="isBaseUnit" defaultValue={isBaseUnit.toString()}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <TextField label="Conversion Factor" variant="outlined" fullWidth type="number" value={conversionFactor} onChange={(e) => handleFieldChange("conversionFactor", e.target.value)} margin="normal" error={!!errors.conversionFactor} helperText={errors.conversionFactor} />
        <FormControl component="fieldset" fullWidth margin="normal" error={!!errors.system}>
          <FormLabel component="legend">System</FormLabel>
          <RadioGroup row value={system} onChange={(e) => handleFieldChange("system", e.target.value)} name="system" defaultValue={system}>
            <FormControlLabel value="Metric" control={<Radio />} label="Metric" />
            <FormControlLabel value="Imperial" control={<Radio />} label="Imperial" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Unit"}
        </Button>
      </form>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default UnitForm;
