import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CustomAlert = ({ errorMessage }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {errorMessage}
    </Alert>
  );
};

export default CustomAlert;
