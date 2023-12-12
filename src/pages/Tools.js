import React, { useState } from "react";
import { Container, TextField, Typography, MenuItem } from "@mui/material";

const Tools = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("milliliter");
  const [result, setResult] = useState("");

  const handleConversion = () => {
    // Perform unit conversion here based on the inputValue, fromUnit, and toUnit
    // For example, convert from cups to milliliters
    // Replace the conversion logic below with your actual conversion formula
    const conversionFactor = 236.588; // 1 cup = 236.588 milliliters
    const convertedValue = (parseFloat(inputValue) * conversionFactor).toFixed(
      2
    );
    setResult(`${inputValue} ${fromUnit} = ${convertedValue} ${toUnit}`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e) => {
    setToUnit(e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Unit Converter
      </Typography>
      <div>
        <TextField
          type="number"
          label="Value to Convert"
          value={inputValue}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <TextField
          select
          label="From"
          value={fromUnit}
          onChange={handleFromUnitChange}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        >
          <MenuItem value="cup">Cup</MenuItem>
          <MenuItem value="teaspoon">Teaspoon</MenuItem>
          {/* Add other units for conversion */}
        </TextField>
        <TextField
          select
          label="To"
          value={toUnit}
          onChange={handleToUnitChange}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        >
          <MenuItem value="milliliter">Milliliter</MenuItem>
          <MenuItem value="liter">Liter</MenuItem>
          {/* Add other units for conversion */}
        </TextField>
        <button onClick={handleConversion}>Convert</button>
      </div>
      {result && (
        <Typography variant="h5" sx={{ mt: 4 }}>
          {result}
        </Typography>
      )}
    </Container>
  );
};

export default Tools;
