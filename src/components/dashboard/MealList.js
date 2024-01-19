import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editDescriptionError, setEditDescriptionError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/meals");
        setMeals(response.data);
      } catch (error) {
        console.error("Error fetching meals:", error.message);
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
    setEditNameError(""); // Clear previous errors
    setEditDescriptionError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedMeal(null);
    setEditName("");
    setEditDescription("");
    setEditNameError("");
    setEditDescriptionError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/meals/${selectedMeal._id}`, {
        name: editName,
        description: editDescription,
      });

      setMeals((prevMeals) => prevMeals.map((meal) => (meal._id === selectedMeal._id ? { ...meal, name: editName, description: editDescription } : meal)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing meal:", error.message);
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
        console.error("Error editing meal:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/meals/${id}`);
      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error("Error deleting meal:", error.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
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
          {/* Display error messages */}

          {/* {editNameError && <div style={{ color: "red", marginBottom: "0.5rem" }}>{editNameError}</div>} */}
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />

          {/* {editDescriptionError && <div style={{ color: "red", marginTop: "1rem" }}>{editDescriptionError}</div>} */}
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

export default MealList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const MealList = () => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDescription, setEditDescription] = useState("");
//   const [editErrors, setEditErrors] = useState([]);

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/meals");
//         setMeals(response.data);
//       } catch (error) {
//         console.error("Error fetching meals:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeals();
//   }, []);

//   const handleEditOpen = (meal) => {
//     setSelectedMeal(meal);
//     setEditName(meal.name);
//     setEditDescription(meal.description);
//     setEditErrors([]); // Clear previous errors
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedMeal(null);
//     setEditName("");
//     setEditDescription("");
//     setEditErrors([]);
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/meals/${selectedMeal._id}`, {
//         name: editName,
//         description: editDescription,
//       });

//       setMeals((prevMeals) => prevMeals.map((meal) => (meal._id === selectedMeal._id ? { ...meal, name: editName, description: editDescription } : meal)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing meal:", error.message);
//       if (error.response && error.response.data && error.response.data.errors) {
//         setEditErrors(error.response.data.errors.map((err) => err.msg));
//       } else {
//         setEditErrors(["Error editing meal"]);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/meals/${id}`);
//       setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
//     } catch (error) {
//       console.error("Error deleting meal:", error.message);
//       setEditErrors(["Error deleting meal"]);
//     }
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <div>
//       <h3>List of Meals</h3>
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
//             {meals.map((meal) => (
//               <TableRow key={meal._id}>
//                 <TableCell>{meal.name}</TableCell>
//                 <TableCell>{meal.description}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(meal)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(meal._id)}>
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
//         <DialogTitle>Edit Meal</DialogTitle>
//         <DialogContent>
//           {/* Display error messages */}
//           {editErrors.length > 0 &&
//             editErrors.map((error, index) => (
//               <div key={index} style={{ color: "red", marginBottom: "0.5rem" }}>
//                 {error}
//               </div>
//             ))}

//           {/* Input fields for editing */}
//           <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
//           <TextField label="Description" multiline rows={3} variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
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

// export default MealList;

//export default MealList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// // function getUserLanguage() {
// //   // Use navigator.language to get the user's preferred language
// //   const userLanguage = navigator.language || navigator.userLanguage || "en";

// //   // Return the language code (e.g., 'en', 'lv', 'ru')
// //   return userLanguage.substr(0, 2).toLowerCase();
// // }
// // const userLanguage = getUserLanguage();

// const MealList = () => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDescription, setEditDescription] = useState("");

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/meals");
//         setMeals(response.data);
//       } catch (error) {
//         console.error("Error fetching meals:", error.message);
//         setError("Error fetching meals");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeals();
//   }, []);

//   const handleEditOpen = (meal) => {
//     setSelectedMeal(meal);
//     setEditName(meal.name);
//     setEditDescription(meal.description);
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedMeal(null);
//     setEditName("");
//     setEditDescription("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       // Send a request to update the meal with the given id
//       await axios.put(`http://localhost:3000/api/meals/${selectedMeal._id}`, {
//         name: editName,
//         description: editDescription,
//       });

//       // Update the state with the edited meal
//       setMeals((prevMeals) => prevMeals.map((meal) => (meal._id === selectedMeal._id ? { ...meal, name: editName, description: editDescription } : meal)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing meal:", error.message);
//       setError("Error editing meal");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Send a request to delete the meal with the given id
//       await axios.delete(`http://localhost:3000/api/meals/${id}`);

