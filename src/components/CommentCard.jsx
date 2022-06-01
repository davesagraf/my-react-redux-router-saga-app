import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";

import { NewCommentInput } from "../components/NewCommentInput";
import {
  getCurrentPost
} from "../actions/postAction";

import {
  editComment,
  deleteComment,
  addCommentLike,
  removeCommentLike,
  getCommentLikes
} from "../actions/commentAction";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { ClickAwayListener as ModalBackdropClickAway } from "@mui/base";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

export const CommentCard = ({ id, entity, allCommentLikes }) => {
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState({
    title: entity.title,
  });

  const [commentLiked, setCommentLiked] = useState(false);

  useEffect(() => {
    dispatch(getCommentLikes(id));
  }, [commentLiked, dispatch, id]);

  const [openModal, setOpenModal] = useState(true);

  const [openBackdrop, setOpenBackdrop] = useState(true);

  const [changeComment, setChangeComment] = useState(false);

  const [commentEl, setCommentEl] = useState(null);

  const { commentLikes} = useSelector((store) => store.comments);

  const handleEditCommentTitle = (event) => {
    event.preventDefault();
    setEditedComment({ ...editedComment, title: event.target.value });
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setChangeComment(false);
    setCommentEl(null)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setChangeComment(false);
    setCommentEl(null);
  };

  const handleChangeComment = (event) => {
    setCommentEl(event.currentTarget);
    setChangeComment(true);
    setOpenModal(true);
    setOpenBackdrop(true);
  };

  const handleEditComment = () => {
    const thisCommentId = entity.id;
    const postId = entity.post_id;
    try {
      dispatch(
        editComment({
          id: thisCommentId,
          title: editedComment.title,
          post_id: entity.post_id,
        })
      );
      dispatch(getCurrentPost(postId));
      return setChangeComment(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDeleteComment = () => {
    const thisCommentId = entity.id;
    const postId = entity.post_id;
    try {
      dispatch(deleteComment(thisCommentId, postId));
      dispatch(getCurrentPost(postId));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleAddCommentLike = () => {
    const thisCommentId = entity.id;
    try {
      dispatch(getCommentLikes(thisCommentId));
      if (commentLikes.length === 0) {
        dispatch(addCommentLike(thisCommentId));
        return setCommentLiked(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRemoveCommentLike = () => {
    const thisCommentId = entity.id;
    try {
      dispatch(getCommentLikes(thisCommentId));
      if (commentLikes.length !== 0) {
        dispatch(removeCommentLike(thisCommentId));
        return setCommentLiked(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Card
        elevation={3}
        id={id}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          background: grey[50],
          height: 195,
          width: 700,
          lineHeight: "13px",
          marginBottom: "0.5em",
          marginTop: "0.5em",
          borderRadius: "0.7em",
        }}
      >
        <CardContent sx={{ marginBottom: "auto" }}>
          <Typography sx={{ mb: 1, fontSize: 13 }} color="text.secondary">
            {"Comment #: " + id}
          </Typography>

          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {"Title: " + entity.title}
          </Typography>

          <Typography sx={{ mb: 1, fontSize: 16 }} color="text.secondary">
            {"Author: " + entity.user_name}
          </Typography>
          <Typography sx={{ mt:1, mb: 0.1, fontSize: 13 }} color="text.secondary">
            {"Created At: " +
              moment(entity.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography sx={{ mt:1, mb: 0.1, fontSize: 13 }} color="text.secondary">
            {"Updated At: " +
              moment(entity.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </CardContent>
        <CardActions sx={{ mb: 1}}>
          <Tooltip title="Edit Comment">
            <IconButton
              onClick={handleChangeComment}
              variant="contained"
              id={entity.id}
              ref={commentEl}
            >
              <EditIcon id={entity.id}></EditIcon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Comment">
            <IconButton
              onClick={handleDeleteComment}
              variant="contained"
              id={entity.id}
            >
              <DeleteForeverRoundedIcon
                id={entity.id}
              ></DeleteForeverRoundedIcon>
            </IconButton>
          </Tooltip>
          {!commentLiked && allCommentLikes.filter((like) => like.comment_id === entity.id).length === 0 ? ( 
                <Tooltip title="Like Comment">
                  <IconButton
                    onClick={handleAddCommentLike}
                    variant="contained"
                    id={entity.id}
                  >
                     <Badge badgeContent={commentLikes ? commentLikes.length : null} color="primary">
                    <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Unlike Comment">
                  <IconButton
                    onClick={handleRemoveCommentLike}
                    variant="contained"
                    id={entity.id}
                  >
                    <Badge badgeContent={commentLikes ? commentLikes.length : null} color="primary">
                    <ThumbUpIcon></ThumbUpIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
        </CardActions>
      </Card>

      {changeComment ? (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
          >
            <Modal
              open={openModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <ModalBackdropClickAway
            onClickAway={() => {
              handleCloseModal();
              handleCloseBackdrop();
            }}
            >
              <Card
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: "center",
                  background: grey[50],
                  height: 250,
                  width: 700,
                  lineHeight: "34px",
                  marginBottom: "1em",
                  marginTop: "1em",
                  borderRadius: "0.5em",
                }}
              >
                <CardContent sx={{ marginBottom: "auto" }}>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
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
              </ModalBackdropClickAway>
            </Modal>
          </Backdrop>
        </>
      ) : null }
    </>
  );
};
