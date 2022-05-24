import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { lightBlue } from "@mui/material/colors";

import { getUserData } from "../actions/userAction";
import Avatar from "@mui/material/Avatar";

import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CommentIcon from "@mui/icons-material/Comment";

import { getAllPosts, getPostComments } from "../actions/postAction";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((store) => store.user);

  const { posts } = useSelector((store) => store.posts);

  const [showComments, setShowComments] = useState(false);

  const { currentPostComments } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getAllPosts());
  }, [dispatch]);

  const userId = currentUser.id;

  const userPosts = posts.filter((post) => post.user_id === userId);

  const thisUserEmail = currentUser.email;
  const thisUserFirstName = currentUser.first_name;
  const thisUserLastName = currentUser.last_name;

  const userFirstNameFirstLetter = thisUserFirstName.charAt(0);
  const userLastNameFirstLetter = thisUserLastName.charAt(0);

  const userInitials = userFirstNameFirstLetter + userLastNameFirstLetter;

  const handleNavigateToMain = () => {
    try {
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.default",
            width: "100%",
          }}
        >
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
                <Card elevation={3}>
                  <Grid
                    item
                    sx={{
                      width: "540px",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3em",
                      marginTop: "3em",
                    }}
                  >
                    <Avatar> {userInitials} </Avatar>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      width: "540px",
                      display: "flex",
                      flexDirection: "column",
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
                      flexDirection: "column",
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
                      marginLeft: "2.1em",
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
                </Card>

                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {userPosts.map((post, index) => (
                    <Card
                      elevation={3}
                      id={post.id}
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        background: lightBlue[50],
                        height: 250,
                        width: 500,
                        lineHeight: "60px",
                        marginBottom: "2.5em",
                        marginTop: "2.5em",
                        borderRadius: "0.5em",
                      }}
                    >
                      <CardContent sx={{ marginBottom: "auto" }}>
                        <Typography
                          sx={{
                            fontSize: 20,
                            backgroundColor: lightBlue[50],
                            transform: "translate(0em, -1.5em)",
                          }}
                          color="white"
                          gutterBottom
                        >
                          {"Post Title: " + post.title}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1.5,
                            fontSize: 16,
                            boxSizing: "border-box",
                          }}
                          color="text.secondary"
                        >
                          {"Post Description: " + post.description}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1.5,
                            fontSize: 16,
                            boxSizing: "border-box",
                            transform: "translate(0em, 6em)",
                          }}
                          color="text.secondary"
                        >
                          {"Post AuthorID: " + post.user_id}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1.5,
                            fontSize: 13,
                            boxSizing: "border-box",
                            transform: "translate(0em, 7em)",
                          }}
                          color="text.secondary"
                        >
                          {"Created At: " + post.createdAt}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Tooltip title="click to read more">
                          <IconButton
                            onClick={() => {navigate(`/post/${post.id}`);}}
                            id={post.id}
                          >
                            <ReadMoreIcon></ReadMoreIcon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="click to see comments">
                          <IconButton
                            onClick={() => {handleShowComments(); dispatch(getPostComments(post.id));}}
                            id={post.id}
                          >
                            <CommentIcon></CommentIcon>
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  ))}
                </Grid>
              </>
            ) : null}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
