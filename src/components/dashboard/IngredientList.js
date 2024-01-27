// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const IngredientList = () => {
//   const [ingredients, setIngredients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedIngredient, setSelectedIngredient] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDescription, setEditDescription] = useState("");
//   const [editCalories, setEditCalories] = useState(0);
//   const [editProtein, setEditProtein] = useState(0);
//   const [editCarbohydrates, setEditCarbohydrates] = useState(0);
//   const [editFat, setEditFat] = useState(0);
//   const [editAmount, setEditAmount] = useState(0);
//   const [editUnit, setEditUnit] = useState("");
//   const [editCategory, setEditCategory] = useState("");
//   const [editNameError, setEditNameError] = useState("");
//   const [editDescriptionError, setEditDescriptionError] = useState("");

//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ingredients");
//         setIngredients(response.data);
//       } catch (error) {
//         console.error("Error fetching ingredients:", error.message);
//         setError("Error fetching ingredients");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIngredients();
//   }, []);

//   const handleEditOpen = (ingredient) => {
//     setSelectedIngredient(ingredient);
//     setEditName(ingredient.name);
//     setEditDescription(ingredient.description);
//     setEditCalories(ingredient.calories);
//     setEditProtein(ingredient.protein);
//     setEditCarbohydrates(ingredient.carbohydrates);
//     setEditFat(ingredient.fat);
//     setEditAmount(ingredient.amount);
//     setEditUnit(ingredient.unit);
//     setEditCategory(ingredient.category);
//     setEditNameError(""); // Clear previous errors
//     setEditDescriptionError("");
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedIngredient(null);
//     setEditName("");
//     setEditDescription("");
//     setEditCalories(0);
//     setEditProtein(0);
//     setEditCarbohydrates(0);
//     setEditFat(0);
//     setEditAmount(0);
//     setEditUnit("");
//     setEditCategory("");
//     setEditNameError("");
//     setEditDescriptionError("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/ingredients/${selectedIngredient._id}`, {
//         name: editName,
//         description: editDescription,
//         calories: editCalories,
//         protein: editProtein,
//         carbohydrates: editCarbohydrates,
//         fat: editFat,
//         amount: editAmount,
//         unit: editUnit,
//         category: editCategory,
//       });

