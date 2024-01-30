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
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState("g");
  const [conversionFactor, setConversionFactor] = useState(1);
  const [allowedUnits, setAllowedUnits] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
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

        const topLevelCategories = response.data.filter((category) => category.parentCategory === null);
        setAvailableCategories(topLevelCategories);
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
        fetchSubcategories(value);
        break;
      case "subcategory":
        setSubcategory(value);
        break;
      default:
        break;
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ingredient-categories/${categoryId}/subcategories`);
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };

  // const handleAddUnit = () => {
  //   if (unit && conversionFactor && !isNaN(conversionFactor)) {
  //     const selectedUnit = availableUnits.find((u) => u.abbreviation === unit);

  //     if (selectedUnit) {
  //       setAllowedUnits((prevUnits) => [...prevUnits, { unit: selectedUnit._id, conversionFactor: parseFloat(conversionFactor) }]);
  //       setUnit("");
  //       setConversionFactor(0);
  //     } else {
  //       console.error("Selected unit not found");
  //     }
  //   }
  // };
  const handleAddUnit = () => {
    if (unit && conversionFactor && !isNaN(conversionFactor)) {
      const selectedUnit = availableUnits.find((u) => u.abbreviation === unit);

      if (selectedUnit) {
        setAllowedUnits((prevUnits) => [...prevUnits, { unit: selectedUnit, conversionFactor: parseFloat(conversionFactor) }]);
        setUnit("g");
        setConversionFactor(1);
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
        subcategory,
      });

      console.log("Ingredient created:", response.data);

      setSuccessMessage("Ingredient created successfully!");
      // ... (reset other state variables)
      setName("");
      setDescription("");
      setCalories(0);
      setProtein(0);
      setCarbohydrates(0);
      setFat(0);
      setFiber(0);
      setSugar(0);
      setAmount(100);
      setAllowedUnits([]);
      setUnit("g");
      setConversionFactor(1);
      setCategory("");
      setSubcategory("");
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
        {/* ... (other form fields) */}
        <TextField label="Ingredient Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
        <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
        <TextField label="Calories" type="number" variant="outlined" fullWidth value={calories} onChange={(e) => handleFieldChange("calories", e.target.value)} margin="normal" error={!!errors.calories} helperText={errors.calories} />
        <TextField label="Protein (g)" type="number" variant="outlined" fullWidth value={protein} onChange={(e) => handleFieldChange("protein", e.target.value)} margin="normal" error={!!errors.protein} helperText={errors.protein} />
        <TextField label="Fiber (g)" type="number" variant="outlined" fullWidth value={fiber} onChange={(e) => handleFieldChange("fiber", e.target.value)} margin="normal" error={!!errors.fiber} helperText={errors.fiber} />
        <TextField label="Sugar (g)" type="number" variant="outlined" fullWidth value={sugar} onChange={(e) => handleFieldChange("sugar", e.target.value)} margin="normal" error={!!errors.sugar} helperText={errors.sugar} />
        <TextField label="Carbohydrates (g)" type="number" variant="outlined" fullWidth value={carbohydrates} onChange={(e) => handleFieldChange("carbohydrates", e.target.value)} margin="normal" error={!!errors.carbohydrates} helperText={errors.carbohydrates} />
        <TextField label="Fat (g)" type="number" variant="outlined" fullWidth value={fat} onChange={(e) => handleFieldChange("fat", e.target.value)} margin="normal" error={!!errors.fat} helperText={errors.fat} />
        <TextField label="Amount (Default 100 g)" type="number" variant="outlined" fullWidth value={amount} onChange={(e) => handleFieldChange("amount", e.target.value)} margin="normal" error={!!errors.amount} helperText={errors.amount} />

        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.unit}>
          <InputLabel>Unit (Default g)</InputLabel>
          <Select value={unit} onChange={(e) => handleFieldChange("unit", e.target.value)} label="Unit (Default g)">
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

        {/* <div>
          <h4>Allowed Units:</h4>
          {allowedUnits.map((allowedUnit, index) => (
            <div key={index}>
              {allowedUnit.unit} - {allowedUnit.conversionFactor}
              <Button variant="outlined" color="secondary" onClick={() => handleRemoveUnit(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div> */}
        <div>
          <h4>Allowed Units:</h4>
          {allowedUnits.map((allowedUnit, index) => (
            <div key={index}>
              {allowedUnit.unit.name} ({allowedUnit.unit.abbreviation}) - {allowedUnit.conversionFactor}
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

        {/* Display subcategories dropdown */}
        {subcategories.length > 0 && (
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
        )}

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Ingredient"}
        </Button>
      </form>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default IngredientForm;
