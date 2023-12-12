import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Fastfood, LocalDining, Cake, LocalCafe } from "@mui/icons-material";
import Drinks from "../images/img-1.jpg";
import Appetizers from "../images/img-2.jpg";
import MainCourse from "../images/img-3.jpg";
import Desserts from "../images/img-4.jpg";

const categories = [
  {
    title: "Appetizer",
    name: "appetizer",
    icon: <Fastfood />,
    image: Appetizers,
  },
  {
    title: "Main Course",
    name: "main course",
    icon: <LocalDining />,
    image: MainCourse,
  },
  { title: "Desserts", name: "dessert", icon: <Cake />, image: Desserts },
  { title: "Drinks", name: "drink", icon: <LocalCafe />, image: Drinks },
  {
    title: "Side Dish",
    name: "side dish",
    icon: <Fastfood />,
    image: Appetizers,
  },
  { title: "Salad", name: "salad", icon: <Fastfood />, image: Appetizers },
  { title: "Bread", name: "bread", icon: <Fastfood />, image: Appetizers },
  {
    title: "Breakfast",
    name: "breakfast",
    icon: <Fastfood />,
    image: Appetizers,
  },
  { title: "Soup", name: "soup", icon: <Fastfood />, image: Appetizers },
  {
    title: "Beverage",
    name: "beverage",
    icon: <LocalCafe />,
    image: Appetizers,
  },
  { title: "Sauce", name: "sauce", icon: <Fastfood />, image: Appetizers },
  {
    title: "Marinade",
    name: "marinade",
    icon: <Fastfood />,
    image: Appetizers,
  },
  {
    title: "Finger Food",
    name: "fingerfood",
    icon: <Fastfood />,
    image: Appetizers,
  },
  { title: "Snack", name: "snack", icon: <Fastfood />, image: Appetizers },
];

// drink

// const categories = [
//   {
//     name: "Appetizers",
//     icon: <Fastfood />,
//     image: Appetizers,
//   },
//   {
//     name: "Main Course",
//     icon: <LocalDining />,
//     image: MainCourse,
//   },
//   { name: "Desserts", icon: <Cake />, image: Desserts },
//   {
//     name: "Drinks",
//     icon: <LocalCafe />,
//     image: Drinks,
//   },

