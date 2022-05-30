import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavPosts,
  getPostComments
} from "../actions/postAction";
import {
  Box,
  Typography,
  IconButton,
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

export default function FavPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFavPosts());
    dispatch(getUserData());
  }, [dispatch]);


  const [showComments, setShowComments] = useState(false);

  const { favPosts } = useSelector((store) => store.posts);

  const { currentPostComments } = useSelector((store) => store.posts);

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
            bgcolor: "transparent",
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{
              width: "50em",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            {favPosts.map((post, index) => (
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
                      {`Title: ${post.title}`}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {`Description: ${post.description}`}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {`Author: ${post.user_name}`}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {`Created at: ${moment(post.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}`}
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
                  </CardActions>
                </Card>

                {showComments
                  ? currentPostComments
                      .filter((comment) => comment.post_id === post.id)
                      .map((newComment, index) => (
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