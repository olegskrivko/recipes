// // IngredientCategoryForm.js
// import React, { useState, useEffect } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const IngredientCategoryForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredient-categories", {
//         name,
//         description,
//       });

//       console.log("Ingredient category created:", response.data);

//       setSuccessMessage("Ingredient category created successfully!");
//       setName("");
//       setDescription("");
//       setErrors({});
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         const errorObject = {};
//         serverErrors.forEach((err) => {
//           errorObject[err.path] = err.msg;
//         });
//         setErrors(errorObject);
//       } else {
//         console.error("Error creating ingredient category:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSuccessMessage = () => {
//     setSuccessMessage(null);
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit}>
//         <TextField label="Category Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
//         <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => handleFieldChange("description", e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient Category"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientCategoryForm;

// import React, { useState, useEffect } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const IngredientCategoryForm = () => {
//   const [name, setName] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [subcategoryName, setSubcategoryName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "subcategoryName":
//         setSubcategoryName(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const addSubcategory = () => {
//     if (subcategoryName.trim() !== "") {
//       setSubcategories((prevSubcategories) => [...prevSubcategories, { name: subcategoryName }]);
//       setSubcategoryName("");
//     }
//   };

//   const removeSubcategory = (index) => {
//     setSubcategories((prevSubcategories) => prevSubcategories.filter((_, i) => i !== index));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:3000/api/ingredient-categories", {
//         name,
//         subcategories,
//         categoryName: name, // Assuming you want to associate subcategories with a category
//       });

//       console.log("Ingredient category created:", response.data);

//       setSuccessMessage("Ingredient category created successfully!");
//       setName("");
//       setSubcategories([]);
//       setSubcategoryName("");
//       setErrors({});
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         const errorObject = {};
//         serverErrors.forEach((err) => {
//           errorObject[err.path] = err.msg;
//         });
//         setErrors(errorObject);
//       } else {
//         console.error("Error creating ingredient category:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSuccessMessage = () => {
//     setSuccessMessage(null);
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit}>
//         <TextField label="Category Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />

//         {subcategories.map((subcategory, index) => (
//           <div key={index}>
//             <TextField label={`Subcategory ${index + 1}`} variant="outlined" fullWidth value={subcategory.name} disabled margin="normal" />
//             <Button type="button" variant="outlined" color="secondary" onClick={() => removeSubcategory(index)}>
//               Remove Subcategory
//             </Button>
//           </div>
//         ))}

//         <TextField label="Subcategory Name" variant="outlined" fullWidth value={subcategoryName} onChange={(e) => handleFieldChange("subcategoryName", e.target.value)} margin="normal" />
//         <Button type="button" variant="outlined" color="primary" onClick={addSubcategory}>
//           Add Subcategory
//         </Button>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient Category"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientCategoryForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const IngredientCategoryForm = () => {
//   const [name, setName] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [subcategoryName, setSubcategoryName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "subcategoryName":
//         setSubcategoryName(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const addSubcategory = () => {
//     const trimmedSubcategoryName = subcategoryName.trim();
//     if (trimmedSubcategoryName !== "") {
//       setSubcategories((prevSubcategories) => [...prevSubcategories, { name: trimmedSubcategoryName }]);
//       setSubcategoryName("");
//     }
//   };

//   const removeSubcategory = (index) => {
//     setSubcategories((prevSubcategories) => prevSubcategories.filter((_, i) => i !== index));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const requestData = {
//         name,
//         subcategories: subcategories.map((subcategory) => ({ subName: subcategory.name })),
//       };

//       if (subcategories.length > 0) {
//         // If there are subcategories, assume you want to associate them with an existing category
//         requestData.categoryName = name; // Pass the category name to associate subcategories
//       }

//       const response = await axios.post("http://localhost:3000/api/ingredient-categories", requestData);

//       console.log("Ingredient category created:", response.data);

//       setSuccessMessage("Ingredient category created successfully!");
//       setName("");
//       setSubcategories([]);
//       setSubcategoryName("");
//       setErrors({});
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         const errorObject = {};
//         serverErrors.forEach((err) => {
//           errorObject[err.path] = err.msg;
//         });
//         setErrors(errorObject);
//       } else {
//         console.error("Error creating ingredient category:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSuccessMessage = () => {
//     setSuccessMessage(null);
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit}>
//         <TextField label="Category Name" variant="outlined" fullWidth value={name} onChange={(e) => handleFieldChange("name", e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />

