import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { NewPostInput } from "../components/NewPostInput";
import { editPost } from "../actions/postAction";

export const EditForm = ({ entity, setChange }) => {
  const dispatch = useDispatch();
  const [editedPost, setEditedPost] = useState({
    title: entity.title,
    description: entity.description,
  });

  const handleEditPostTitle = (event) => {
    event.preventDefault();
    setEditedPost({ ...editedPost, title: event.target.value });
  };

  const handleEditPostDescription = (event) => {
    event.preventDefault();
    setEditedPost({ ...editedPost, description: event.target.value });
  };

  const handleEditPost = () => {
    try {
      dispatch(
        editPost({
          id: entity.id,
          title: editedPost.title,
          description: editedPost.description,
        })
      );
      return setChange(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Grid
        item
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "25%",
          transform: "translateY(0.5em)",
        }}
      >
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Edit post
        </Typography>

        <NewPostInput
          value={editedPost.title}
          handleEnter={handleEditPostTitle}
          label={"edit post title"}
        ></NewPostInput>
        <NewPostInput
          value={editedPost.description}
          handleEnter={handleEditPostDescription}
          label={"edit post description"}
        ></NewPostInput>

        <Tooltip title="edit post">
          <Button onClick={handleEditPost} variant="contained">
            Save post
          </Button>
        </Tooltip>
      </Grid>
    </>
  );
};
