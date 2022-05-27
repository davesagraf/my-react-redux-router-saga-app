import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Tooltip from "@mui/material/Tooltip";
import { NewCommentInput } from "../components/NewCommentInput";
import { editComment } from "../actions/postAction";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export const EditCommentForm = ({id, entity, setChange }) => {
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState({
    title: entity.title,
  });

  const [openModal, setOpenModal] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(true);

  const handleEditCommentTitle = (event) => {
    event.preventDefault();
    setEditedComment({ ...editedComment, title: event.target.value });
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }


  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          background: grey[50],
          height: 180,
          width: 700,
          lineHeight: "34px",
          marginBottom: "1em",
          marginTop: "1em",
          borderRadius: "0.5em",
          position: "absolute"
        }}
      >
        <CardContent sx={{ marginBottom: "auto" }}>
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
        </CardContent>
        </Card>
        </Modal>
      </Backdrop>
    </>
  );
};