// ];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(0); // Use index for selectedCategory
  const sliderRef = useRef(null); // Ref for the Slider component

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Use fade transition
    // Other settings...
  };

  // const handleCategoryChange = (index) => {
  //   setSelectedCategory(index); // Update selectedCategory based on index

  //   // Use slickGoTo method to change the slide
  //   if (sliderRef && sliderRef.current) {
  //     sliderRef.current.slickGoTo(index);
  //   }
  // };

  const [fetchedRecipes, setFetchedRecipes] = useState([]); // State to store fetched recipes

  const handleCategoryChange = async (index) => {
    // DO I need to put setselect in try or above?
    setSelectedCategory(index); // Update selectedCategory based on index

    // Use slickGoTo method to change the slide
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    try {
      const API_KEY = "88345194a6e34c5e83770bdfa6af399c"; // Spoonacular API Key
      const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

      const category = categories[index].name.toLowerCase(); // Get the category name
      const query = `?query=${category}&number=12&apiKey=${API_KEY}`;

      const response = await fetch(API_URL + query);

      if (response.ok) {
        const data = await response.json();
        setFetchedRecipes(data.results); // Update state with fetched recipes
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Handle errors, update state, or show error messages
    }
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "8px" }}>
      <Slider
        ref={sliderRef}
        {...settings}
        style={{ outline: "none", border: "none" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              borderRadius: "3rem",
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "3rem",
              }}
            />
          </div>
        ))}
      </Slider>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "4px" }}
      >
        {categories.map((category, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              //color={selectedCategory === index ? "primary" : "default"} // Check if selectedCategory matches the index
              startIcon={category.icon}
              onClick={() => handleCategoryChange(index)} // Pass index to handleCategoryChange
            >
              {category.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      {/* Render content related to the selected category below */}
      <Typography variant="h2" gutterBottom>
        Categories
      </Typography>
      <Typography variant="h4" style={{ marginTop: "4px" }}>
        Selected Category: {categories[selectedCategory].name}
      </Typography>

      {/* You can add content related to the selected category here */}
      {/* Display the fetched recipes in a grid */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        {fetchedRecipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt={recipe.title}
              />

              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {recipe.title}
                </Typography>
                {/* You can add more details if needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Container, Typography, Button, Grid, Paper } from "@mui/material";
// import { Fastfood, LocalDining, Cake, LocalCafe } from "@mui/icons-material";
// import Drinks from "../images/img-1.jpg";
// import Appetizers from "../images/img-2.jpg";
// import MainCourse from "../images/img-3.jpg";
// import Desserts from "../images/img-4.jpg";

// const categories = [
//   {
//     name: "Appetizers",
//     icon: <Fastfood />,
//     image: Appetizers,
//   },
//   {
//     name: "Main Course",
//     icon: <LocalDining />,
//     image: MainCourse,
//   },
//   { name: "Desserts", icon: <Cake />, image: Desserts },
//   {
//     name: "Drinks",
//     icon: <LocalCafe />,
//     image: Drinks,
//   },
//   // Add more categories as needed
// ];

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <Container maxWidth="md" style={{ textAlign: "center", marginTop: "8px" }}>
//       <Typography variant="h2" gutterBottom>
//         Categories
//       </Typography>
//       <Slider {...settings}>
//         {categories.map((category, index) => (
//           <div key={index}>
//             <img
//               src={category.image}
//               alt={category.name}
//               style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
//             />
//           </div>
//         ))}
//       </Slider>
//       <Grid
//         container
//         spacing={2}
//         justifyContent="center"
//         style={{ marginTop: "4px" }}
//       >
//         {categories.map((category, index) => (
//           <Grid item key={index}>
//             <Button
//               variant="contained"
//               //color={selectedCategory === category ? "primary" : "default"}
//               startIcon={category.icon}
//               onClick={() => handleCategoryChange(category)}
//             >
//               {category.name}
//             </Button>
//           </Grid>
//         ))}
//       </Grid>
//       {/* Render content related to the selected category below */}
//       <Typography variant="h4" style={{ marginTop: "4px" }}>
//         Selected Category: {selectedCategory.name}
//       </Typography>
//       {/* You can add content related to the selected category here */}
//     </Container>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Container, Typography, IconButton, Grid, Paper } from "@mui/material";
// import { Fastfood, LocalDining, Cake, LocalCafe } from "@mui/icons-material";

// const categories = [
//   { name: "Appetizers", icon: <Fastfood /> },
//   { name: "Main Course", icon: <LocalDining /> },
//   { name: "Desserts", icon: <Cake /> },
//   { name: "Drinks", icon: <LocalCafe /> },
//   // Add more categories as needed
// ];

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     centerMode: true,
//     focusOnSelect: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
//       <Typography variant="h2" gutterBottom>
//         Categories
//       </Typography>
//       <Slider {...settings}>
//         {categories.map((category, index) => (
//           <div key={index}>
//             <Paper
//               elevation={3}
//               onClick={() => handleCategoryChange(category)}
//               sx={{
//                 padding: 2,
//                 cursor: "pointer",
//                 backgroundColor:
//                   selectedCategory === category ? "#e0e0e0" : "inherit",
//               }}
//             >
//               <IconButton>{category.icon}</IconButton>
//               <Typography variant="subtitle1">{category.name}</Typography>
//             </Paper>
//           </div>
//         ))}
//       </Slider>
//       {/* Render content related to the selected category below */}
//       <Typography variant="h4" sx={{ mt: 4 }}>
//         Selected Category: {selectedCategory.name}
//       </Typography>
//       {/* You can add content related to the selected category here */}
//     </Container>
//   );
// };

// export default Home;
