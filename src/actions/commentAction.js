export const SET_COMMENT = "SET_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const GET_POST_COMMENTS = "GET_POST_COMMENTS"
export const ADD_COMMENT_LIKE = "ADD_COMMENT_LIKE"
export const REMOVE_COMMENT_LIKE = "REMOVE_COMMENT_LIKE"
export const GET_COMMENT_LIKES = "GET_COMMENT_LIKES"
export const GET_ALL_COMMENT_LIKES = "GET_ALL_COMMENT_LIKES"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"

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
  
  //get comment likes
  export const getCommentLikes = (commentId) => {
    return {
      type: GET_COMMENT_LIKES,
      commentId
    }
  }
  
  //add comment like
  export const addCommentLike = (commentId) => {
    return {
      type: ADD_COMMENT_LIKE,
      commentId
    }
  }
  
  //remove comment like
  export const removeCommentLike = (commentId) => {
    return {
      type: REMOVE_COMMENT_LIKE,
      commentId
    }
  }
  
  export const getAllCommentLikes = () => {
    return {
      type: GET_ALL_COMMENT_LIKES
    };
  };

  export const getAllComments = () => {
    return {
      type: GET_ALL_COMMENTS
    };
  };