import React, { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { Box } from "@mui/material";
export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const result = fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });
    result
      .then((data) => data.json())
      .then((data) => setPosts(data.slice(0, 10)));
  }, []);
  return (
    <Box sx={{ display: "flex", padding: "20px", flexWrap: "wrap" }}>
      {posts.map((post, index) => {
        return <PostCard post={post} key={index} />;
      })}
    </Box>
  );
};
