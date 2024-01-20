import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CookingMethodList = () => {
  const [cookingMethods, setCookingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCookingMethod, setSelectedCookingMethod] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editDescriptionError, setEditDescriptionError] = useState("");

  useEffect(() => {
    const fetchCookingMethods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cooking-methods");
        setCookingMethods(response.data);
      } catch (error) {
        console.error("Error fetching cooking methods:", error.message);
        setError("Error fetching cooking methods");
      } finally {
        setLoading(false);
      }
    };

    fetchCookingMethods();
  }, []);

  const handleEditOpen = (cookingMethod) => {
    setSelectedCookingMethod(cookingMethod);
    setEditName(cookingMethod.name);
    setEditDescription(cookingMethod.description);
    setEditNameError(""); // Clear previous errors
    setEditDescriptionError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedCookingMethod(null);
    setEditName("");
    setEditDescription("");
    setEditNameError("");
    setEditDescriptionError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/cooking-methods/${selectedCookingMethod._id}`, {
        name: editName,
        description: editDescription,
      });

      setCookingMethods((prevCookingMethods) => prevCookingMethods.map((cookingMethod) => (cookingMethod._id === selectedCookingMethod._id ? { ...cookingMethod, name: editName, description: editDescription } : cookingMethod)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing cooking method:", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "name") {
            setEditNameError(err.msg);
          } else if (err.path === "description") {
            setEditDescriptionError(err.msg);
          }
        });
      } else {
        console.error("Error editing cooking method:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/cooking-methods/${id}`);
      setCookingMethods((prevCookingMethods) => prevCookingMethods.filter((cookingMethod) => cookingMethod._id !== id));
    } catch (error) {
      console.error("Error deleting cooking method:", error.message);
      setError("Error deleting cooking method");
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
      <h3>List of Cooking Methods</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cookingMethods.map((cookingMethod) => (
              <TableRow key={cookingMethod._id}>
                <TableCell>{cookingMethod.name}</TableCell>
                <TableCell>{cookingMethod.description}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(cookingMethod)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(cookingMethod._id)}>
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
        <DialogTitle>Edit Cooking Method</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
          <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} error={editDescriptionError !== null} helperText={editDescriptionError} />
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

export default CookingMethodList;
