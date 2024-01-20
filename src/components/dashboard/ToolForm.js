// // import React, { useState } from "react";
// // import { TextField, Button, CircularProgress, Snackbar, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
// // import axios from "axios";

// // const ToolForm = () => {
// //   const [name, setName] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [purchaseLink, setPurchaseLink] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [successMessage, setSuccessMessage] = useState(null);

// //   const handleFieldChange = (field, value) => {
// //     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

// //     switch (field) {
// //       case "name":
// //         setName(value);
// //         break;
// //       case "category":
// //         setCategory(value);
// //         break;
// //       case "purchaseLink":
// //         setPurchaseLink(value);
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   const handleFormSubmit = async (event) => {
// //     event.preventDefault();

// //     try {
// //       setLoading(true);

// //       const response = await axios.post("http://localhost:3000/api/tools", {
// //         name,
// //         category,
// //         purchaseLink,
// //       });

// //       console.log("Tool created:", response.data);

// //       setSuccessMessage("Tool created successfully!");
// //       setName("");
// //       setCategory("");
// //       setPurchaseLink("");
// //       setErrors({});
// //     } catch (error) {
// //       if (error.response && error.response.data && error.response.data.errors) {
// //         const serverErrors = error.response.data.errors;
// //         const errorObject = {};
// //         serverErrors.forEach((err) => {
// //           errorObject[err.path] = err.msg;
// //         });
// //         setErrors(errorObject);
// //       } else {
// //         console.error("Error creating tool:", error.message);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCloseSuccessMessage = () => {
// //     setSuccessMessage(null);
// //   };

// //   return (
// //     <>
// //       <form onSubmit={handleFormSubmit}>
// //         <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />

// //         {/* Radio buttons for category */}
// //         <FormLabel component="legend">Category</FormLabel>
// //         <RadioGroup row aria-label="category" name="category" value={category} onChange={(e) => handleFieldChange("category", e.target.value)}>
// //           <FormControlLabel value="Cookware" control={<Radio />} label="Cookware" />
// //           <FormControlLabel value="Kitchen Gadgets" control={<Radio />} label="Kitchen Gadgets" />
// //         </RadioGroup>

// //         <TextField label="Purchase Link" variant="outlined" fullWidth value={purchaseLink} onChange={(e) => handleFieldChange("purchaseLink", e.target.value)} margin="normal" error={!!errors.purchaseLink} helperText={errors.purchaseLink} />
// //         <Button type="submit" variant="contained" color="primary" disabled={loading}>
// //           {loading ? <CircularProgress size={24} /> : "Create Tool"}
// //         </Button>
// //       </form>
// //       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
// //     </>
// //   );
// // };

// // export default ToolForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import axios from "axios";

// const ToolForm = () => {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("Other");
//   const [purchaseLink, setPurchaseLink] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "category":
//         setCategory(value);
//         break;
//       case "purchaseLink":
//         setPurchaseLink(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/tools", {
//         name,
//         category,
//         purchaseLink,
//       });

//       console.log("Tool created:", response.data);

//       setSuccessMessage("Tool created successfully!");
//       setName("");
//       setCategory("Cookware");
//       setPurchaseLink("");
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
//         console.error("Error creating tool:", error.message);
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
//         <TextField label="Tool Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />

//         <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
//           <FormLabel component="legend">Category</FormLabel>
//           <RadioGroup aria-label="category" name="category" value={category} onChange={(e) => handleFieldChange("category", e.target.value)}>
//             <FormControlLabel value="Cookware" control={<Radio />} label="Cookware" />
//             <FormControlLabel value="Cutlery" control={<Radio />} label="Cutlery" />
//             <FormControlLabel value="Utensils" control={<Radio />} label="Utensils" />
//             <FormControlLabel value="Appliances" control={<Radio />} label="Appliances" />
//             <FormControlLabel value="Kitchen Gadgets" control={<Radio />} label="Kitchen Gadgets" />
//             <FormControlLabel value="Other" control={<Radio />} label="Other" />
//           </RadioGroup>
//         </FormControl>

//         <TextField label="Purchase Link (Optional)" variant="outlined" fullWidth value={purchaseLink} onChange={(e) => handleFieldChange("purchaseLink", e.target.value)} margin="normal" error={!!errors.purchaseLink} helperText={errors.purchaseLink} />

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Tool"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default ToolForm;
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import axios from "axios";

const ToolForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Other");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFieldChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

    switch (field) {
      case "name":
        setName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "purchaseLink":
        setPurchaseLink(value);
        break;
      case "shopName":
        setShopName(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/tools", {
        name,
        category,
        purchaseLink,
        shopName,
      });

      console.log("Tool created:", response.data);

      setSuccessMessage("Tool created successfully!");
      setName("");
      setCategory("Other");
      setPurchaseLink("");
      setShopName("");
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
        console.error("Error creating tool:", error.message);
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
        <TextField label="Tool Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />

        <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup aria-label="category" name="category" value={category} onChange={(e) => handleFieldChange("category", e.target.value)}>
            <FormControlLabel value="Cookware" control={<Radio />} label="Cookware" />
            <FormControlLabel value="Cutlery" control={<Radio />} label="Cutlery" />
            <FormControlLabel value="Bakeware" control={<Radio />} label="Bakeware" />
            <FormControlLabel value="Utensils" control={<Radio />} label="Utensils" />
            <FormControlLabel value="Appliances" control={<Radio />} label="Appliances" />
            <FormControlLabel value="Kitchen Gadgets" control={<Radio />} label="Kitchen Gadgets" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <TextField label="Purchase Link (Optional)" variant="outlined" fullWidth value={purchaseLink} onChange={(e) => handleFieldChange("purchaseLink", e.target.value)} margin="normal" error={!!errors.purchaseLink} helperText={errors.purchaseLink} />

        <TextField label="Shop Name (Optional)" variant="outlined" fullWidth value={shopName} onChange={(e) => handleFieldChange("shopName", e.target.value)} margin="normal" error={!!errors.shopName} helperText={errors.shopName} />

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Tool"}
        </Button>
      </form>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default ToolForm;
