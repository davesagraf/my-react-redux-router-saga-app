export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const SET_POST = "SET_POST"
export const DELETE_POST = "DELETE_POST"
export const GET_CURRENT_POST = "GET_CURRENT_POST"
export const EDIT_POST = "EDIT_POST"
export const ADD_LIKE = "ADD_LIKE"
export const REMOVE_LIKE = "REMOVE_LIKE"
export const GET_FAV_POSTS = "GET_FAV_POSTS"
export const GET_POST_COMMENTS = "GET_POST_COMMENTS"


export const getAllPosts = () => {
    return {
      type: GET_ALL_POSTS
    };
  };

export const getFavPosts = () => {
  return {
    type: GET_FAV_POSTS
  };
};

//
export const getPostComments = (postId) => {
  return {
    type: GET_POST_COMMENTS,
    postId
  }
}

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