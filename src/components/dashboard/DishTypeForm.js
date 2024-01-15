// export default DishTypeForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress } from "@mui/material";
// import axios from "axios";

// const DishTypeForm = () => {
//   const [dishType, setDishType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (event) => {
//     setDishType(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       // Make a POST request to your server endpoint to create a new dish type
//       const response = await axios.post("http://localhost:3000/api/dishTypes", { name: dishType });

//       // Handle the response as needed (e.g., show a success message)
//       console.log("Dish type created:", response.data);

//       // Clear the form after successful submission
//       setDishType("");
//       setError(null);
//     } catch (error) {
//       // Handle errors and set the error state
//       setError(error.message);
//       console.error("Error creating dish type:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <TextField label="Dish Type" variant="outlined" fullWidth value={dishType} onChange={handleInputChange} margin="normal" error={error !== null} helperText={error} />
//       <Button type="submit" variant="contained" color="primary" disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Create Dish Type"}
//       </Button>
//     </form>
//   );
// };

// export default DishTypeForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress } from "@mui/material";
// import axios from "axios";

// const DishTypeForm = () => {
//   const [dishType, setDishType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (event) => {
//     setDishType(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       // Make a POST request to your server endpoint to create a new dish type
//       const response = await axios.post("http://localhost:3000/api/dishTypes", { name: dishType });

//       // Handle the response as needed (e.g., show a success message)
//       console.log("Dish type created:", response.data);

//       // Clear the form after successful submission
//       setDishType("");
//       setError(null);
//     } catch (error) {
//       // Handle errors and set the error state
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         const formattedErrors = serverErrors.map((err) => err.msg).join(", ");
//         setError(formattedErrors);
//       } else {
//         setError(error.message);
//         console.error("Error creating dish type:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <TextField label="Dish Type" variant="outlined" fullWidth value={dishType} onChange={handleInputChange} margin="normal" error={error !== null} helperText={error} />
//       <Button type="submit" variant="contained" color="primary" disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Create Dish Type"}
//       </Button>
//     </form>
//   );
// };

// export default DishTypeForm;

// export default DishTypeForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress } from "@mui/material";
// import axios from "axios";

// const DishTypeForm = () => {
//   const [dishType, setDishType] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (event) => {
//     setDishType(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       // Make a POST request to your server endpoint to create a new dish type
//       const response = await axios.post("http://localhost:3000/api/dishTypes", { name: dishType, description: description });

//       // Handle the response as needed (e.g., show a success message)
//       console.log("Dish type created:", response.data);

//       // Clear the form after successful submission
//       setDishType("");
//       setDescription("");
//       setError(null);
//     } catch (error) {
//       // Handle errors and set the error state
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         const formattedErrors = serverErrors.map((err) => err.msg).join(", ");
//         setError(formattedErrors);
//       } else {
//         setError(error.message);
//         console.error("Error creating dish type:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <TextField label="Dish Type" variant="outlined" fullWidth value={dishType} onChange={handleInputChange} margin="normal" error={error !== null} helperText={error} />
//       <TextField label="Description" variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" />
//       <Button type="submit" variant="contained" color="primary" disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Create Dish Type"}
//       </Button>
//     </form>
//   );
// };

// export default DishTypeForm;
// export default DishTypeForm;
// import React, { useState } from "react";
// import { TextField, Button, CircularProgress } from "@mui/material";
// import axios from "axios";

// const DishTypeForm = () => {
//   const [dishType, setDishType] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [nameError, setNameError] = useState(null);
//   const [descriptionError, setDescriptionError] = useState(null);

//   const handleInputChange = (event) => {
//     setDishType(event.target.value);
//     setNameError(null); // Clear the name error when the input changes
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//     setDescriptionError(null); // Clear the description error when the input changes
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setLoading(true);

//       // Make a POST request to your server endpoint to create a new dish type
//       const response = await axios.post("http://localhost:3000/api/dishTypes", { name: dishType, description: description });

//       // Handle the response as needed (e.g., show a success message)
//       console.log("Dish type created:", response.data);

//       // Clear the form after successful submission
//       setDishType("");
//       setDescription("");
//       setNameError(null);
//       setDescriptionError(null);
//     } catch (error) {
//       // Handle errors and set the error state for each field
//       if (error.response && error.response.data && error.response.data.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach((err) => {
//           if (err.path === "name") {
//             setNameError(err.msg);
//           } else if (err.path === "description") {
//             setDescriptionError(err.msg);
//           }
//         });
//       } else {
//         console.error("Error creating dish type:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <TextField label="Dish Type" variant="outlined" fullWidth value={dishType} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
//       <TextField label="Description" variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
//       <Button type="submit" variant="contained" color="primary" disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Create Dish Type"}
//       </Button>
//     </form>
//   );
// };

// export default DishTypeForm;
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

const DishTypeForm = () => {
  const [dishType, setDishType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (event) => {
    setDishType(event.target.value);
    setNameError(null);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/dishTypes", { name: dishType, description: description });

      console.log("Dish type created:", response.data);

      setSuccessMessage("Dish type created successfully!");
      setDishType("");
      setDescription("");
      setNameError(null);
      setDescriptionError(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach((err) => {
          if (err.path === "name") {
            setNameError(err.msg);
          } else if (err.path === "description") {
            setDescriptionError(err.msg);
          }
        });
      } else {
        console.error("Error creating dish type:", error.message);
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
        <TextField label="Dish Type" variant="outlined" fullWidth value={dishType} onChange={handleInputChange} margin="normal" error={nameError !== null} helperText={nameError} />
        <TextField label="Description" variant="outlined" fullWidth value={description} onChange={handleDescriptionChange} margin="normal" error={descriptionError !== null} helperText={descriptionError} />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Dish Type"}
        </Button>
      </form>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSuccessMessage} message={successMessage} />
    </>
  );
};

export default DishTypeForm;
