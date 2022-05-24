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

export const CommentCard = (props) => {
  return (
    <>
      <Card
        elevation={3}
        id={props.id}
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
        }}
      >
        <CardContent sx={{ marginBottom: "auto" }}>
          <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
            {"Comment #: " + props.id}
          </Typography>

          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            {"Title: " + props.title}
          </Typography>

          <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
            {"Author: " + props.user_id}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
            {"Created At: " + moment(props.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Expand Post</Button>
        </CardActions>
      </Card>
    </>
  );
};
