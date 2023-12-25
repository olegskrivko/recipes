import React, { useState, useRef, useEffect } from "react";
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

import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CakeIcon from "@mui/icons-material/Cake";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Drinks from "../images/img-1.jpg";
import Appetizers from "../images/img-2.jpg";
import MainCourse from "../images/img-3.jpg";
import Desserts from "../images/img-4.jpg";
import RecipeList from "../components/RecipeList";
import CookieIcon from "@mui/icons-material/Cookie";
import SetMealIcon from "@mui/icons-material/SetMeal";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const categories = [
  {
    title: "Appetizer",
    name: "appetizer",
    icon: <SetMealIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Main Course",
    name: "main course",
    icon: <BrunchDiningIcon width={30} height={30} fill="white" />,
    image: MainCourse,
  },
  {
    title: "Desserts",
    name: "dessert",
    icon: <CakeIcon width={30} height={30} fill="white" />,
    image: Desserts,
  },
  {
    title: "Drinks",
    name: "drink",
    icon: <LocalCafeIcon width={30} height={30} fill="white" />,
    image: Drinks,
  },
  {
    title: "Side Dish",
    name: "side dish",
    icon: <DinnerDiningIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Salad",
    name: "salad",
    icon: <RiceBowlIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Bread",
    name: "bread",
    icon: <BreakfastDiningIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Breakfast",
    name: "breakfast",
    icon: <BakeryDiningIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Soup",
    name: "soup",
    icon: <SoupKitchenIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Beverage",
    name: "beverage",
    icon: <LocalBarIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Sauce",
    name: "sauce",
    icon: <WaterDropIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Marinade",
    name: "marinade",
    icon: <KebabDiningIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Finger Food",
    name: "fingerfood",
    icon: <LocalPizzaIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
  {
    title: "Snack",
    name: "snack",
    icon: <CookieIcon width={30} height={30} fill="white" />,
    image: Appetizers,
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const sliderRef = useRef(null);
  const initialCardCount = 6;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = "88345194a6e34c5e83770bdfa6af399c";
    const API_URL = `https://api.spoonacular.com/recipes/random?number=${initialCardCount}&apiKey=${API_KEY}`;

    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          console.log(data.recipes);
          setRecipes(data.recipes);
        } else {
          throw new Error("Failed to fetch recipes");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleCategoryChange = async (index) => {
    setSelectedCategory(index);
    setLoading(true);

    try {
      const API_KEY = "88345194a6e34c5e83770bdfa6af399c";
      const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

      const category = categories[index].name.toLowerCase();
      const query = `?query=${category}&number=${initialCardCount}&apiKey=${API_KEY}`;

      const response = await fetch(API_URL + query);

      if (response.ok) {
        const data = await response.json();
        // console.log(data.recipes);
        setRecipes(data.results);
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <Container maxWidth="lg" style={{ textAlign: "center", padding: "0" }}>
      <Slider ref={sliderRef} {...settings}>
        {categories.map((category, index) => (
          <div key={index}>
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
              startIcon={category.icon}
              size="small"
              sx={{
                background: "#1D1D1D !important",
              }}
              onClick={() => handleCategoryChange(index)}
            >
              {category.title}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
   
       
      </Grid> */}
      <RecipeList
        recipes={recipes}
        loading={loading}
        initialCardCount={initialCardCount}
        error={error}
      />
    </Container>
  );
};

export default Home;
