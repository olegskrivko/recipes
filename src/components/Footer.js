import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        textAlign: "center",
        mt: "auto", // Push the footer to the bottom of the page if using flexbox layout
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Your footer content here
      </Typography>
    </Box>
  );
};

export default Footer;
