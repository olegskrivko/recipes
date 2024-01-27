// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
// import axios from "axios";

// const IngredientForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [calories, setCalories] = useState(0);
//   const [protein, setProtein] = useState(0);
//   const [carbohydrates, setCarbohydrates] = useState(0);
//   const [fat, setFat] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [unit, setUnit] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       case "calories":
//         setCalories(value);
//         break;
//       case "protein":
//         setProtein(value);
//         break;
//       case "carbohydrates":
//         setCarbohydrates(value);
//         break;
//       case "fat":
//         setFat(value);
//         break;
//       case "amount":
//         setAmount(value);
//         break;
//       case "unit":
//         setUnit(value);
//         break;
//       case "category":
//         setCategory(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredients", {
//         name,
//         description,
//         calories,
//         protein,
//         carbohydrates,
//         fat,
//         amount,
//         unit,
//         category,
//       });

//       console.log("Ingredient created:", response.data);

//       setSuccessMessage("Ingredient created successfully!");
//       setName("");
//       setDescription("");
//       setCalories(0);
//       setProtein(0);
//       setCarbohydrates(0);
//       setFat(0);
//       setAmount(0);
//       setUnit("");
//       setCategory("");
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
//         console.error("Error creating ingredient:", error.message);
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
//         <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
//         <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
//         <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
//         <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
//         <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
//         <TextField label="Amount" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />
//         <TextField label="Unit" variant="outlined" fullWidth value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} margin="normal" error={!!errors.unit} helperText={errors.unit} />

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.category}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
//             <MenuItem value="">Select Category</MenuItem>
//             <MenuItem value="Fruits">Fruits</MenuItem>
//             <MenuItem value="Vegetables">Vegetables</MenuItem>
//             {/* Add more categories as needed */}
//           </Select>
//         </FormControl>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientForm;
// import React, { useState, useEffect } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
// import axios from "axios";

// const IngredientForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [calories, setCalories] = useState(0);
//   const [protein, setProtein] = useState(0);
//   const [carbohydrates, setCarbohydrates] = useState(0);
//   const [fat, setFat] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [unit, setUnit] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/units");
//         setAvailableUnits(response.data);
//       } catch (error) {
//         console.error("Error fetching units:", error.message);
//       }
//     };

//     fetchUnits();
//   }, []);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       case "calories":
//         setCalories(value);
//         break;
//       case "protein":
//         setProtein(value);
//         break;
//       case "carbohydrates":
//         setCarbohydrates(value);
//         break;
//       case "fat":
//         setFat(value);
//         break;
//       case "amount":
//         setAmount(value);
//         break;
//       case "unit":
//         setUnit(value);
//         break;
//       case "category":
//         setCategory(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredients", {
//         name,
//         description,
//         calories,
//         protein,
//         carbohydrates,
//         fat,
//         amount,
//         unit,
//         category,
//       });

//       console.log("Ingredient created:", response.data);

//       setSuccessMessage("Ingredient created successfully!");
//       setName("");
//       setDescription("");
//       setCalories(0);
//       setProtein(0);
//       setCarbohydrates(0);
//       setFat(0);
//       setAmount(0);
//       setUnit("");
//       setCategory("");
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
//         console.error("Error creating ingredient:", error.message);
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
//         <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
//         <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
//         <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
//         <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
//         <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
//         <TextField label="Amount" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.unit}>
//           <InputLabel>Unit</InputLabel>
//           <Select value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} label="Unit">
//             <MenuItem value="">Select Unit</MenuItem>
//             {availableUnits.map((availableUnit) => (
//               <MenuItem key={availableUnit._id} value={availableUnit.abbreviation}>
//                 {availableUnit.name} ({availableUnit.abbreviation})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.category}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
//             <MenuItem value="">Select Category</MenuItem>
//             <MenuItem value="Fruits">Fruits</MenuItem>
//             <MenuItem value="Vegetables">Vegetables</MenuItem>
//           </Select>
//         </FormControl> */}

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientForm;
// import React, { useState, useEffect } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
// import axios from "axios";

// const IngredientForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [calories, setCalories] = useState(0);
//   const [protein, setProtein] = useState(0);
//   const [carbohydrates, setCarbohydrates] = useState(0);
//   const [fat, setFat] = useState(0);
//   const [fiber, setFiber] = useState(0); // Added field
//   const [sugar, setSugar] = useState(0); // Added field
//   const [amount, setAmount] = useState(0);
//   const [unit, setUnit] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);
//   const [availableCategories, setAvailableCategories] = useState([]);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/units");
//         setAvailableUnits(response.data);
//       } catch (error) {
//         console.error("Error fetching units:", error.message);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ingredient-categories");
//         setAvailableCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error.message);
//       }
//     };

