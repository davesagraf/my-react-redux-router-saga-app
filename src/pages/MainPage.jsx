import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  deletePost,
  getAllPosts
} from "../actions/postAction";

import {
  getPostComments,
  getAllCommentLikes
} from "../actions/commentAction";

import {
  Box,
  Button,
  Typography,
  IconButton,
  Input,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { lightBlue } from "@mui/material/colors";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentCard } from "../components/CommentCard";
import { getUserData } from "../actions/userAction";

import { ClickAwayListener as PostTitleClickAway } from "@mui/base";
import { ClickAwayListener as PostDescClickAway } from "@mui/base";

import { Snackbar as PostTitleSnackbar } from "@mui/material";
import { Snackbar as PostDescSnackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserData());
    dispatch(getAllCommentLikes());
  }, [dispatch]);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  const [showComments, setShowComments] = useState(false);

  const [showPostInput, setShowPostInput] = useState(true);

  const [showPostButton, setShowPostButton] = useState(false);

  const [postTitleEl, setPostTitleEl] = useState(null);

  const [postDescEl, setPostDescEl] = useState(null);

  const [postButtonEl, setPostButtonEl] = useState(null);

  const [showPostTitleSnackbar, setShowPostTitleSnackbar] = useState(false);

  const [showPostDescSnackbar, setShowPostDescSnackbar] = useState(false);

  const { posts } = useSelector((store) => store.posts);

  const { currentPostComments } = useSelector((store) => store.posts);

  const { allCommentLikes } = useSelector((store) => store.posts);

  const handlePostTitleInput = (event) => {
    setPostTitleEl(event.currentTarget);
  };

  const handlePostDescInput = (event) => {
    if (event.key === "Enter") {
      setPostDescEl(event.currentTarget);
      setShowPostInput(false);
      setPostTitleEl(null);
      if (showPostTitleSnackbar) {
        setShowPostTitleSnackbar(false);
      }
    }
  };

  const handleClearPostTitleInput = () => {
    const postTitleInput = document.getElementById("new-post-title");
    postTitleInput.value = "";
    setNewPost({ ...newPost, title: "" });
    if (showPostTitleSnackbar) {
      setShowPostTitleSnackbar(false);
    }
  };

  const handleClearPostDescInput = () => {
    const postDescInput = document.getElementById("new-post-description");
    postDescInput.value = "";
    setNewPost({ ...newPost, description: "" });
    if (showPostDescSnackbar) {
      setShowPostDescSnackbar(false);
    }
  };

  const handleShowPostTitleSnackbar = () => {
    setTimeout(() => {
      setShowPostTitleSnackbar(true);
    }, 3000);
  };

  const handleShowPostDescSnackbar = () => {
    setTimeout(() => {
      setShowPostDescSnackbar(true);
    }, 3000);
  };

  const handleNewPostTitle = (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, title: event.target.value });
  };

  const handleNewPostDescription = (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, description: event.target.value });
  };

  const handleNewPostButton = (event) => {
    if (event.key === "Enter") {
      setShowPostButton(true);
      setPostDescEl(null);
      setPostButtonEl(event.currentTarget);
      if (showPostDescSnackbar) {
        setShowPostDescSnackbar(false);
      }
    }
  };

  const handleAddNewPost = () => {
    dispatch(addNewPost(newPost));
    setNewPost({ title: "", description: "" });
    setShowPostInput(true);
    setShowPostButton(false);
  };

  const handleCancelPost = () => {
    setNewPost({ title: "", description: "" });
    setShowPostInput(true);
    setShowPostButton(false);
  };

  const handleDeletePost = (event) => {
    try {
      dispatch(deletePost(event.target.id));
      dispatch(getAllPosts());
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handlePostTitleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPostTitleSnackbar(false);
  };

  const handlePostDescSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPostDescSnackbar(false);
  };

  const postTitleSnackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handlePostTitleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const postDescSnackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handlePostDescSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
            bgcolor: "transparent",
            width: "100%",
          }}
        >
          {showPostTitleSnackbar ? (
            <div>
              <PostTitleSnackbar
                open={showPostTitleSnackbar}
                autoHideDuration={4000}
                onClose={handlePostTitleSnackbarClose}
                message={`🙂 like the post title? 👉 press Enter to continue`}
                action={postTitleSnackbarAction}
              />
            </div>
          ) : null}

          {showPostDescSnackbar ? (
            <div>
              <PostDescSnackbar
                open={showPostDescSnackbar}
                autoHideDuration={4000}
                onClose={handlePostDescSnackbarClose}
                message={`🙂 like the post description? 👉 press Enter to continue`}
                action={postDescSnackbarAction}
              />
            </div>
          ) : null}

          {showPostInput ? (
            <PostTitleClickAway onClickAway={handleClearPostTitleInput}>
              <Input
                sx={{ width: 500 }}
                placeholder="What's up?"
                onClick={(e) => handlePostTitleInput(e)}
                onChange={(e) => {
                  handleNewPostTitle(e);
                  handleShowPostTitleSnackbar();
                }}
                id={"new-post-title"}
                value={newPost.title}
                onKeyPress={(e) => handlePostDescInput(e)}
                inputRef={postTitleEl}
              />
            </PostTitleClickAway>
          ) : null}

          {postDescEl ? (
            <PostDescClickAway onClickAway={handleClearPostDescInput}>
              <Input
                sx={{ width: 500 }}
                placeholder="Add description to your post..."
                autoFocus
                onChange={(e) => {
                  handleNewPostDescription(e);
                  handleShowPostDescSnackbar();
                }}
                id={"new-post-description"}
                value={newPost.description}
                onKeyPress={(e) => handleNewPostButton(e)}
                inputRef={postDescEl}
              />
            </PostDescClickAway>
          ) : null}

          {showPostButton ? (
            <>
              <Tooltip title="Add Post">
                <Button
                  onClick={handleAddNewPost}
                  variant="contained"
                  sx={{ width: "13em", marginTop: "1em", marginRight: "1em" }}
                  ref={postButtonEl}
                >
                  Add New Post
                </Button>
              </Tooltip>

              <Tooltip title="Cancel Post">
                <Button
                  onClick={handleCancelPost}
                  variant="contained"
                  sx={{ width: "13em", marginTop: "1em", marginLeft: "1em" }}
                >
                  Cancel
                </Button>
              </Tooltip>
            </>
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
                    lineHeight: "34px",
                    marginBottom: "1em",
                    marginTop: "1em",
                    borderRadius: "0.5em",
                  }}
                >
                  <CardContent sx={{ marginBottom: "auto" }}>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {`Title: ${post.title}`}
                    </Typography>
                    <Typography
                      sx={{ mb: 1, fontSize: 16 }}
                      color="text.secondary"
                    >
                      {`Description: ${post.description}`}
                    </Typography>
                    <Typography
                      sx={{ mb: 1, fontSize: 16 }}
                      color="text.secondary"
                    >
                      {`Author: ${post.user_name}`}
                    </Typography>
                    <Typography
                      sx={{mt: 1, mb: 0.1, fontSize: 13 }}
                      color="text.secondary"
                    >
                      {`Created at: ${moment(post.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}`}
                    </Typography>
                    <Typography
                      sx={{ mt: 1, mb: 0.1, fontSize: 13 }}
                      color="text.secondary"
                    >
                      {`Updated at: ${moment(post.updatedAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Read More">
                      <IconButton
                        onClick={() => {
                          navigate(`/post/${post.id}`);
                        }}
                        id={post.id}
                      >
                        <ReadMoreIcon></ReadMoreIcon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="See Comments">
                      <IconButton
                        onClick={() => {
                          handleShowComments();
                          dispatch(getPostComments(post.id));
                        }}
                        id={post.id}
                      >
                        <CommentIcon></CommentIcon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Post">
                      <IconButton
                        onClick={handleDeletePost}
                        variant="contained"
                        id={post.id}
                      >
                        <DeleteForeverRoundedIcon></DeleteForeverRoundedIcon>
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>

                {showComments ? currentPostComments.filter((comment) => comment.post_id === post.id).map((newComment, index) => (
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
                            entity={newComment}
                            key={index}
                            id={newComment.id}
                            allCommentLikes={allCommentLikes}
                          ></CommentCard>
                        </Grid>
                      ))
                  : null}
              </>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
