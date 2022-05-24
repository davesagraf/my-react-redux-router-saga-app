import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  getAllPosts,
  getPostComments,
} from "../actions/postAction";
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
import { NewPostInput } from "../components/NewPostInput";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { lightBlue } from "@mui/material/colors";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentCard } from "../components/CommentCard";

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
    setCreatePost(!createPost);
  };

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
      <Container
        
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
          <Tooltip title="Go to Profile">
            <Button
              key={"button"}
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

          <Input
            sx={{ width: 500 }}
            placeholder="What's up?"
            onClick={handleCreatePost}
          />
          {createPost ? (
            <Grid
              item
              sx={{
                width: 500,
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
                    <Tooltip title="click to read more">
                      <IconButton
                        onClick={() => {
                          navigate(`/post/${post.id}`);
                        }}
                        id={post.id}
                      >
                        <ReadMoreIcon></ReadMoreIcon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="click to see comments">
                      <IconButton onClick={() => { handleShowComments(); dispatch(getPostComments(post.id));}}
                        id={post.id}
                      >
                        <CommentIcon></CommentIcon>
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
                  key={index}
                  id={newComment.id}
                  post_id={newComment.post_id}
                  title={newComment.title}
                  user_id={newComment.user_id}
                  createdAt={newComment.createdAt}
                ></CommentCard>
                </Grid>
              )) : null}
              </>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
