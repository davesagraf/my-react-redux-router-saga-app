import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

export function HomePage() {
  return (
    <div>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: "20px 0px" }}
      >
        <Grid
          item
          sx={{ width: "540px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            sx={{
              marginBottom: "8px",
              color: blue[300],
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Welcome to CATBOOK
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: "20px 0px" }}
      >
        <Link style={{ textDecoration: "none" }} to="/signup">
          <Button variant="contained">SIGN UP</Button>
        </Link>
        <Grid
          item
          sx={{ width: "100px", display: "flex", flexDirection: "column" }}
        ></Grid>
        <Link style={{ textDecoration: "none" }} to="/signin">
          <Button variant="contained">SIGN IN</Button>
        </Link>
      </Grid>
    </div>
  );
}