//       // Remove the deleted meal from the state
//       setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
//     } catch (error) {
//       console.error("Error deleting meal:", error.message);
//       setError("Error deleting meal");
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
//       <h3>List of Meals</h3>
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
//             {meals.map((meal) => (
//               <TableRow key={meal._id}>
//                 {/* <TableCell>{meal.name[userLanguage]}</TableCell> */}
//                 <TableCell>{meal.name}</TableCell>
//                 <TableCell>{meal.description}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(meal)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(meal._id)}>
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
//         <DialogTitle>Edit Meal</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
//           <TextField label="Description" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
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

// export default MealList;

// // MULTILANGUAGE
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// function getUserLanguage() {
//   // Use navigator.language to get the user's preferred language
//   const userLanguage = "lv" || navigator.language || navigator.userLanguage;

//   // Return the language code (e.g., 'en', 'lv', 'ru')
//   return userLanguage.substr(0, 2).toLowerCase();
// }

// const userLanguage = getUserLanguage();

// const MealList = () => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [editName, setEditName] = useState({});
//   const [editDescription, setEditDescription] = useState({});

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/meals");
//         setMeals(response.data);
//       } catch (error) {
//         console.error("Error fetching meals:", error.message);
//         setError("Error fetching meals");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeals();
//   }, []);

//   const handleEditOpen = (meal) => {
//     setSelectedMeal(meal);

//     // Create a new object for editing to avoid modifying the state directly
//     const editedMeal = {
//       name: {},
//       description: {},
//     };

//     // Set values for each language
//     Object.keys(meal.name).forEach((lang) => {
//       // Exclude _id from being added to the editedMeal
//       if (lang !== "_id") {
//         editedMeal.name[lang] = meal.name[lang];
//       }
//     });

//     Object.keys(meal.description).forEach((lang) => {
//       // Exclude _id from being added to the editedMeal
//       if (lang !== "_id") {
//         editedMeal.description[lang] = meal.description[lang];
//       }
//     });

//     setEditName(editedMeal.name);
//     setEditDescription(editedMeal.description);
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedMeal(null);
//     setEditName({});
//     setEditDescription({});
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       // Create the updated meal object with nested name and description objects
//       const updatedMeal = {
//         name: {},
//         description: {},
//       };

//       // Set values for each language
//       Object.keys(editName).forEach((lang) => {
//         // Exclude _id from being added to the updatedMeal
//         if (lang !== "_id") {
//           updatedMeal.name[lang] = editName[lang];
//         }
//       });

//       Object.keys(editDescription).forEach((lang) => {
//         // Exclude _id from being added to the updatedMeal
//         if (lang !== "_id") {
//           updatedMeal.description[lang] = editDescription[lang];
//         }
//       });

//       // Send a request to update the meal with the given id
//       await axios.put(`http://localhost:3000/api/meals/${selectedMeal._id}`, {
//         name: updatedMeal.name,
//         description: updatedMeal.description,
//       });

//       // Update the state with the edited meal
//       setMeals((prevMeals) => prevMeals.map((meal) => (meal._id === selectedMeal._id ? { ...meal, name: editName, description: editDescription } : meal)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing meal:", error.message);
//       setError("Error editing meal");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Send a request to delete the meal with the given id
//       await axios.delete(`http://localhost:3000/api/meals/${id}`);

//       // Remove the deleted meal from the state
//       setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
//     } catch (error) {
//       console.error("Error deleting meal:", error.message);
//       setError("Error deleting meal");
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
//       <h3>List of Meals</h3>
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
//             {meals.map((meal) => (
//               <TableRow key={meal._id}>
//                 <TableCell>{meal.name[userLanguage]}</TableCell>
//                 <TableCell>{meal.description[userLanguage]}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(meal)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(meal._id)}>
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
//         <DialogTitle>Edit Meal</DialogTitle>
//         <DialogContent>
//           {Object.keys(editName).map((lang) => (
//             <TextField key={`edit-name-${lang}`} label={`Name (${lang.toUpperCase()})`} variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName[lang] || ""} onChange={(e) => setEditName({ ...editName, [lang]: e.target.value })} />
//           ))}
//           {Object.keys(editDescription).map((lang) => (
//             <TextField key={`edit-description-${lang}`} label={`Description (${lang.toUpperCase()})`} variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editDescription[lang] || ""} onChange={(e) => setEditDescription({ ...editDescription, [lang]: e.target.value })} />
//           ))}
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
// export default MealList;
