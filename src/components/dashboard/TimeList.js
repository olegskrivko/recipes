// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const TimeList = () => {
//   const [times, setTimes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [editLabel, setEditLabel] = useState("");
//   const [editHours, setEditHours] = useState(0);
//   const [editMinutes, setEditMinutes] = useState(0);
//   const [editLabelError, setEditLabelError] = useState("");
//   const [editHoursError, setEditHoursError] = useState("");
//   const [editMinutesError, setEditMinutesError] = useState("");

//   useEffect(() => {
//     const fetchTimes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/times");
//         setTimes(response.data);
//       } catch (error) {
//         console.error("Error fetching times:", error.message);
//         setError("Error fetching times");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTimes();
//   }, []);

//   const handleEditOpen = (time) => {
//     setSelectedTime(time);
//     setEditLabel(time.label);
//     setEditHours(time.value.hours);
//     setEditMinutes(time.value.minutes);
//     setEditLabelError(""); // Clear previous errors
//     setEditHoursError("");
//     setEditMinutesError("");
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedTime(null);
//     setEditLabel("");
//     setEditHours(0);
//     setEditMinutes(0);
//     setEditLabelError("");
//     setEditHoursError("");
//     setEditMinutesError("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/times/${selectedTime._id}`, {
//         label: editLabel,
//         value: {
//           hours: editHours,
//           minutes: editMinutes,
//         },
//       });

//       setTimes((prevTimes) => prevTimes.map((time) => (time._id === selectedTime._id ? { ...time, label: editLabel, value: { hours: editHours, minutes: editMinutes } } : time)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing time:", error.message);
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path === "label") {
//             setEditLabelError(err.msg);
//           } else if (err.path === "value.hours") {
//             setEditHoursError(err.msg);
//           } else if (err.path === "value.minutes") {
//             setEditMinutesError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error editing time:", error.message);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/times/${id}`);
//       setTimes((prevTimes) => prevTimes.filter((time) => time._id !== id));
//     } catch (error) {
//       console.error("Error deleting time:", error.message);
//       setError("Error deleting time");
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
//       <h3>List of Times</h3>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Label</TableCell>
//               <TableCell>Hours</TableCell>
//               <TableCell>Minutes</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {times.map((time) => (
//               <TableRow key={time._id}>
//                 <TableCell>{time.label}</TableCell>
//                 <TableCell>{time.value.hours}</TableCell>
//                 <TableCell>{time.value.minutes}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(time)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(time._id)}>
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
//         <DialogTitle>Edit Time</DialogTitle>
//         <DialogContent>
//           <TextField label="Label" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editLabel} onChange={(e) => setEditLabel(e.target.value)} error={editLabelError !== null} helperText={editLabelError} />
//           <TextField label="Hours" variant="outlined" type="number" style={{ marginTop: "1rem" }} fullWidth value={editHours} onChange={(e) => setEditHours(e.target.value)} error={editHoursError !== null} helperText={editHoursError} />
//           <TextField label="Minutes" variant="outlined" type="number" style={{ marginTop: "1rem" }} fullWidth value={editMinutes} onChange={(e) => setEditMinutes(e.target.value)} error={editMinutesError !== null} helperText={editMinutesError} />
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

// export default TimeList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TimeList = () => {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNameError, setEditNameError] = useState("");

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/times");
        setTimes(response.data);
      } catch (error) {
        console.error("Error fetching cooking times:", error.message);
        setError("Error fetching cooking times");
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();
  }, []);

  const handleEditOpen = (time) => {
    setSelectedTime(time);
    setEditName(time.name);
    setEditNameError(""); // Clear previous errors
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedTime(null);
    setEditName("");
    setEditNameError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/times/${selectedTime._id}`, {
        name: editName,
      });

      setTimes((prevTimes) => prevTimes.map((time) => (time._id === selectedTime._id ? { ...time, name: editName } : time)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing cooking time:", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "name") {
            setEditNameError(err.msg);
          }
        });
      } else {
        console.error("Error editing cooking time:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/times/${id}`);
      setTimes((prevTimes) => prevTimes.filter((time) => time._id !== id));
    } catch (error) {
      console.error("Error deleting cooking time:", error.message);
      setError("Error deleting cooking time");
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
      <h3>List of Cooking Times</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {times.map((time) => (
              <TableRow key={time._id}>
                <TableCell>{time.name}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(time)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(time._id)}>
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
        <DialogTitle>Edit Cooking Time</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
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

export default TimeList;

// Preparation	0	0
// Cooking	0	0
// Marinating	0	0
// Resting	0	0
// Baking	0	0
// Chilling	0	0
// Grilling	0	0
// Roasting	0	0
// Simmering	0	0
// Steaming	0	0
// Fermenting	0	0
// Frying

// Total	0	0
