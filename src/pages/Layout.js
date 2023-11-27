// import { Outlet } from "react-router-dom";
// import DrawerAppBar from "../components/DrawerAppBar";
// import Container from "@mui/material/Container";
// import React from "react";
// import Footer from "../components/Footer";

// const Layout = () => {
//   return (
//     <React.Fragment>
//       <DrawerAppBar />
//       <Container>
//         <Outlet />
//       </Container>
//       <Footer />
//     </React.Fragment>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/DrawerAppBar";
import Container from "@mui/material/Container";
import React from "react";
import Footer from "../components/Footer";
// Import your CSS file with layout styles

const Layout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <DrawerAppBar />
      <Container
        component="main"
        style={{ flexGrow: 1, paddingTop: "3rem", paddingBottom: "3rem" }}
        className="content"
      >
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
