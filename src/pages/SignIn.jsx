import { Grid, Typography, Link } from "@mui/material";
import { InputOutlined } from "../components/Input";
import React, { useState } from "react";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { logIn, authSuccess } from "../actions/userAction";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleEnterEmail = (event) => {
    event.preventDefault();
    setUserData({ ...userData, email: event.target.value });
  };

  const handleEnterPassword = (event) => {
    event.preventDefault();
    setUserData({ ...userData, password: event.target.value });
  };

  const handleLogin = () => {
    setTimeout(() => {
      navigate('/main')
    }, 1000)
    dispatch(logIn(userData));
    dispatch(authSuccess(userData));
  };

  const handleRedirectToSignUp = () => {
    navigate('/signup')
  }

  return (
    <>
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
            Sign In
          </Typography>
          <InputOutlined
            label={"Email"}
            handleEnter={handleEnterEmail}
            type="email"
            id="email"
            name="email"
            required
          />
          <InputOutlined
            label={"Password"}
            handleEnter={handleEnterPassword}
            type="password"
            id="password"
            name="pass"
            required
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: "20px 0px" }}
      >
        <Button onClick={handleLogin} variant="contained">
          LOG IN
        </Button>
      </Grid>
      <Typography
            sx={{
              marginBottom: "8px",
              color: blue[300],
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Don't have account yet? <Link sx={{cursor: "pointer", textDecoration: "none"}} onClick={handleRedirectToSignUp}>Sign Up</Link>
      </Typography>
    </>
  );
};
