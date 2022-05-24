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
import { grey } from "@mui/material/colors";

import { Card, CardContent, CardActions, Button } from "@mui/material";
import moment from "moment";

export function ShowComments(props) {
  const commentEl = useRef(null);

  const dispatch = useDispatch();

  const { currentPostComments } = useSelector((store) => store.posts);

  const [open, setOpen] = useState(false);

  let thisCommentPostId = props.id;

  return (
    <>
     
          <Grid
            item
            sx={{
              width: "50em",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
              {currentPostComments.map((thisPostComment) => (
                <Card
                  elevation={5}
                  id={thisPostComment.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: grey[50],
                    height: 250,
                    width: 500,
                    lineHeight: "60px",
                    marginBottom: "5em",
                    marginTop: "5em",
                    borderRadius: "0.5em",
                  }}
                >
                  <CardContent sx={{ marginBottom: "auto" }}>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {"Comment #: " + thisPostComment.id}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 24 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {"Title: " + thisPostComment.title}
                    </Typography>

                    <Typography
                      sx={{ mb: 1.5, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {"Author: " + thisPostComment.user_id}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 14 }}
                      color="text.secondary"
                    >
                      {"Created At: " +
                        moment(thisPostComment.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Expand Post</Button>
                  </CardActions>
                </Card>
              ))}
      </Grid>
    </>
  );
}
