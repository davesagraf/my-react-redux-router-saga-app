import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getAllPosts } from "../actions/postAction";
import { Box, Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { NewPostInput } from "../components/NewPostInput";
import { useNavigate } from "react-router-dom";
import { ShowComments } from "../components/ShowComments";
import moment from "moment";

import {
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Tooltip from "@mui/material/Tooltip";
import { lightBlue } from "@mui/material/colors";

export default function MainPage() {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.posts);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  const handleNewPostTitle = (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, title: event.target.value });
  };

  const handleNewPostDescription = (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, description: event.target.value });
  };

  const handleAddNewPost = () => {
    dispatch(addNewPost(newPost));
    setNewPost({ title: "", description: "" });
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const theme = createTheme({ palette: { mode: "light", background: lightBlue[300]} });

  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    try {
      navigate("/profile");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Tooltip title="Go to Profile">
        <Button
          sx={{
            width: "5em",
            height: "5em",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleNavigateToProfile}
        >
          <AccountCircleIcon></AccountCircleIcon>
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
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: { md: "1fr" },
              gap: 2,
              width: "100%",
            }}
          >
            <Grid
              item
              sx={{
                width: "540px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "30vw",
              }}
            >
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                Enter new post
              </Typography>

              <NewPostInput
                value={newPost.title}
                handleEnter={handleNewPostTitle}
                label={"new post title"}
              ></NewPostInput>
              <NewPostInput
                value={newPost.description}
                handleEnter={handleNewPostDescription}
                label={"new post description"}
              ></NewPostInput>

              <Tooltip title="add post">
                <Button
                  onClick={handleAddNewPost}
                  variant="contained"
                  sx={{ width: "13em" }}
                >
                  Add New Post
                </Button>
              </Tooltip>
            </Grid>

            <Grid
              item
              sx={{
                width: "50em",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              {posts.map((post, index) => (
                <>
                  <Tooltip key={index} title="click to see the post">
                  <Card
                  elevation={5}
                  id={post.id}
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                  }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: lightBlue[50],
          height: 250,
          width: 500,
          lineHeight: "60px",
          marginBottom: "5em",
          marginTop: "5em",
          marginLeft: "30vw",
          borderRadius: "0.5em",
        }}
      >
        <CardContent sx={{ marginBottom: "auto" }}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {"Title: " + post.title}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {"Description: " + post.description}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {"Author: " + post.user_id}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {"Created At: " + moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a') }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Expand Post</Button>
        </CardActions>
      </Card>
                    
                    {/* <Item
                      elevation={5}
                      id={post.id}
                      onClick={() => {
                        navigate(`/post/${post.id}`);
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 20,
                          backgroundColor: blue[600],
                          transform: "translate(0em, -1.5em)",
                        }}
                        color="white"
                        gutterBottom
                      >
                        Post Title:
                        {" " + " " + " " + post.title}
                      </Typography>
                      <Typography
                        sx={{ mb: 1.5, fontSize: 16, boxSizing: "border-box" }}
                        color="text.secondary"
                      >
                        Post Description:
                        {" " + " " + " " + post.description}
                      </Typography>
                      <Typography
                        sx={{
                          mb: 1.5,
                          fontSize: 16,
                          boxSizing: "border-box",
                          transform: "translate(0em, 5em)",
                        }}
                        color="text.secondary"
                      >
                        Post AuthorID:
                        {" " + " " + " " + post.user_id}
                      </Typography>
                      <Typography
                        sx={{
                          mb: 1.5,
                          fontSize: 13,
                          boxSizing: "border-box",
                          transform: "translate(0em, 6em)",
                        }}
                        color="text.secondary"
                      >
                        Created at:
                        {" " + " " + " " + post.createdAt}
                      </Typography>
                    </Item> */}



                  </Tooltip>
                  <Grid
                    item
                    sx={{
                      width: "540px",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "30vw",
                    }}
                  >
                    <Tooltip title="click to show comments">
                      <ShowComments id={post.id} />
                    </Tooltip>
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </ThemeProvider>
      </Grid>
    </>
  );
}
