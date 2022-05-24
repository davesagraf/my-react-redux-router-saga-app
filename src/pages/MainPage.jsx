import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getAllPosts, getPostComments } from "../actions/postAction";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { NewPostInput } from "../components/NewPostInput";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { grey } from "@mui/material/colors";


import { Card, CardContent, CardActions } from "@mui/material";

import { Container } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Tooltip from "@mui/material/Tooltip";
import { lightBlue } from "@mui/material/colors";
import Input from '@mui/material/Input';

import CommentIcon from '@mui/icons-material/Comment';
import { IconButton } from '@mui/material';
import { CommentCard } from "../components/CommentCard"

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  const [createPost, setCreatePost] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const { posts } = useSelector((store) => store.posts);

  const { currentPostComments } = useSelector((store) => store.posts);

  const handleCreatePost = () => {
    setCreatePost(!createPost)
  }

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

  const theme = createTheme({
    palette: { mode: "light", background: lightBlue[300] },
  });

  const handleNavigateToProfile = () => {
    try {
      navigate("/profile");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <Container>
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
              <Input placeholder="What's up?" onClick={handleCreatePost} />
              {createPost ? (
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
              ) : null}

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
                        // onClick={() => {
                        //   navigate(`/post/${post.id}`);
                        // }}
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
                          borderRadius: "0.5em",
                        }}
                      >
                        <CardContent sx={{ marginBottom: "auto" }}>
                          <Typography
                            sx={{ fontSize: 24 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {"Title: " + post.title}
                          </Typography>
                          <Typography
                            sx={{ mb: 1.5, fontSize: 14 }}
                            color="text.secondary"
                          >
                            {"Description: " + post.description}
                          </Typography>
                          <Typography
                            sx={{ mb: 1.5, fontSize: 14 }}
                            color="text.secondary"
                          >
                            {"Author: " + post.user_id}
                          </Typography>
                          <Typography
                            sx={{ mb: 1.5, fontSize: 14 }}
                            color="text.secondary"
                          >
                            {"Created At: " +
                              moment(post.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Tooltip key={index} title="click to see comments">
                            <IconButton
                              onClick={() => {
                                handleShowComments();
                                dispatch(getPostComments(post.id));
                              }}
                              key={post.id}
                              id={post.id}
                            >
                              <CommentIcon></CommentIcon>
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </Card>
                    </Tooltip>
                    { showComments ? 
                      currentPostComments.filter((comment) => comment.post_id === post.id).map((newComment) => (
                      <Grid
                        item
                        sx={{
                          width: "50em",
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                      >
                      <CommentCard 
                      key={index} 
                      id={newComment.id} 
                      postId={newComment.post_id} 
                      title={newComment.title} 
                      author={newComment.user_id} 
                      createdAt={newComment.createdAt}  >
                      </CommentCard>
                      </Grid> )) : null }
                  </>
                ))}
              </Grid>
            </Box>
          </ThemeProvider>
        </Grid>
      </Container>
    </>
  );
}
