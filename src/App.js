import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Tools from "./pages/Tools";
import Prices from "./pages/Prices";
// import RecipesPage from "./pages/RecipesPage";
import CustomRecipesPage from "./pages/CustomRecipesPage";
// import RecipeDetails from "./pages/RecipeDetails";
import CustomRecipeInfo from "./pages/CustomRecipeInfo";
import RecipeInfo from "./pages/RecipeInfo";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="recipes" element={<RecipesPage />} /> */}
          <Route path="recipes" element={<CustomRecipesPage />} />
          {/* <Route path="recipes/:recipeId" element={<RecipeDetails />} /> */}
          <Route path="recipes/:id" element={<CustomRecipeInfo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="recipeinfo" element={<RecipeInfo />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tools" element={<Tools />} />
          <Route path="prices" element={<Prices />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
