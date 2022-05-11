import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { NewCommentInput } from "../components/NewCommentInput";
import { editComment } from "../actions/postAction";

export const EditCommentForm = ({ entiny, setChange }) => {
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState({
    title: entiny.title,
  });

  const handleEditCommentTitle = (event) => {
    event.preventDefault();
    setEditedComment({ ...editedComment, title: event.target.value });
  };

  const handleEditComment = () => {
    try {
      dispatch(
        editComment({
          id: entiny.id,
          title: editedComment.title,
          post_id: entiny.post_id,
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
          height: "10.6em",
          display: "flex",
          flexDirection: "column",
          transform: "translate(0em, -6.6em)"
        }}
      >
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Edit comment
        </Typography>

        <NewCommentInput
          value={editedComment.title}
          handleEnter={handleEditCommentTitle}
          label={"edit comment title"}
        ></NewCommentInput>

        <Tooltip title="edit comment">
          <Button
            onClick={handleEditComment}
            variant="contained"
            sx={{ width: "13em" }}
          >
            Save comment
          </Button>
        </Tooltip>
      </Grid>
    </>
  );
};