//         {subcategories.map((subcategory, index) => (
//           <div key={index}>
//             <TextField label={`Subcategory ${index + 1}`} variant="outlined" fullWidth value={subcategory.name} disabled margin="normal" />
//             <Button type="button" variant="outlined" color="secondary" onClick={() => removeSubcategory(index)}>
//               Remove Subcategory
//             </Button>
//           </div>
//         ))}

//         <TextField label="Subcategory Name" variant="outlined" fullWidth value={subcategoryName} onChange={(e) => handleFieldChange("subcategoryName", e.target.value)} margin="normal" />
//         <Button type="button" variant="outlined" color="primary" onClick={addSubcategory}>
//           Add Subcategory
//         </Button>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient Category"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientCategoryForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
// import axios from "axios";

// const IngredientCategoryForm = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [subcategoryName, setSubcategoryName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const handleFieldChange = (field, value) => {
//     switch (field) {
//       case "categoryName":
//         setCategoryName(value);
//         break;
//       case "subcategoryName":
//         setSubcategoryName(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const addSubcategory = () => {
//     if (subcategoryName.trim() !== "") {
//       setSubcategories((prevSubcategories) => [...prevSubcategories, { subcategoryName: subcategoryName.trim() }]);
//       setSubcategoryName("");
//     }
//   };

//   const removeSubcategory = (index) => {
//     setSubcategories((prevSubcategories) => prevSubcategories.filter((_, i) => i !== index));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       const requestData = {
//         categoryName,
//         subcategories,
//       };

//       const response = await axios.post("http://localhost:3000/api/ingredient-categories", requestData);

//       console.log("Ingredient category created:", response.data);

//       setSuccessMessage("Ingredient category created successfully!");
//       setCategoryName("");
//       setSubcategories([]);
//       setSubcategoryName("");
//     } catch (error) {
//       // Handle errors
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSuccessMessage = () => {
//     setSuccessMessage(null);
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit}>
//         <TextField label="Category Name" variant="outlined" fullWidth value={categoryName} onChange={(e) => handleFieldChange("categoryName", e.target.value)} margin="normal" />

//         {subcategories.map((subcategory, index) => (
//           <div key={index}>
//             <TextField label={`Subcategory ${index + 1}`} variant="outlined" fullWidth value={subcategory.subcategoryName} disabled margin="normal" />
//             <Button type="button" variant="outlined" color="secondary" onClick={() => removeSubcategory(index)}>
//               Remove Subcategory
//             </Button>
//           </div>
//         ))}

//         <TextField label="Subcategory Name" variant="outlined" fullWidth value={subcategoryName} onChange={(e) => handleFieldChange("subcategoryName", e.target.value)} margin="normal" />
//         <Button type="button" variant="outlined" color="primary" onClick={addSubcategory}>
//           Add Subcategory
//         </Button>

//         <Button type="submit" variant="contained" color="primary" disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Create Ingredient Category"}
//         </Button>
//       </form>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
//     </>
//   );
// };

// export default IngredientCategoryForm;
import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress, Snackbar, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const IngredientCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredient-categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/ingredient-categories", {
        name,
        description,
        parentCategory: parentCategory || null,
      });

      console.log("Ingredient category created:", response.data);

      setSuccessMessage("Ingredient category created successfully!");
      setName("");
      setDescription("");
      setParentCategory("");
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const errorObject = {};
        serverErrors.forEach((err) => {
          errorObject[err.path] = err.msg;
        });
        setErrors(errorObject);
      } else {
        console.error("Error creating ingredient category:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <TextField label="Category Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} margin="normal" error={!!errors.name} helperText={errors.name} />
        <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" error={!!errors.description} helperText={errors.description} />
        <FormControl fullWidth margin="normal">
          <InputLabel id="parentCategoryLabel">Parent Category</InputLabel>
          <Select labelId="parentCategoryLabel" id="parentCategory" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Category"}
        </Button>
      </form>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default IngredientCategoryForm;
