import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";


import { getUserData } from "../actions/userAction";
import Avatar from "@mui/material/Avatar";

import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";

import { getAllPosts } from "../actions/postAction";

export const ProfilePage = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.posts);
  
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getAllPosts());
  }, [dispatch]);

  const userId = currentUser.id

  const userPosts = posts.filter(post => post.user_id === userId)

  const thisUserEmail = currentUser.email
  const thisUserFirstName = currentUser.first_name
  const thisUserLastName = currentUser.last_name

  const userFirstNameFirstLetter = thisUserFirstName.charAt(0)
  const userLastNameFirstLetter = thisUserLastName.charAt(0)

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
                <Avatar> {userInitials} </Avatar>
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
                  First Name: {thisUserFirstName}
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
                  Last Name: {thisUserLastName}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  width: "540px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "2.1em"
                }}
              >
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  email: {thisUserEmail}
                </Typography>
              </Grid>
            </Item>

            <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
              {userPosts.map((post, index) => (
                <Tooltip key={index} title="click to see the post">
                  <Item
                    elevation={5}
                    id={post.id}
                    onClick={() => {
                      navigate(`/post/${post.id}`);
                    }}
                  >
                                      <Typography
                      sx={{ fontSize: 20, backgroundColor: blue[600], transform: "translate(0em, -1.5em)" }}
                      color="white"
                      gutterBottom
                    >
                      Title:
                      {" " + " " + " " +  post.title}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 16, boxSizing: "border-box" }}
                      color="text.secondary"
                    >
                      Description:
                      {" " + " " + " " +  post.description}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 16, boxSizing: "border-box", transform: "translate(0em, 6em)" }}
                      color="text.secondary"
                    >
                      AuthorID:
                      {" " + " " + " " + post.user_id}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 13, boxSizing: "border-box", transform: "translate(0em, 7em)"}}
                      color="text.secondary"
                    >
                      Created:
                      {" " + " " + " " +  post.createdAt }
                    </Typography>
                  </Item>
                </Tooltip>
              ))}
            </Grid>
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
