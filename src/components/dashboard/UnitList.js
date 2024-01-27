import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UnitList = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAbbreviation, setEditAbbreviation] = useState("");
  const [editIsBaseUnit, setEditIsBaseUnit] = useState(false);
  const [editConversionFactor, setEditConversionFactor] = useState(1);
  const [editSystem, setEditSystem] = useState("metric");
  const [editNameError, setEditNameError] = useState("");
  const [editAbbreviationError, setEditAbbreviationError] = useState("");
  const [editConversionFactorError, setEditConversionFactorError] = useState("");

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/units");
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error.message);
        setError("Error fetching units");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const handleEditOpen = (unit) => {
    setSelectedUnit(unit);
    setEditName(unit.name);
    setEditAbbreviation(unit.abbreviation);
    setEditIsBaseUnit(unit.isBaseUnit);
    setEditConversionFactor(unit.conversionFactor);
    setEditSystem(unit.system);
    setEditNameError(""); // Clear previous errors
    setEditAbbreviationError("");
    setEditConversionFactorError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedUnit(null);
    setEditName("");
    setEditAbbreviation("");
    setEditIsBaseUnit(false);
    setEditConversionFactor(1);
    setEditSystem("metric");
    setEditNameError("");
    setEditAbbreviationError("");
    setEditConversionFactorError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/units/${selectedUnit._id}`, {
        name: editName,
        abbreviation: editAbbreviation,
        isBaseUnit: editIsBaseUnit,
        conversionFactor: editConversionFactor,
        system: editSystem,
      });

      setUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit._id === selectedUnit._id
            ? {
                ...unit,
                name: editName,
                abbreviation: editAbbreviation,
                isBaseUnit: editIsBaseUnit,
                conversionFactor: editConversionFactor,
                system: editSystem,
              }
            : unit
        )
      );

      handleEditClose();
    } catch (error) {
      console.error("Error editing unit:", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "name") {
            setEditNameError(err.msg);
          } else if (err.path === "abbreviation") {
            setEditAbbreviationError(err.msg);
          } else if (err.path === "conversionFactor") {
            setEditConversionFactorError(err.msg);
          }
        });
      } else {
        console.error("Error editing unit:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/units/${id}`);
      setUnits((prevUnits) => prevUnits.filter((unit) => unit._id !== id));
    } catch (error) {
      console.error("Error deleting unit:", error.message);
      setError("Error deleting unit");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>List of Units</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Abbreviation</TableCell>
              <TableCell>Is Base Unit</TableCell>
              <TableCell>Conversion Factor</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit._id}>
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.abbreviation}</TableCell>
                <TableCell>{unit.isBaseUnit ? "Yes" : "No"}</TableCell>
                <TableCell>{unit.conversionFactor}</TableCell>
                <TableCell>{unit.system}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(unit)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(unit._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} PaperProps={{ style: { maxHeight: "80vh" } }}>
        <DialogTitle>Edit Unit</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
          <TextField label="Abbreviation" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editAbbreviation} onChange={(e) => setEditAbbreviation(e.target.value)} error={editAbbreviationError !== null} helperText={editAbbreviationError} />
          <TextField label="Is Base Unit" variant="outlined" style={{ marginTop: "1rem" }} fullWidth type="checkbox" checked={editIsBaseUnit} onChange={(e) => setEditIsBaseUnit(e.target.checked)} />
          <TextField label="Conversion Factor" variant="outlined" style={{ marginTop: "1rem" }} fullWidth type="number" value={editConversionFactor} onChange={(e) => setEditConversionFactor(e.target.value)} error={editConversionFactorError !== null} helperText={editConversionFactorError} />
          <TextField label="System" variant="outlined" style={{ marginTop: "1rem" }} fullWidth select value={editSystem} onChange={(e) => setEditSystem(e.target.value)}>
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UnitList;
