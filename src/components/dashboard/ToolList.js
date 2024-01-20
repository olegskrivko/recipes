// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ToolList = () => {
//   const [tools, setTools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedTool, setSelectedTool] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editCategory, setEditCategory] = useState("");
//   const [editPurchaseLink, setEditPurchaseLink] = useState("");
//   const [editNameError, setEditNameError] = useState("");
//   const [editCategoryError, setEditCategoryError] = useState("");
//   const [editPurchaseLinkError, setEditPurchaseLinkError] = useState("");

//   useEffect(() => {
//     const fetchTools = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/tools");
//         setTools(response.data);
//       } catch (error) {
//         console.error("Error fetching tools:", error.message);
//         setError("Error fetching tools");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTools();
//   }, []);

//   const handleEditOpen = (tool) => {
//     setSelectedTool(tool);
//     setEditName(tool.name);
//     setEditCategory(tool.category);
//     setEditPurchaseLink(tool.purchaseLink);
//     setEditNameError(""); // Clear previous errors
//     setEditCategoryError("");
//     setEditPurchaseLinkError("");
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setSelectedTool(null);
//     setEditName("");
//     setEditCategory("");
//     setEditPurchaseLink("");
//     setEditNameError("");
//     setEditCategoryError("");
//     setEditPurchaseLinkError("");
//     setEditDialogOpen(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/tools/${selectedTool._id}`, {
//         name: editName,
//         category: editCategory,
//         purchaseLink: editPurchaseLink,
//       });

//       setTools((prevTools) => prevTools.map((tool) => (tool._id === selectedTool._id ? { ...tool, name: editName, category: editCategory, purchaseLink: editPurchaseLink } : tool)));

//       handleEditClose();
//     } catch (error) {
//       console.error("Error editing tool:", error.message);
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path === "name") {
//             setEditNameError(err.msg);
//           } else if (err.path === "category") {
//             setEditCategoryError(err.msg);
//           } else if (err.path === "purchaseLink") {
//             setEditPurchaseLinkError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error editing tool:", error.message);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/tools/${id}`);
//       setTools((prevTools) => prevTools.filter((tool) => tool._id !== id));
//     } catch (error) {
//       console.error("Error deleting tool:", error.message);
//       setError("Error deleting tool");
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
//       <h3>List of Tools</h3>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Purchase Link</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tools.map((tool) => (
//               <TableRow key={tool._id}>
//                 <TableCell>{tool.name}</TableCell>
//                 <TableCell>{tool.category}</TableCell>
//                 <TableCell>{tool.purchaseLink}</TableCell>
//                 <TableCell>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <IconButton size="small" color="primary" onClick={() => handleEditOpen(tool)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton size="small" color="error" onClick={() => handleDelete(tool._id)}>
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
//         <DialogTitle>Edit Tool</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
//           <TextField label="Category" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editCategory} onChange={(e) => setEditCategory(e.target.value)} error={editCategoryError !== null} helperText={editCategoryError} />
//           <TextField label="Purchase Link" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editPurchaseLink} onChange={(e) => setEditPurchaseLink(e.target.value)} error={editPurchaseLinkError !== null} helperText={editPurchaseLinkError} />
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

// export default ToolList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPurchaseLink, setEditPurchaseLink] = useState("");
  const [editShopName, setEditShopName] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editCategoryError, setEditCategoryError] = useState("");
  const [editPurchaseLinkError, setEditPurchaseLinkError] = useState("");
  const [editShopNameError, setEditShopNameError] = useState("");

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tools");
        setTools(response.data);
      } catch (error) {
        console.error("Error fetching tools:", error.message);
        setError("Error fetching tools");
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleEditOpen = (tool) => {
    setSelectedTool(tool);
    setEditName(tool.name);
    setEditCategory(tool.category);
    setEditPurchaseLink(tool.purchaseLink);
    setEditShopName(tool.shopName);
    setEditNameError(""); // Clear previous errors
    setEditCategoryError("");
    setEditPurchaseLinkError("");
    setEditShopNameError("");
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedTool(null);
    setEditName("");
    setEditCategory("");
    setEditPurchaseLink("");
    setEditShopName("");
    setEditNameError("");
    setEditCategoryError("");
    setEditPurchaseLinkError("");
    setEditShopNameError("");
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tools/${selectedTool._id}`, {
        name: editName,
        category: editCategory,
        purchaseLink: editPurchaseLink,
        shopName: editShopName,
      });

      setTools((prevTools) => prevTools.map((tool) => (tool._id === selectedTool._id ? { ...tool, name: editName, category: editCategory, purchaseLink: editPurchaseLink, shopName: editShopName } : tool)));

      handleEditClose();
    } catch (error) {
      console.error("Error editing tool:", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "name") {
            setEditNameError(err.msg);
          } else if (err.path === "category") {
            setEditCategoryError(err.msg);
          } else if (err.path === "purchaseLink") {
            setEditPurchaseLinkError(err.msg);
          } else if (err.path === "shopName") {
            setEditShopNameError(err.msg);
          }
        });
      } else {
        console.error("Error editing tool:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tools/${id}`);
      setTools((prevTools) => prevTools.filter((tool) => tool._id !== id));
    } catch (error) {
      console.error("Error deleting tool:", error.message);
      setError("Error deleting tool");
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
      <h3>List of Tools</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Purchase Link</TableCell>
              <TableCell>Shop Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool._id}>
                <TableCell>{tool.name}</TableCell>
                <TableCell>{tool.category}</TableCell>
                <TableCell style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.purchaseLink}</TableCell>
                <TableCell>{tool.shopName}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditOpen(tool)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(tool._id)}>
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
        <DialogTitle>Edit Tool</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} error={editNameError !== null} helperText={editNameError} />
          <TextField label="Category" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editCategory} onChange={(e) => setEditCategory(e.target.value)} error={editCategoryError !== null} helperText={editCategoryError} />
          <TextField label="Purchase Link" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editPurchaseLink} onChange={(e) => setEditPurchaseLink(e.target.value)} error={editPurchaseLinkError !== null} helperText={editPurchaseLinkError} />
          <TextField label="Shop Name" variant="outlined" style={{ marginTop: "1rem" }} fullWidth value={editShopName} onChange={(e) => setEditShopName(e.target.value)} error={editShopNameError !== null} helperText={editShopNameError} />
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

export default ToolList;
