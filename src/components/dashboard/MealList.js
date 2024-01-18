// export default MealList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/meals");
        setMeals(response.data);
      } catch (error) {
        console.error("Error fetching meals:", error.message);
        setError("Error fetching meals");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleEditOpen = (meal) => {
    setSelectedMeal(meal);
    setEditName(meal.name);
    setEditDescription(meal.description);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedMeal(null);
    setEditName("");
    setEditDescription("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      // Send a request to update the meal with the given id
      await axios.put(`http://localhost:3000/api/meals/${selectedMeal._id}`, {
        name: editName,
        description: editDescription,
      });

      // Update the state with the edited meal
      setMeals((prevMeals) => prevMeals.map((meal) => (meal._id === selectedMeal._id ? { ...meal, name: editName, description: editDescription } : meal)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing meal:", error.message);
      setError("Error editing meal");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the meal with the given id
      await axios.delete(`http://localhost:3000/api/meals/${id}`);

      // Remove the deleted meal from the state
      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error("Error deleting meal:", error.message);
      setError("Error deleting meal");
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
      <h3>List of Meals</h3>
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
            {meals.map((meal) => (
              <TableRow key={meal._id}>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.description}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(meal)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(meal._id)}>
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
        <DialogTitle>Edit Meal</DialogTitle>
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

export default MealList;
