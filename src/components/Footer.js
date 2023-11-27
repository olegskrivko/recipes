import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        padding: "20px",
        textAlign: "center",
        marginTop: "auto",

        //mt: "auto", // Push the footer to the bottom of the page if using flexbox layout
      }}
    >
      <Typography variant="body2" color="#fff">
        &copy; 2023 Cooking App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
