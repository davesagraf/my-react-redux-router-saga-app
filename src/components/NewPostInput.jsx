import React from "react";
import TextField from "@mui/material/TextField";

export const NewPostInput = ({ label, handleEnter, value}) => {
  return (
    <TextField
    onChange={(e) => handleEnter(e)}
    value={value}
      label={label}
      variant="outlined"
      color="primary"
      sx={{ marginBottom: "8px" }}
    />
  );
};
