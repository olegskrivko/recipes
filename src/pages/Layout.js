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

import React from "react";
import DrawerAppBar from "../components/DrawerAppBar";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <DrawerAppBar />
      <div style={{ flex: "1 0 auto", width: "100%" }}>
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: "2rem",
            paddingBottom: "2rem",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
