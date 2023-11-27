import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/DrawerAppBar";
import Container from "@mui/material/Container";
import React from "react";
// import Footer from "../components/Footer";

const Layout = () => {
  return (
    <React.Fragment>
      <DrawerAppBar />
      <Container>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Layout;
