// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const IngredientCategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDescription, setEditDescription] = useState("");
//   const [editNameError, setEditNameError] = useState("");
//   const [editDescriptionError, setEditDescriptionError] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ingredient-categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error.message);
//         setError("Error fetching categories");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleEditOpen = (category) => {
//     setSelectedCategory(category);
//     setEditName(category.name);
//     setEditDescription(category.description);
//     setEditNameError(""); // Clear previous errors
//     setEditDescriptionError("");
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedCategory(null);
//     setEditName("");
//     setEditDescription("");
//     setEditNameError("");
//     setEditDescriptionError("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/ingredient-categories/${selectedCategory._id}`, {
//         name: editName,
//         description: editDescription,
//       });

//       setCategories((prevCategories) => prevCategories.map((category) => (category._id === selectedCategory._id ? { ...category, name: editName, description: editDescription } : category)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing category:", error.message);
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
//         console.error("Error editing category:", error.message);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/ingredient-categories/${id}`);
//       setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
//     } catch (error) {
//       console.error("Error deleting category:", error.message);
//       setError("Error deleting category");
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
//       <h3>List of Ingredient Categories</h3>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category._id}>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>{category.description}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(category)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(category._id)}>
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
//         <DialogTitle>Edit Ingredient Category</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
//           <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} error={editDescriptionError !== null} helperText={editDescriptionError} />
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

// export default IngredientCategoryList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const IngredientCategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDescription, setEditDescription] = useState("");
//   const [editNameError, setEditNameError] = useState("");
//   const [editDescriptionError, setEditDescriptionError] = useState("");
//   const [newCategory, setNewCategory] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ingredient-categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error.message);
//         setError("Error fetching categories");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleEditOpen = (category) => {
//     setSelectedCategory(category);
//     setEditName(category.name);
//     setEditDescription(category.description);
//     setEditNameError(""); // Clear previous errors
//     setEditDescriptionError("");
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedCategory(null);
//     setEditName("");
//     setEditDescription("");
//     setEditNameError("");
//     setEditDescriptionError("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/ingredient-categories/${selectedCategory._id}`, {
//         name: editName,
//         description: editDescription,
//       });

//       setCategories((prevCategories) => prevCategories.map((category) => (category._id === selectedCategory._id ? { ...category, name: editName, description: editDescription } : category)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing category:", error.message);
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
//         console.error("Error editing category:", error.message);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/ingredient-categories/${id}`);
//       setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
//     } catch (error) {
//       console.error("Error deleting category:", error.message);
//       setError("Error deleting category");
//     }
//   };

//   const handleNewCategoryChange = (event) => {
//     setNewCategory(event.target.value);
//   };

//   const handleNewCategorySubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/ingredient-categories", {
//         name: newCategory,
//         description: "", // You can adjust this as needed
//       });

//       setCategories((prevCategories) => [...prevCategories, response.data]);
//       setNewCategory("");
//     } catch (error) {
//       console.error("Error creating category:", error.message);
//       // Handle error as needed
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
//       <h3>List of Ingredient Categories</h3>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category._id}>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>{category.description}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(category)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(category._id)}>
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
//         <DialogTitle>Edit Ingredient Category</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
//           <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} error={editDescriptionError !== null} helperText={editDescriptionError} />
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

//       {/* New Category Input */}
//       {/* <div style={{ marginTop: "2rem" }}>
//         <FormControl variant="outlined" fullWidth>
//           <InputLabel id="newCategoryLabel">New Category</InputLabel>
//           <Select labelId="newCategoryLabel" id="newCategory" value={newCategory} onChange={handleNewCategoryChange} label="New Category">
//             {categories.map((category) => (
//               <MenuItem key={category._id} value={category.name}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button variant="contained" color="primary" onClick={handleNewCategorySubmit} style={{ marginTop: "1rem" }}>
//           Create New Category
//         </Button>
//       </div> */}
//     </div>
//   );
// };

// export default IngredientCategoryList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const IngredientCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editParentCategory, setEditParentCategory] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editDescriptionError, setEditDescriptionError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredient-categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEditOpen = (category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setEditParentCategory(category.parentCategory || ""); // If null, set to empty string
    setEditNameError(""); // Clear previous errors
    setEditDescriptionError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedCategory(null);
    setEditName("");
    setEditDescription("");
    setEditParentCategory("");
    setEditNameError("");
    setEditDescriptionError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/ingredient-categories/${selectedCategory._id}`, {
        name: editName,
        description: editDescription,
        parentCategory: editParentCategory || null, // Convert empty string back to null
      });

      setCategories((prevCategories) => prevCategories.map((category) => (category._id === selectedCategory._id ? { ...category, name: editName, description: editDescription, parentCategory: editParentCategory || null } : category)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing category:", error.message);
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
        console.error("Error editing category:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/ingredient-categories/${id}`);
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.message);
      setError("Error deleting category");
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
      <h3>List of Ingredient Categories</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.parentCategory ? category.parentCategory.name : "None"}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(category._id)}>
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
        <DialogTitle>Edit Ingredient Category</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
          <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} error={editDescriptionError !== null} helperText={editDescriptionError} />
          <TextField label="Parent Category" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editParentCategory} onChange={(e) => setEditParentCategory(e.target.value)} />
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

export default IngredientCategoryList;