//     fetchUnits();
//     fetchCategories();
//   }, []);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       case "calories":
//         setCalories(value);
//         break;
//       case "protein":
//         setProtein(value);
//         break;
//       case "carbohydrates":
//         setCarbohydrates(value);
//         break;
//       case "fat":
//         setFat(value);
//         break;
//       case "fiber": // Added case
//         setFiber(value);
//         break;
//       case "sugar": // Added case
//         setSugar(value);
//         break;
//       case "amount":
//         setAmount(value);
//         break;
//       case "unit":
//         setUnit(value);
//         break;
//       case "category":
//         setCategory(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredients", {
//         name,
//         description,
//         calories,
//         protein,
//         carbohydrates,
//         fat,
//         fiber, // Added field
//         sugar, // Added field
//         amount,
//         unit,
//         category,
//       });

//       console.log("Ingredient created:", response.data);

//       setSuccessMessage("Ingredient created successfully!");
//       setName("");
//       setDescription("");
//       setCalories(0);
//       setProtein(0);
//       setCarbohydrates(0);
//       setFat(0);
//       setFiber(0); // Added field
//       setSugar(0); // Added field
//       setAmount(0);
//       setUnit("");
//       setCategory("");
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
//         console.error("Error creating ingredient:", error.message);
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
//         <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
//         <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
//         <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
//         <TextField label="Fiber (g)" type="number" variant="outlined" fullWidth value={fiber} onChange={(e) => handleFieldChange("fiber", e.target.value)} margin="normal" error={!!errors.fiber} helperText={errors.fiber} />
//         <TextField label="Sugar (g)" type="number" variant="outlined" fullWidth value={sugar} onChange={(e) => handleFieldChange("sugar", e.target.value)} margin="normal" error={!!errors.sugar} helperText={errors.sugar} />

//         <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
//         <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
//         <TextField label="Amount" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.unit}>
//           <InputLabel>Unit</InputLabel>
//           <Select value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} label="Unit">
//             <MenuItem value="">Select Unit</MenuItem>
//             {availableUnits.map((availableUnit) => (
//               <MenuItem key={availableUnit._id} value={availableUnit.abbreviation}>
//                 {availableUnit.name} ({availableUnit.abbreviation})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.category}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
//             <MenuItem value="">Select Category</MenuItem>
//             {availableCategories.map((category) => (
//               <MenuItem key={category._id} value={category._id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientForm;
// import React, { useState, useEffect } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
// import axios from "axios";

// const IngredientForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [calories, setCalories] = useState(0);
//   const [protein, setProtein] = useState(0);
//   const [carbohydrates, setCarbohydrates] = useState(0);
//   const [fat, setFat] = useState(0);
//   const [fiber, setFiber] = useState(0);
//   const [sugar, setSugar] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [unit, setUnit] = useState("");
//   const [conversionFactor, setConversionFactor] = useState(0);
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);
//   const [availableCategories, setAvailableCategories] = useState([]);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/units");
//         setAvailableUnits(response.data);
//       } catch (error) {
//         console.error("Error fetching units:", error.message);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ingredient-categories");
//         setAvailableCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error.message);
//       }
//     };

//     fetchUnits();
//     fetchCategories();
//   }, []);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       case "calories":
//         setCalories(value);
//         break;
//       case "protein":
//         setProtein(value);
//         break;
//       case "carbohydrates":
//         setCarbohydrates(value);
//         break;
//       case "fat":
//         setFat(value);
//         break;
//       case "fiber":
//         setFiber(value);
//         break;
//       case "sugar":
//         setSugar(value);
//         break;
//       case "amount":
//         setAmount(value);
//         break;
//       case "unit":
//         setUnit(value);
//         break;
//       case "conversionFactor":
//         setConversionFactor(value);
//         break;
//       case "category":
//         setCategory(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredients", {
//         name,
//         description,
//         calories,
//         protein,
//         carbohydrates,
//         fat,
//         fiber,
//         sugar,
//         amount,
//         unit,
//         category,
//       });

//       console.log("Ingredient created:", response.data);

