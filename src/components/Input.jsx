import React from "react";
import TextField from "@mui/material/TextField";

export const InputOutlined = ({ label, handleEnter, handleKeyPress, type}) => {
  return (
    <TextField
    onChange={(e) => handleEnter(e)}
    onKeyDown={(e) => handleKeyPress(e)}
      type={type}
      label={label}
      variant="outlined"
      color="primary"
      sx={{ marginBottom: "8px" }}
    />
  );
};
