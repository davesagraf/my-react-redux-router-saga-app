export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const SET_POST = "SET_POST"
export const DELETE_POST = "DELETE_POST"
export const GET_CURRENT_POST = "GET_CURRENT_POST"
export const EDIT_POST = "EDIT_POST"
export const SET_COMMENT = "SET_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const GET_POST_COMMENTS = "GET_POST_COMMENTS"
export const ADD_LIKE = "ADD_LIKE"
export const REMOVE_LIKE = "REMOVE_LIKE"


export const getAllPosts = () => {
    return {
      type: GET_ALL_POSTS
    };
  };

export const addNewPost = (newPost) => {
  return {
    type: SET_POST,
    newPost
  }
}

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}

export const getCurrentPost = (id) => {
  return {
    type: GET_CURRENT_POST,
    id
  }
}

export const editPost = (updatedPost) => {
  return {
    type: EDIT_POST,
    updatedPost
  }
}

export const addNewComment = (newComment) => {
  return {
    type: SET_COMMENT,
    newComment
  }
}

export const deleteComment = (thisCommentId, postId ) => {
  return {
    type: DELETE_COMMENT,
    thisCommentId, postId
  }
}

export const editComment = (updatedComment) => {
  return {
    type: EDIT_COMMENT,
    updatedComment
  }
}

//
export const getPostComments = (postId) => {
  return {
    type: GET_POST_COMMENTS,
    postId
  }
}


//add like
export const addLike = (postId) => {
  return {
    type: ADD_LIKE,
    postId
  }
}

//remove like
export const removeLike = (postId) => {
  return {
    type: REMOVE_LIKE,
    postId
  }
}