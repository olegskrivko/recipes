import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/DrawerAppBar";
import Container from "@mui/material/Container";
// import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Container>
        <DrawerAppBar />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
