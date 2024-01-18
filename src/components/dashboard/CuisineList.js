// export default CuisineList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CuisineList = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cuisines");
        setCuisines(response.data);
      } catch (error) {
        console.error("Error fetching cuisines:", error.message);
        setError("Error fetching cuisines");
      } finally {
        setLoading(false);
      }
    };

    fetchCuisines();
  }, []);

  const handleEditOpen = (cuisine) => {
    setSelectedCuisine(cuisine);
    setEditName(cuisine.name);
    setEditDescription(cuisine.description);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedCuisine(null);
    setEditName("");
    setEditDescription("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      // Send a request to update the cuisine with the given id
      await axios.put(`http://localhost:3000/api/cuisines/${selectedCuisine._id}`, {
        name: editName,
        description: editDescription,
      });

      // Update the state with the edited cuisine
      setCuisines((prevCuisines) => prevCuisines.map((cuisine) => (cuisine._id === selectedCuisine._id ? { ...cuisine, name: editName, description: editDescription } : cuisine)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing cuisine:", error.message);
      setError("Error editing cuisine");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the cuisine with the given id
      await axios.delete(`http://localhost:3000/api/cuisines/${id}`);

      // Remove the deleted cuisine from the state
      setCuisines((prevCuisines) => prevCuisines.filter((cuisine) => cuisine._id !== id));
    } catch (error) {
      console.error("Error deleting cuisine:", error.message);
      setError("Error deleting cuisine");
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
      <h3>List of Cuisines</h3>
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
            {cuisines.map((cuisine) => (
              <TableRow key={cuisine._id}>
                <TableCell>{cuisine.name}</TableCell>
                <TableCell>{cuisine.description}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(cuisine)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(cuisine._id)}>
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
        <DialogTitle>Edit Cuisine</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
          <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
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

export default CuisineList;
