import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getCurrentPost,
  addNewComment,
  deleteComment,
} from "../actions/postAction";
import { Box, Button, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useParams, useNavigate } from "react-router-dom";
import { NewCommentInput } from "../components/NewCommentInput";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { EditForm } from "../components/EditForm";
import { EditCommentForm } from "../components/EditCommentForm";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { getUserData } from "../actions/userAction";
import { blue, grey } from "@mui/material/colors";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePost, setChangePost] = useState(false);
  const [changeComment, setChangeComment] = useState(false);

  const { id } = useParams();
  const { currentPost } = useSelector((store) => store.posts);
  const { comments } = currentPost;

  useEffect(() => {
    dispatch(getCurrentPost(id));
  }, [dispatch, id]);

  const [newComment, setNewComment] = useState({
    title: "",
    post_id: id,
  });

  const handleNewCommentTitle = (event) => {
    event.preventDefault();
    setNewComment({ ...newComment, title: event.target.value });
  };

  const handleAddNewComment = () => {
    dispatch(addNewComment(newComment));
    setNewComment({ title: "", post_id: id });
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 250,
    width: 750,
    lineHeight: "60px",
    marginBottom: "5em",
    marginTop: "5em",
    marginLeft: "30vw",
  }));

  const handleDeletePost = () => {
    try {
      dispatch(deletePost(id));
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDeleteComment = (event) => {
    const thisCommentId = event.target.id;
    const postId = id;
    try {
      dispatch(deleteComment(thisCommentId, postId));
      dispatch(getCurrentPost(id));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleNavigateBack = () => {
    try {
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleNavigateToProfile = () => {
    try {
      dispatch(getUserData());
      navigate("/profile");
    } catch (error) {
      throw new Error(error);
    }
  };

  const theme = createTheme({ palette: { mode: "light" } });

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

      <Tooltip title="go back">
        <Button
          sx={{
            width: "5em",
            height: "5em",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleNavigateBack}
        >
          <NavigateBeforeIcon></NavigateBeforeIcon>
        </Button>
      </Tooltip>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
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
            <Item elevation={5} id={currentPost.id}>
              <Tooltip title="Edit Post">
                <IconButton
                  sx={{
                    transform: "translate(17.1em, -1em)",
                    alignSelf: "flex-start",
                  }}
                  onClick={() => {
                    setChangePost(!changePost);
                  }}
                  variant="contained"
                  id={currentPost.id}
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Post">
                <IconButton
                  sx={{
                    transform: "translate(15.4em, 1em)",
                    alignSelf: "flex-start",
                  }}
                  onClick={handleDeletePost}
                  variant="contained"
                  id={currentPost.id}
                >
                  <DeleteForeverRoundedIcon></DeleteForeverRoundedIcon>
                </IconButton>
              </Tooltip>

              {!changePost ? (
                <>
                  <Typography
                    sx={{
                      fontSize: 20,
                      backgroundColor: blue[600],
                      transform: "translate(0em, -3em)",
                    }}
                    color="white"
                    gutterBottom
                  >
                    Title:
                    {" " + " " + " " + currentPost.title}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 16, boxSizing: "border-box" }}
                    color="text.secondary"
                  >
                    Description:
                    {" " + " " + " " + currentPost.description}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: 16,
                      boxSizing: "border-box",
                      transform: "translate(0em, 3em)",
                    }}
                    color="text.secondary"
                  >
                    AuthorID:
                    {" " + " " + " " + currentPost.user_id}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: 13,
                      boxSizing: "border-box",
                      transform: "translate(0em, 4em)",
                    }}
                    color="text.secondary"
                  >
                    Created:
                    {" " + " " + " " + currentPost.createdAt}
                  </Typography>
                </>
              ) : (
                <EditForm entiny={currentPost} setChange={setChangePost} />
              )}
            </Item>

            <Grid
              item
              sx={{
                width: "540px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              {comments ? (
                comments.map((comment, index) => (
                  <Box key={index} id={comment.id}>
                    <Item
                      elevation={5}
                      id={comment.id}
                      sx={{ width: "45em", height: "10.6em" }}
                    >
                      <Tooltip title="Edit Comment">
                        <IconButton
                          sx={{
                            transform: "translate(15.1em, -1em)",
                            alignSelf: "flex-start",
                          }}
                          onClick={() => {
                            setChangeComment(!changeComment);
                          }}
                          variant="contained"
                          id={comment.id}
                        >
                          <EditIcon id={comment.id}></EditIcon>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Comment">
                        <IconButton
                          sx={{
                            transform: "translate(13.3em, 1em)",
                            alignSelf: "flex-start",
                          }}
                          onClick={handleDeleteComment}
                          variant="contained"
                          id={comment.id}
                        >
                          <DeleteForeverRoundedIcon
                            id={comment.id}
                          ></DeleteForeverRoundedIcon>
                        </IconButton>
                      </Tooltip>
                      {!changeComment ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: 20,
                              backgroundColor: grey[400],
                              transform: "translate(0em, -4em)",
                            }}
                            color="white"
                            gutterBottom
                          >comment #{comment.id}</Typography>
                          <Typography
                            sx={{ fontSize: 18 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {comment.title}
                          </Typography>
                        </>
                      ) : (
                        <EditCommentForm
                          entiny={comment}
                          setChange={setChangeComment}
                        />
                      )}
                    </Item>
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  No comments here yet.
                </Typography>
              )}
            </Grid>
          </Box>
        </ThemeProvider>
      </Grid>

      <Grid
        item
        sx={{
          width: "540px",
          display: "flex",
          flexDirection: "column",
          marginLeft: "30vw",
        }}
      >
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Enter new comment
        </Typography>

        <NewCommentInput
          value={newComment.title}
          handleEnter={handleNewCommentTitle}
          label={"new comment title"}
        ></NewCommentInput>

        <Tooltip title="add comment">
          <Button
            onClick={handleAddNewComment}
            variant="contained"
            sx={{ width: "15em" }}
          >
            Add New Comment
          </Button>
        </Tooltip>
      </Grid>
    </>
  );
}
