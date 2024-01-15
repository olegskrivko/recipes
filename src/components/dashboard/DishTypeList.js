// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Button } from "@mui/material";

// const DishTypeList = () => {
//   const [dishTypes, setDishTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDishTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/dishTypes");
//         setDishTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching dish types:", error.message);
//         setError("Error fetching dish types");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDishTypes();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       // Send a request to delete the dish type with the given id
//       await axios.delete(`http://localhost:3000/api/dishTypes/${id}`);

//       // Remove the deleted dish type from the state
//       setDishTypes((prevDishTypes) => prevDishTypes.filter((dishType) => dishType._id !== id));
//     } catch (error) {
//       console.error("Error deleting dish type:", error.message);
//       setError("Error deleting dish type");
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
//       <h3>List of Dish Types</h3>
//       <ul>
//         {dishTypes.map((dishType) => (
//           <div key={dishType._id}>
//             <p>{dishType.name}</p>
//             <p>{dishType.description}</p>
//             <Button variant="outlined" color="error" onClick={() => handleDelete(dishType._id)}>
//               Delete
//             </Button>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// GOOD WITHOUT EDIT. but with delete
// export default DishTypeList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

// const DishTypeList = () => {
//   const [dishTypes, setDishTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDishTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/dishTypes");
//         setDishTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching dish types:", error.message);
//         setError("Error fetching dish types");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDishTypes();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       // Send a request to delete the dish type with the given id
//       await axios.delete(`http://localhost:3000/api/dishTypes/${id}`);

//       // Remove the deleted dish type from the state
//       setDishTypes((prevDishTypes) => prevDishTypes.filter((dishType) => dishType._id !== id));
//     } catch (error) {
//       console.error("Error deleting dish type:", error.message);
//       setError("Error deleting dish type");
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
//       <h3>List of Dish Types</h3>
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
//             {dishTypes.map((dishType) => (
//               <TableRow key={dishType._id}>
//                 <TableCell>{dishType.name}</TableCell>
//                 <TableCell>{dishType.description}</TableCell>
//                 <TableCell>
//                   <Button variant="outlined" color="error" onClick={() => handleDelete(dishType._id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };
// GOOD lAST ONE with edit and delete
// export default DishTypeList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DishTypeList = () => {
  const [dishTypes, setDishTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDishType, setSelectedDishType] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchDishTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dishTypes");
        setDishTypes(response.data);
      } catch (error) {
        console.error("Error fetching dish types:", error.message);
        setError("Error fetching dish types");
      } finally {
        setLoading(false);
      }
    };

    fetchDishTypes();
  }, []);

  const handleEditOpen = (dishType) => {
    setSelectedDishType(dishType);
    setEditName(dishType.name);
    setEditDescription(dishType.description);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedDishType(null);
    setEditName("");
    setEditDescription("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      // Send a request to update the dish type with the given id
      await axios.put(`http://localhost:3000/api/dishTypes/${selectedDishType._id}`, {
        name: editName,
        description: editDescription,
      });

      // Update the state with the edited dish type
      setDishTypes((prevDishTypes) => prevDishTypes.map((dishType) => (dishType._id === selectedDishType._id ? { ...dishType, name: editName, description: editDescription } : dishType)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing dish type:", error.message);
      setError("Error editing dish type");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the dish type with the given id
      await axios.delete(`http://localhost:3000/api/dishTypes/${id}`);

      // Remove the deleted dish type from the state
      setDishTypes((prevDishTypes) => prevDishTypes.filter((dishType) => dishType._id !== id));
    } catch (error) {
      console.error("Error deleting dish type:", error.message);
      setError("Error deleting dish type");
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
      <h3>List of Dish Types</h3>
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
            {dishTypes.map((dishType) => (
              <TableRow key={dishType._id}>
                <TableCell>{dishType.name}</TableCell>
                <TableCell>{dishType.description}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(dishType)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(dishType._id)}>
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
        <DialogTitle>Edit Dish Type</DialogTitle>
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

export default DishTypeList;
