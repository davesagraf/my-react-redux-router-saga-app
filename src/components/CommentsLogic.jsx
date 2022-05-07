import React from "react";

export default function CommentsLogic() {
  let comments = [];
  return (
    <>
      {comments ? (
        comments
          .filter((comment) => comment.post_id === btnId)
          .map((thisPostComment) => (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Item
                sx={{ width: "35em", height: "15em" }}
                elevation={5}
                id={thisPostComment.id}
              >
                <Typography
                  sx={{
                    mb: 1.5,
                    fontSize: 13,
                    boxSizing: "border-box",
                    transform: "translate(0em, 6em)",
                  }}
                  color="text.secondary"
                >
                  Comment {thisPostComment.title}
                </Typography>
              </Item>
            </Collapse>
          ))
      ) : (
        <></>
      )}
    </>
  );
}
