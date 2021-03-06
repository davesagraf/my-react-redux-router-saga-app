const initialState = {
    comments: [],
    commentLikes: [],
    allCommentLikes: [],
    errors: "",
    loading: false,
  };
  
  export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_COMMENT":
        return { ...state, loading: false };
      case "EDIT_COMMENT":
        return { ...state, loading: false}
      case "DELETE_COMMENT":
          return { ...state };
      case "GET_ALL_COMMENTS":
        return {...state, commentsLoading: action.payload, loading: true }
      case "SUCCESS_GET_ALL_COMMENTS":
        return {...state, comments: action.payload, loading: false }  
      case "GET_ALL_COMMENT_LIKES":
        return {...state, allCommentLikes: action.payload, loading: true }
      case "SUCCESS_GET_ALL_COMMENT_LIKES":
        return {...state, allCommentLikes: action.payload, loading: false } 
      case "ADD_COMMENT_LIKE":
        return {...state };
      case "REMOVE_COMMENT_LIKE":
        return {...state };
      case "GET_COMMENT_LIKES":
        return {...state, commentLikes: action.payload, loading: true }
      case "SUCCESS_GET_COMMENT_LIKES":
        return {...state, commentLikes: action.payload, loading: false }   
      default:
        return { ...state };
    }
  };
  