import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Typography,
  Tooltip,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { lightBlue, grey } from "@mui/material/colors";

import { getUserData } from "../actions/userAction";

import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CommentIcon from "@mui/icons-material/Comment";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import moment from "moment";

import { getAllPosts, getPostComments } from "../actions/postAction";

export const ProfilePage = () => {
  const auth = localStorage.getItem("Authorization");

  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((store) => store.user);

  const { posts } = useSelector((store) => store.posts);

  const [showComments, setShowComments] = useState(false);

  const { currentPostComments } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getAllPosts());
  }, [dispatch]);

  const userId = currentUser.id;

  const userPosts = posts.filter((post) => post.user_id === userId);

  const thisUserEmail = currentUser.email;
  const thisUserFirstName = currentUser.first_name;
  const thisUserLastName = currentUser.last_name;

  const userFirstNameFirstLetter = thisUserFirstName.charAt(0);
  const userLastNameFirstLetter = thisUserLastName.charAt(0);

  const userInitials = userFirstNameFirstLetter + userLastNameFirstLetter;

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
          
            {currentUser ? (
              <>
                <Card elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    background: grey[50],
                    height: 250,
                    width: 700,
                    lineHeight: "60px",
                    marginBottom: "2.5em",
                    marginTop: "2.5em",
                    borderRadius: "0.5em",
                  }} >
                  <CardContent sx={{ marginBottom: "auto" }}>
                  <Avatar> {userInitials} </Avatar>
                  <Typography
                      sx={{ fontSize: 18 }}
                      color="text.secondary"
                      gutterBottom
                    >
                    {`First Name: ${thisUserFirstName}`}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.secondary"
                      gutterBottom
                    >
                    {`Last Name: ${thisUserLastName}`}
                    </Typography>
                  
                    <AlternateEmailIcon sx={{
                      color: "text.secondary"
                    }} />
                    <Typography
                      sx={{ fontSize: 16 }}
                      color="text.secondary"
                      gutterBottom
                    >
                    {`email: ${thisUserEmail}`}
                    </Typography>
                  </CardContent>
                </Card>

                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "50em",
                    cursor: "pointer"
                  }}
                >
                  {userPosts.map((post, index) => (
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
                          sx={{
                            fontSize: 20,
                            backgroundColor: lightBlue[50],
                          }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {`Title: ${post.title}`}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1.5,
                            fontSize: 16,
                            boxSizing: "border-box",
                          }}
                          color="text.secondary"
                        >
                          {`Description: ${post.description}`}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1.5,
                            fontSize: 16,
                            boxSizing: "border-box",
                          }}
                          color="text.secondary"
                        >
                          {`Author: ${post.user_name}`}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1.5,
                            fontSize: 13,
                            boxSizing: "border-box",
                          }}
                          color="text.secondary"
                        >
                          {`Created At: ${ moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Tooltip title="click to read more">
                          <IconButton
                            onClick={() => {navigate(`/post/${post.id}`);}}
                            id={post.id}
                          >
                            <ReadMoreIcon></ReadMoreIcon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="click to see comments">
                          <IconButton
                            onClick={() => {handleShowComments(); dispatch(getPostComments(post.id));}}
                            id={post.id}
                          >
                            <CommentIcon></CommentIcon>
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  ))}
                </Grid>
              </>
            ) : null}
        </Box>
      </Container>
    </>
  );
};
