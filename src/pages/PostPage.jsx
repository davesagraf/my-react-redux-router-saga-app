import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deletePost,
  getCurrentPost,
  addNewComment,
  addLike,
  removeLike,
} from "../actions/postAction";
import { getUserData } from "../actions/userAction";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import { EditForm } from "../components/EditForm";

import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditIcon from "@mui/icons-material/Edit";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import { lightBlue } from "@mui/material/colors";
import moment from "moment";
import { CommentCard } from "../components/CommentCard";
import { ClickAwayListener as CommentTitleClickAway } from "@mui/base";
import { Snackbar as CommentTitleSnackbar } from "@mui/material";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changePost, setChangePost] = useState(false);

  const [liked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const [showCommentInput, setShowCommentInput] = useState(true);

  const [showCommentButton, setShowCommentButton] = useState(false);

  const [showCommentTitleSnackbar, setShowCommentTitleSnackbar] =
    useState(false);

  const [commentTitleEl, setCommentTitleEl] = useState(null);

  const { id } = useParams();
  const { currentPost } = useSelector((store) => store.posts);
  const { comments } = currentPost;
  const { likes } = currentPost;

  useEffect(() => {
    dispatch(getCurrentPost(id));
    dispatch(getUserData());
  }, [liked, dispatch, id]);

  const [newComment, setNewComment] = useState({
    title: "",
    post_id: id,
  });

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentTitleInput = (event) => {
    setCommentTitleEl(event.currentTarget);
    setShowCommentButton(true);
    if (event.key === "Enter") {
      dispatch(addNewComment(newComment));
      setNewComment({ title: "", post_id: id });
      setShowCommentInput(true);
      setShowCommentButton(false);
    }
  };

  const handleClearCommentTitleInput = () => {
    const commentTitleInput = document.getElementById("new-comment-title");
    commentTitleInput.value = "";
    setNewComment({ ...newComment, title: "" });
    setShowCommentButton(false);
  };

  const handleShowCommentTitleSnackbar = () => {
    setTimeout(() => {
      setShowCommentTitleSnackbar(true);
    }, 3000);
  };

  const handleNewCommentTitle = (event) => {
    event.preventDefault();
    setNewComment({ ...newComment, title: event.target.value });
  };

  const handleAddNewComment = (event) => {
    dispatch(addNewComment(newComment));
    setNewComment({ title: "", post_id: id });
    setShowCommentInput(true);
    setShowCommentButton(false);
    setShowCommentTitleSnackbar(false);
  };

  const handleCancelComment = () => {
    setNewComment({ title: "" });
    setShowCommentInput(true);
    setShowCommentButton(false);
    setShowCommentTitleSnackbar(false);
  };

  const handleDeletePost = () => {
    try {
      dispatch(deletePost(id));
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleLike = () => {
    try {
      dispatch(addLike(currentPost.id));
    } catch (error) {
      throw new Error(error);
    }
    setLiked(true);
  };

  const handleUnlike = () => {
    try {
      dispatch(removeLike(currentPost.id));
    } catch (error) {
      throw new Error(error);
    }
    setLiked(false);
  };

  const handleCommentTitleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowCommentTitleSnackbar(false);
  };

  const commentTitleSnackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCommentTitleSnackbarClose}
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
          {showCommentTitleSnackbar ? (
            <div>
              <CommentTitleSnackbar
                open={showCommentTitleSnackbar}
                autoHideDuration={4000}
                onClose={handleCommentTitleSnackbarClose}
                message={`🙂 like your comment? 👉 press Enter to post`}
                action={commentTitleSnackbarAction}
              />
            </div>
          ) : null}

          <Card
            elevation={1}
            id={currentPost.id}
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
              {!changePost ? (
                <>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {`Title: ${currentPost.title}`}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 14 }}
                    color="text.secondary"
                  >
                    {`Description: ${currentPost.description}`}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 14 }}
                    color="text.secondary"
                  >
                    {`Author: ${currentPost.user_name}`}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: 14 }}
                    color="text.secondary"
                  >
                    {`Created at: ${moment(currentPost.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}`}
                  </Typography>
                </>
              ) : (
                <EditForm entiny={currentPost} setChange={setChangePost} />
              )}
            </CardContent>
            <CardActions>
              <Tooltip title="click to see comments">
                <IconButton onClick={handleShowComments} id={currentPost.id}>
                  <CommentIcon></CommentIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Post">
                <IconButton
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
                  onClick={handleDeletePost}
                  variant="contained"
                  id={currentPost.id}
                >
                  <DeleteForeverRoundedIcon></DeleteForeverRoundedIcon>
                </IconButton>
              </Tooltip>
              {likes.length === 0 ? (
                <Tooltip title="Like Post">
                  <IconButton
                    onClick={handleLike}
                    variant="contained"
                    id={currentPost.id}
                  >
                    <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Unlike Post">
                  <IconButton
                    onClick={handleUnlike}
                    variant="contained"
                    id={currentPost.id}
                  >
                    <ThumbUpIcon></ThumbUpIcon>
                  </IconButton>
                </Tooltip>
              )}
            </CardActions>
          </Card>

          {showComments ? (
            <>
              {comments ? (
                comments.map((comment, index) => (
                  <>
                    <CommentCard
                      entity={comment}
                      key={index}
                      id={comment.id}
                    ></CommentCard>
                  </>
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

              {showCommentInput ? (
                <CommentTitleClickAway
                  onClickAway={handleClearCommentTitleInput}
                >
                  <Input
                    sx={{ width: 500, marginTop: "1em", marginBottom: "5em" }}
                    placeholder="Leave a comment here"
                    onClick={(e) => handleCommentTitleInput(e)}
                    onChange={(e) => {
                      handleNewCommentTitle(e);
                      handleShowCommentTitleSnackbar();
                    }}
                    id={"new-comment-title"}
                    value={newComment.title}
                    onKeyPress={(e) => handleCommentTitleInput(e)}
                    inputRef={commentTitleEl}
                  />
                </CommentTitleClickAway>
              ) : null}

              {showCommentButton ? (
                <>
                  <Tooltip title="add comment">
                    <Button
                      onClick={handleAddNewComment}
                      variant="contained"
                      sx={{
                        width: "13em",
                        marginTop: "1em",
                        marginRight: "1em",
                      }}
                    >
                      Add New Comment
                    </Button>
                  </Tooltip>

                  <Tooltip title="cancel comment">
                    <Button
                      onClick={handleCancelComment}
                      variant="contained"
                      sx={{
                        width: "13em",
                        marginTop: "1em",
                        marginLeft: "1em",
                      }}
                    >
                      Cancel
                    </Button>
                  </Tooltip>
                </>
              ) : null}
            </>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
