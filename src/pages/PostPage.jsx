import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getCurrentPost,
  addNewComment,
  deleteComment,
  addLike,
  removeLike
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { getUserData } from "../actions/userAction";
import { blue, grey } from "@mui/material/colors";
import moment from "moment";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePost, setChangePost] = useState(false);
  const [changeComment, setChangeComment] = useState(false);
  const [liked, setLiked] = useState(false);

  const { id } = useParams();
  const { currentPost } = useSelector((store) => store.posts);
  const { comments } = currentPost;
  const { likes } = currentPost;

  useEffect(() => {
    dispatch(getCurrentPost(id));
  }, [liked, dispatch, id]);

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
    height: "250px",
    width: "50%",
    lineHeight: "60px",
    marginBottom: "5em",
    marginLeft: "25%",
    transform: "translate(0em, -7em)"
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

  const handleLike = (event) => {
    event.preventDefault()
    const postId = event.target.id
    try {
      dispatch(addLike(postId));  
    } catch (error) {
      throw new Error(error);
    }
    setLiked(true);
  }


  const handleUnlike = (event) => {
    event.preventDefault()
    const postId = event.target.id

    try {
      dispatch(removeLike(postId));
    } catch (error) {
      throw new Error(error);
    }
    setLiked(false);
  }

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
            {likes.length === 0 ? <Tooltip title="Like Post">
                <IconButton
                  sx={{
                    transform: "translate(-19.3em, -0.5em)",
                    alignSelf: "flex-start",
                  }}
                  onClick={handleLike}
                  variant="contained"
                  id={currentPost.id}
                >
                  <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                </IconButton>
              </Tooltip> : <Tooltip title="Unlike Post">
                <IconButton
                  sx={{
                    transform: "translate(-19.3em, -0.5em)",
                    alignSelf: "flex-start",
                  }}
                  onClick={handleUnlike}
                  variant="contained"
                  id={currentPost.id}
                >
                  <ThumbUpIcon></ThumbUpIcon>
                </IconButton>
              </Tooltip>}  
           
           
              <Tooltip title="Edit Post">
                <IconButton
                  sx={{
                    transform: "translate(22em, -0.9em)",
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
                    transform: "translate(20.3em, 1em)",
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
                    {"Post Title: " + currentPost.title}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 16, boxSizing: "border-box" }}
                    color="text.secondary"
                  >
                  {"Post Description: " + currentPost.description}
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
                    {"Post AuthorID: " + currentPost.user_id}
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
                    {"Created At: " + moment(currentPost.createdAt).format('MMMM Do YYYY, h:mm:ss a') }
                  </Typography>
                </>
              ) : (
                <EditForm entiny={currentPost} setChange={setChangePost} />
              )}
            </Item>

            <Grid
              item
              sx={{
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
                      sx={{ width: "30%", height: "10.6em", marginLeft: "35%" }}
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
                          >{"Comment #: " + comment.id}</Typography>
                          <Typography
                            sx={{ fontSize: 18, transform: "translate(0em, -3em)" }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {comment.title}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 13, transform: "translate(0em, -2.7em)" }}
                            color="text.secondary"
                            gutterBottom
                          >
                           {"AuthorID: " + comment.user_id}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 13, transform: "translate(0em, -2em)" }}
                            color="text.secondary"
                            gutterBottom
                          >
                          {"Created At: " + moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
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
          width: "44%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "33%",
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
