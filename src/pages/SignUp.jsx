import { Grid, Typography, Link } from "@mui/material";
import { InputOutlined } from "../components/Input";
import React, { useState } from "react";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { signUp } from "../actions/userAction";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleEnterEmail = (event) => {
    event.preventDefault();
    setUserData({ ...userData, email: event.target.value });
  };

  const handleEnterPassword = (event) => {
    event.preventDefault();
    setUserData({ ...userData, password: event.target.value });
  };

  const handleEnterFirstName = (event) => {
    event.preventDefault();
    setUserData({ ...userData, first_name: event.target.value });
  };

  const handleEnterLastName = (event) => {
    event.preventDefault();
    setUserData({ ...userData, last_name: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(signUp(userData));
    navigate("/signin");
  };

  const handleRedirectToLogIn = () => {
    navigate("/signin");
  };

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
            Sign Up
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
            name="password"
            required
          />

          <InputOutlined
            label={"First Name"}
            handleEnter={handleEnterFirstName}
            type="text"
            id="firstname"
            name="firstname"
          />
          <InputOutlined
            label={"Last Name"}
            handleEnter={handleEnterLastName}
            type="text"
            id="lastname"
            name="lastname"
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: "20px 0px" }}
      >
        <Button onClick={handleSubmit} variant="contained">
          SIGN UP
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
        Already have an account?{" "}
        <Link
          sx={{ cursor: "pointer", textDecoration: "none" }}
          onClick={handleRedirectToLogIn}
        >
          Log in
        </Link>
      </Typography>
    </>
  );
};
