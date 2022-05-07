import React, { useState, useRef } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost } from "../actions/postAction";

export function ShowComments(props) {
  const commentEl = useRef(null);

  const dispatch = useDispatch();

  const { currentPost } = useSelector((store) => store.posts);
  const { comments } = currentPost;

  const [open, setOpen] = useState(false);

  let thisCommentPostId = props.id;

  const handleClick = (event) => {
    setOpen(!open);
    commentEl.current.focus();
    const showCommentsButtonId = event.target.id;
    dispatch(getCurrentPost(showCommentsButtonId))
  };

  let newComments = comments.filter(comment => comment.post_id === thisCommentPostId);

  return (
    <>
      <List
        id={thisCommentPostId}
        sx={{ width: "100%", maxWidth: 360, backgroundColor: "transparent", transform: "translate(0em, -5em)" }}
      >
        <ListItemButton
          ref={commentEl}
          key={"index"}
          id={thisCommentPostId}
          onClick={handleClick}
        >
          <Typography
            id={thisCommentPostId}
            sx={{
              fontSize: 16,
              backgroundColor: "transparent",
            }}
            color="black"
            gutterBottom
          >
            Show Comments
          </Typography>
          <Grid
            item
            sx={{
            width: "50em",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            }}
          ></Grid>
          {open ? (
            <ExpandLess id={thisCommentPostId} />
          ) : (
            <ExpandMore id={thisCommentPostId} />
          )}
        </ListItemButton>

        <Collapse id={thisCommentPostId} in={open} timeout="auto" unmountOnExit>
          <List id={thisCommentPostId} component="div" disablePadding>
            <ListItemButton id={thisCommentPostId}       sx={{
            width: "50em",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            }}>
              { newComments.map((thisPostComment) => (
                  <Grid
                    item
                    sx={{
                      width: "50em",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 20,
                        display: "flex",
                        flexDirection: "column"
                      }}
                      color="black"
                      gutterBottom
                    >
                      Comment Title:
                      {" " + " " + " " + thisPostComment.title}
                    </Typography>
                  </Grid>
                ))}
              <ListItemText primary="Comments" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
}
