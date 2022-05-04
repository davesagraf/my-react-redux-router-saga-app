import React from "react";
import TextField from "@mui/material/TextField";

export const NewCommentInput = ({ label, handleEnter, value}) => {
  return (
    <TextField
    onChange={(e) => handleEnter(e)}
    value={value}
      label={label}
      variant="outlined"
      color="primary"
      multiline
      rows={5}
      sx={{ marginBottom: "8px" }}
    />
  );
};
