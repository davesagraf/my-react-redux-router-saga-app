import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getCurrentPost,
  addNewComment,
  deleteComment,
  addLike,
  removeLike,
} from "../actions/postAction";
import { getUserData } from "../actions/userAction";
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { NewCommentInput } from "../components/NewCommentInput";
import { EditForm } from "../components/EditForm";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditIcon from "@mui/icons-material/Edit";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import { grey, lightBlue } from "@mui/material/colors";
import moment from "moment";
import { CommentCard } from "../components/CommentCard";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changePost, setChangePost] = useState(false);

  const [liked, setLiked] = useState(false);
  
  const [showComments, setShowComments] = useState(false);

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

  const handleNewCommentTitle = (event) => {
    event.preventDefault();
    setNewComment({ ...newComment, title: event.target.value });
  };

  const handleAddNewComment = () => {
    dispatch(addNewComment(newComment));
    setNewComment({ title: "", post_id: id });
  };

  const handleDeletePost = () => {
    try {
      dispatch(deletePost(id));
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleLike = (event) => {
    event.preventDefault();
    const postId = event.target.id;
    try {
      dispatch(addLike(postId));
    } catch (error) {
      throw new Error(error);
    }
    setLiked(true);
  };

  const handleUnlike = (event) => {
    event.preventDefault();
    const postId = event.target.id;

    try {
      dispatch(removeLike(postId));
    } catch (error) {
      throw new Error(error);
    }
    setLiked(false);
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

          <Card
            elevation={3}
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
                  {`Created at: ${moment(currentPost.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}
                  </Typography>
                </>
              ) : (
                <EditForm entiny={currentPost} setChange={setChangePost} />
              )}
            </CardContent>
            <CardActions>
              <Tooltip title="click to see comments">
                <IconButton
                  onClick={handleShowComments}
                  id={currentPost.id}
                >
                  <CommentIcon></CommentIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Post">
                <IconButton
                  onClick={() => {setChangePost(!changePost);}}
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

          <Grid
            item
            sx={{
              width: "44%",
              display: "flex",
              flexDirection: "column",
              marginLeft: "33%",
            }}
          >
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
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
        </Box>
      </Container>
    </>
  );
}
