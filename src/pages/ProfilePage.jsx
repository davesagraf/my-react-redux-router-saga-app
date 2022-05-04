import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { NewPostInput } from "../components/NewPostInput";
import { useParams, useNavigate } from "react-router-dom";

import { getUserData } from "../actions/userAction";
import Avatar from "@mui/material/Avatar";

import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  currentUser ? console.log(currentUser) : console.log("loading...");

  const thisUserEmail = currentUser.email;
  const thisUserFirstName = currentUser.first_name;
  const thisUserLastName = currentUser.last_name;

  const userFirstNameFirstLetter = thisUserFirstName.charAt(0);
  const userLastNameFirstLetter = thisUserLastName.charAt(0);

  const userInitials = userFirstNameFirstLetter + userLastNameFirstLetter;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 250,
    width: 850,
    lineHeight: "60px",
    marginBottom: "5em",
    marginTop: "5em"
  }));

  const theme = createTheme({ palette: { mode: "light" } });

  const handleNavigateToMain = () => {
    try {
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Tooltip title="Go to Home page">
        <Button
          sx={{
            width: "5em",
            height: "5em",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleNavigateToMain}
        >
          <HomeIcon></HomeIcon>
        </Button>
      </Tooltip>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {currentUser ? (
          <>
            <Item elevation={5}>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "3em",
                  marginTop: "3em"
                }}
              >
                <Avatar>{userInitials}</Avatar>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  First Name: {currentUser.first_name}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Last Name: {currentUser.last_name}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1.6em"
                }}
              >
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  email: {currentUser.email}
                </Typography>
              </Grid>
            </Item>
          </>
        ) : (
          <>
            <Item elevation={5}>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "3em",
                  marginTop: "3em"
                }}
              >
                <Avatar></Avatar>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  First Name:
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Last Name:
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1.6em",
                }}
              >
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  email:
                </Typography>
              </Grid>
            </Item>
          </>
        )}
      </Grid>
    </>
  );
};
