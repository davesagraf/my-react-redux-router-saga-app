import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { blue}  from "@mui/material/colors";

export function ShowComments() {
  const { posts } = useSelector((store) => store.posts);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    {
    posts.map((post, index, comments) => (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Post comments:
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Show Comments" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id={post.id} sx={{ pl: 4 }}>
               { comments && comments.filter((comment) => comment.post_id === post.id).map((thisPostComment) => (
                <Grid
                  item
                  key={index}
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
                      backgroundColor: blue[600],
                      transform: "translate(0em, -1.5em)",
                    }}
                    color="white"
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
      ))}
    </>
  );
}