//       setSuccessMessage("Ingredient created successfully!");
//       setName("");
//       setDescription("");
//       setCalories(0);
//       setProtein(0);
//       setCarbohydrates(0);
//       setFat(0);
//       setFiber(0);
//       setSugar(0);
//       setAmount(0);
//       setUnit("");
//       setCategory("");
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
//         console.error("Error creating ingredient:", error.message);
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
//         <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
//         <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
//         <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
//         <TextField label="Fiber (g)" type="number" variant="outlined" fullWidth value={fiber} onChange={(e) => handleFieldChange("fiber", e.target.value)} margin="normal" error={!!errors.fiber} helperText={errors.fiber} />
//         <TextField label="Sugar (g)" type="number" variant="outlined" fullWidth value={sugar} onChange={(e) => handleFieldChange("sugar", e.target.value)} margin="normal" error={!!errors.sugar} helperText={errors.sugar} />
//         <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
//         <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
//         <TextField label="Amount" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.unit}>
//           <InputLabel>Unit</InputLabel>
//           <Select value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} label="Unit">
//             <MenuItem value="">Select Unit</MenuItem>
//             {availableUnits.map((availableUnit) => (
//               <MenuItem key={availableUnit._id} value={availableUnit.abbreviation}>
//                 {availableUnit.name} ({availableUnit.abbreviation})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.category}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
//             <MenuItem value="">Select Category</MenuItem>
//             {availableCategories.map((category) => (
//               <MenuItem key={category._id} value={category._id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientForm;

// import React, { useState, useEffect } from "react";
// import { TextField, Button, CircularProgress, Snackbar, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
// import axios from "axios";

// const IngredientForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [calories, setCalories] = useState(0);
//   const [protein, setProtein] = useState(0);
//   const [carbohydrates, setCarbohydrates] = useState(0);
//   const [fat, setFat] = useState(0);
//   const [fiber, setFiber] = useState(0);
//   const [sugar, setSugar] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [unit, setUnit] = useState("");
//   const [conversionFactor, setConversionFactor] = useState(0);
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);
//   const [availableCategories, setAvailableCategories] = useState([]);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/units");
//         setAvailableUnits(response.data);
//       } catch (error) {
//         console.error("Error fetching units:", error.message);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ingredient-categories");
//         setAvailableCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error.message);
//       }
//     };

//     fetchUnits();
//     fetchCategories();
//   }, []);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       case "calories":
//         setCalories(value);
//         break;
//       case "protein":
//         setProtein(value);
//         break;
//       case "carbohydrates":
//         setCarbohydrates(value);
//         break;
//       case "fat":
//         setFat(value);
//         break;
//       case "fiber":
//         setFiber(value);
//         break;
//       case "sugar":
//         setSugar(value);
//         break;
//       case "amount":
//         setAmount(value);
//         break;
//       case "unit":
//         setUnit(value);
//         break;
//       case "conversionFactor":
//         setConversionFactor(value);
//         break;
//       case "category":
//         setCategory(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredients", {
//         name,
//         description,
//         calories,
//         protein,
//         carbohydrates,
//         fat,
//         fiber,
//         sugar,
//         amount,
//         allowedUnits: [{ unit, conversionFactor }],
//         category,
//       });

//       console.log("Ingredient created:", response.data);

//       setSuccessMessage("Ingredient created successfully!");
//       setName("");
//       setDescription("");
//       setCalories(0);
//       setProtein(0);
//       setCarbohydrates(0);
//       setFat(0);
//       setFiber(0);
//       setSugar(0);
//       setAmount(0);
//       setUnit("");
//       setConversionFactor(0);
//       setCategory("");
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
//         console.error("Error creating ingredient:", error.message);
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
//         <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
//         <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
//         <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
//         <TextField label="Fiber (g)" type="number" variant="outlined" fullWidth value={fiber} onChange={(e) => handleFieldChange("fiber", e.target.value)} margin="normal" error={!!errors.fiber} helperText={errors.fiber} />
//         <TextField label="Sugar (g)" type="number" variant="outlined" fullWidth value={sugar} onChange={(e) => handleFieldChange("sugar", e.target.value)} margin="normal" error={!!errors.sugar} helperText={errors.sugar} />
//         <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
//         <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
//         <TextField label="Amount" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.unit}>
//           <InputLabel>Unit</InputLabel>
//           <Select value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} label="Unit">
//             <MenuItem value="">Select Unit</MenuItem>
//             {availableUnits.map((availableUnit) => (
//               <MenuItem key={availableUnit._id} value={availableUnit.abbreviation}>
//                 {availableUnit.name} ({availableUnit.abbreviation})
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField label="Conversion Factor" type="number" variant="outlined" fullWidth value={conversionFactor} onChange={(e) => handleFieldChange("conversionFactor", e.target.value)} margin="normal" error={!!errors.conversionFactor} helperText={errors.conversionFactor} />

