import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OccasionList = () => {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editDescriptionError, setEditDescriptionError] = useState("");

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/occasions");
        setOccasions(response.data);
      } catch (error) {
        console.error("Error fetching occasions:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOccasions();
  }, []);

  const handleEditOpen = (occasion) => {
    setSelectedOccasion(occasion);
    setEditName(occasion.name);
    setEditDescription(occasion.description);
    setEditNameError(""); // Clear previous errors
    setEditDescriptionError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedOccasion(null);
    setEditName("");
    setEditDescription("");
    setEditNameError("");
    setEditDescriptionError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/occasions/${selectedOccasion._id}`, {
        name: editName,
        description: editDescription,
      });

      setOccasions((prevOccasions) => prevOccasions.map((occasion) => (occasion._id === selectedOccasion._id ? { ...occasion, name: editName, description: editDescription } : occasion)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing occasion:", error.message);
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
        console.error("Error editing occasion:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/occasions/${id}`);
      setOccasions((prevOccasions) => prevOccasions.filter((occasion) => occasion._id !== id));
    } catch (error) {
      console.error("Error deleting occasion:", error.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h3>List of Occasions</h3>
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
            {occasions.map((occasion) => (
              <TableRow key={occasion._id}>
                <TableCell>{occasion.name}</TableCell>
                <TableCell>{occasion.description}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(occasion)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(occasion._id)}>
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
        <DialogTitle>Edit Occasion</DialogTitle>
        <DialogContent>
          {/* Display error messages */}
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

export default OccasionList;

// // export default OccasionList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const OccasionList = () => {
//   const [occasions, setOccasions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedOccasion, setSelectedOccasion] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDescription, setEditDescription] = useState("");

//   useEffect(() => {
//     const fetchOccasions = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/occasions");
//         setOccasions(response.data);
//       } catch (error) {
//         console.error("Error fetching occasions:", error.message);
//         setError("Error fetching occasions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOccasions();
//   }, []);

//   const handleEditOpen = (occasion) => {
//     setSelectedOccasion(occasion);
//     setEditName(occasion.name);
//     setEditDescription(occasion.description);
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedOccasion(null);
//     setEditName("");
//     setEditDescription("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       // Send a request to update the occasion with the given id
//       await axios.put(`http://localhost:3000/api/occasions/${selectedOccasion._id}`, {
//         name: editName,
//         description: editDescription,
//       });

//       // Update the state with the edited occasion
//       setOccasions((prevOccasions) => prevOccasions.map((occasion) => (occasion._id === selectedOccasion._id ? { ...occasion, name: editName, description: editDescription } : occasion)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing occasion:", error.message);
//       setError("Error editing occasion");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Send a request to delete the occasion with the given id
//       await axios.delete(`http://localhost:3000/api/occasions/${id}`);

//       // Remove the deleted occasion from the state
//       setOccasions((prevOccasions) => prevOccasions.filter((occasion) => occasion._id !== id));
//     } catch (error) {
//       console.error("Error deleting occasion:", error.message);
//       setError("Error deleting occasion");
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
//       <h3>List of Occasions</h3>
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
//             {occasions.map((occasion) => (
//               <TableRow key={occasion._id}>
//                 <TableCell>{occasion.name}</TableCell>
//                 <TableCell>{occasion.description}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(occasion)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(occasion._id)}>
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
//         <DialogTitle>Edit Occasion</DialogTitle>
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

// export default OccasionList;
