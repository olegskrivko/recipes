import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchLabels() {
  return (
    <FormGroup
      sx={{
        marginLeft: "1rem",
      }}
    >
      <FormControlLabel
        control={<Switch defaultChecked color="success" />}
        label="Voice control"
      />
    </FormGroup>
  );
}
