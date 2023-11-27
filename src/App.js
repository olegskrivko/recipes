import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Tools from "./pages/Tools";
import Prices from "./pages/Prices";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* <Route path="home" element={<Home />} /> */}
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:recipeId" element={<RecipeDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tools" element={<Tools />} />
          <Route path="prices" element={<Prices />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