//         <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.category}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
//             <MenuItem value="">Select Category</MenuItem>
//             {availableCategories.map((category) => (
//               <MenuItem key={category._id} value={category._id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientForm;
import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress, Snackbar, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
import axios from "axios";

const IngredientForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fat, setFat] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");
  const [conversionFactor, setConversionFactor] = useState(0);
  const [allowedUnits, setAllowedUnits] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/units");
        setAvailableUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredient-categories");
        setAvailableCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchUnits();
    fetchCategories();
  }, []);

  const handleFieldChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

    switch (field) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "calories":
        setCalories(value);
        break;
      case "protein":
        setProtein(value);
        break;
      case "carbohydrates":
        setCarbohydrates(value);
        break;
      case "fat":
        setFat(value);
        break;
      case "fiber":
        setFiber(value);
        break;
      case "sugar":
        setSugar(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "unit":
        setUnit(value);
        break;
      case "conversionFactor":
        setConversionFactor(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  // const handleAddUnit = () => {
  //   if (unit && conversionFactor) {
  //     setAllowedUnits((prevUnits) => [...prevUnits, { unit, conversionFactor }]);
  //     setUnit("");
  //     setConversionFactor(0);
  //   }
  // };
  const handleAddUnit = () => {
    if (unit && conversionFactor && !isNaN(conversionFactor)) {
      const selectedUnit = availableUnits.find((u) => u.abbreviation === unit);

      if (selectedUnit) {
        setAllowedUnits((prevUnits) => [...prevUnits, { unit: selectedUnit._id, conversionFactor: parseFloat(conversionFactor) }]);
        setUnit("");
        setConversionFactor(0);
      } else {
        console.error("Selected unit not found");
      }
    }
  };

  const handleRemoveUnit = (index) => {
    setAllowedUnits((prevUnits) => prevUnits.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/ingredients", {
        name,
        description,
        calories,
        protein,
        carbohydrates,
        fat,
        fiber,
        sugar,
        amount,
        allowedUnits: allowedUnits.map(({ unit, conversionFactor }) => ({ unit, conversionFactor })),
        category,
      });

      console.log("Ingredient created:", response.data);

      setSuccessMessage("Ingredient created successfully!");
      setName("");
      setDescription("");
      setCalories(0);
      setProtein(0);
      setCarbohydrates(0);
      setFat(0);
      setFiber(0);
      setSugar(0);
      setAmount(0);
      setAllowedUnits([]);
      setUnit("");
      setConversionFactor(0);
      setCategory("");
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
        console.error("Error creating ingredient:", error.message);
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
        <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
        <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
        <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
        <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
        <TextField label="Fiber (g)" type="number" variant="outlined" fullWidth value={fiber} onChange={(e) => handleFieldChange("fiber", e.target.value)} margin="normal" error={!!errors.fiber} helperText={errors.fiber} />
        <TextField label="Sugar (g)" type="number" variant="outlined" fullWidth value={sugar} onChange={(e) => handleFieldChange("sugar", e.target.value)} margin="normal" error={!!errors.sugar} helperText={errors.sugar} />
        <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
        <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
        <TextField label="Amount" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />

        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.unit}>
          <InputLabel>Unit</InputLabel>
          <Select value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} label="Unit">
            <MenuItem value="">Select Unit</MenuItem>
            {availableUnits.map((availableUnit) => (
              <MenuItem key={availableUnit._id} value={availableUnit.abbreviation}>
                {availableUnit.name} ({availableUnit.abbreviation})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Conversion Factor" type="number" variant="outlined" fullWidth value={conversionFactor} onChange={(e) => handleFieldChange("conversionFactor", e.target.value)} margin="normal" error={!!errors.conversionFactor} helperText={errors.conversionFactor} />

        <Button variant="contained" color="primary" onClick={handleAddUnit}>
          Add Unit
        </Button>

        <div>
          <h4>Allowed Units:</h4>
          {allowedUnits.map((allowedUnit, index) => (
            <div key={index}>
              {allowedUnit.unit} - {allowedUnit.conversionFactor}
              <Button variant="outlined" color="secondary" onClick={() => handleRemoveUnit(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>

        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => handleFieldChange("category", e.target.value)} label="Category">
            <MenuItem value="">Select Category</MenuItem>
            {availableCategories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
        </Button>
      </form>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default IngredientForm;