//       setIngredients((prevIngredients) =>
//         prevIngredients.map((ingredient) =>
//           ingredient._id === selectedIngredient._id
//             ? {
//                 ...ingredient,
//                 name: editName,
//                 description: editDescription,
//                 calories: editCalories,
//                 protein: editProtein,
//                 carbohydrates: editCarbohydrates,
//                 fat: editFat,
//                 amount: editAmount,
//                 unit: editUnit,
//                 category: editCategory,
//               }
//             : ingredient
//         )
//       );

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing ingredient:", error.message);
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path === "name") {
//             setEditNameError(err.msg);
//           } else if (err.path === "description") {
//             setEditDescriptionError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error editing ingredient:", error.message);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/ingredients/${id}`);
//       setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient._id !== id));
//     } catch (error) {
//       console.error("Error deleting ingredient:", error.message);
//       setError("Error deleting ingredient");
//     }
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h3>List of Ingredients</h3>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Calories</TableCell>
//               <TableCell>Protein (g)</TableCell>
//               <TableCell>Carbohydrates (g)</TableCell>
//               <TableCell>Fat (g)</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Unit</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ingredients.map((ingredient) => (
//               <TableRow key={ingredient._id}>
//                 <TableCell>{ingredient.name}</TableCell>
//                 <TableCell>{ingredient.description}</TableCell>
//                 <TableCell>{ingredient.calories}</TableCell>
//                 <TableCell>{ingredient.protein}</TableCell>
//                 <TableCell>{ingredient.carbohydrates}</TableCell>
//                 <TableCell>{ingredient.fat}</TableCell>
//                 <TableCell>{ingredient.amount}</TableCell>
//                 <TableCell>{ingredient.unit}</TableCell>
//                 <TableCell>{ingredient.category}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(ingredient)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(ingredient._id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Edit Dialog */}
//       <Dialog open={editDialogOpen} onClose={handleEditClose} PaperProps={{ style: { maxHeight: "80vh" } }}>
//         <DialogTitle>Edit Ingredient</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
//           <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} error={editDescriptionError !== null} helperText={editDescriptionError} />
//           <TextField label="Calories" type="number" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editCalories} onChange={(e) => setEditCalories(e.target.value)} />
//           <TextField label="Protein (g)" type="number" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editProtein} onChange={(e) => setEditProtein(e.target.value)} />
//           <TextField label="Carbohydrates (g)" type="number" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editCarbohydrates} onChange={(e) => setEditCarbohydrates(e.target.value)} />
//           <TextField label="Fat (g)" type="number" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editFat} onChange={(e) => setEditFat(e.target.value)} />
//           <TextField label="Amount" type="number" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
//           <TextField label="Unit" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editUnit} onChange={(e) => setEditUnit(e.target.value)} />
//           <TextField label="Category" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default IngredientList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCalories, setEditCalories] = useState(0);
  const [editProtein, setEditProtein] = useState(0);
  const [editCarbohydrates, setEditCarbohydrates] = useState(0);
  const [editFat, setEditFat] = useState(0);
  const [editAmount, setEditAmount] = useState(0);
  const [editUnit, setEditUnit] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editDescriptionError, setEditDescriptionError] = useState("");

  // New state for ingredient list
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredients");
        setIngredients(response.data);
        // Set ingredientList state
        setIngredientList(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error.message);
        setError("Error fetching ingredients");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  // Function to update ingredient list state
  const updateIngredientListState = (updatedIngredient) => {
    setIngredientList((prevIngredients) => prevIngredients.map((ingredient) => (ingredient._id === updatedIngredient._id ? { ...updatedIngredient } : ingredient)));
  };

  const handleEditOpen = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditName(ingredient.name);
    setEditDescription(ingredient.description);
    setEditCalories(ingredient.calories);
    setEditProtein(ingredient.protein);
    setEditCarbohydrates(ingredient.carbohydrates);
    setEditFat(ingredient.fat);
    setEditAmount(ingredient.amount);
    setEditUnit(ingredient.unit);
    setEditCategory(ingredient.category);
    setEditNameError(""); // Clear previous errors
    setEditDescriptionError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedIngredient(null);
    setEditName("");
    setEditDescription("");
    setEditCalories(0);
    setEditProtein(0);
    setEditCarbohydrates(0);
    setEditFat(0);
    setEditAmount(0);
    setEditUnit("");
    setEditCategory("");
    setEditNameError("");
    setEditDescriptionError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/ingredients/${selectedIngredient._id}`, {
        name: editName,
        description: editDescription,
        calories: editCalories,
        protein: editProtein,
        carbohydrates: editCarbohydrates,
        fat: editFat,
        amount: editAmount,
        unit: editUnit,
        category: editCategory,
      });

      // Update ingredient list state
      updateIngredientListState(response.data);

      handleEditClose();
    } catch (error) {
      console.error("Error editing ingredient:", error.message);
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
        console.error("Error editing ingredient:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/ingredients/${id}`);
      // Update ingredient list state
      setIngredientList((prevIngredients) => prevIngredients.filter((ingredient) => ingredient._id !== id));
    } catch (error) {
      console.error("Error deleting ingredient:", error.message);
      setError("Error deleting ingredient");
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
      <h3>List of Ingredients</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Protein (g)</TableCell>
              <TableCell>Carbohydrates (g)</TableCell>
              <TableCell>Fat (g)</TableCell>
              <TableCell>Sugar (g)</TableCell> {/* Added Sugar column header */}
              <TableCell>Fiber (g)</TableCell> {/* Added Fiber column header */}
              <TableCell>Amount</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient._id}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.description}</TableCell>
                <TableCell>{ingredient.calories}</TableCell>
                <TableCell>{ingredient.protein}</TableCell>
                <TableCell>{ingredient.carbohydrates}</TableCell>
                <TableCell>{ingredient.fat}</TableCell>
                <TableCell>{ingredient.sugar}</TableCell> {/* Display Sugar value */}
                <TableCell>{ingredient.fiber}</TableCell> {/* Display Fiber value */}
                <TableCell>{ingredient.amount}</TableCell>
                <TableCell>{ingredient.unit}</TableCell>
                <TableCell>{ingredient.category}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(ingredient)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(ingredient._id)}>
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
        <DialogTitle>Edit Ingredient</DialogTitle>
        <DialogContent>
          {/* ... (existing fields) */}
          <TextField label="Unit" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editUnit} onChange={(e) => setEditUnit(e.target.value)} />
          <TextField label="Category" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
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

export default IngredientList;
