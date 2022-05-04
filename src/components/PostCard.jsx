import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const PostCard = ({ post }) => {
  return (
    <>
      {" "}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          maxWidth: 275,
          background: blueGrey[300],
          margin: "0 20px 10px 0px",
        }}
      >
        <CardContent sx={{ marginBottom: "auto" }}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Expand Post</Button>
        </CardActions>
      </Card>
    </>
  );
};
