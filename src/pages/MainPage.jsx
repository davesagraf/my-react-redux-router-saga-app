import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getAllPosts } from "../actions/postAction";
import { Box, Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { NewPostInput } from "../components/NewPostInput";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Tooltip from "@mui/material/Tooltip";

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

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 250,
    width: 850,
    lineHeight: "60px",
    marginBottom: "5em",
    marginTop: "5em",
    marginLeft: "30vw"
  }));

  const theme = createTheme({ palette: { mode: "light" } });

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
                <Button onClick={handleAddNewPost} variant="contained">
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
                <Tooltip key={index} title="click to see the post">
                  <Item
                    elevation={5}
                    id={post.id}
                    onClick={() => {
                      navigate(`/post/${post.id}`);
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 14, boxSizing: "border-box" }}
                      color="text.secondary"
                    >
                      {post.description}
                    </Typography>
                  </Item>
                </Tooltip>
              ))}
            </Grid>
          </Box>
        </ThemeProvider>
      </Grid>
    </>
  );
}
