import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";

export const CommentCard = ({ comment }) => {
  return (
    <>
      <Card
        elevation={5}
        id={comment.id}
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
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {"Comment #: " + comment.id}
          </Typography>

          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {"Title: " + comment.title}
          </Typography>

          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {"Author: " + comment.user_id}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {"Created At: " + moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Expand Post</Button>
        </CardActions>
      </Card>
    </>
  );
};
