const initialState = {
  posts: [],
  currentPost: {
    title: "",
    description: "",
    comments: [],
    likes: [],
    showComments: false
  },
  currentPostComments: [],
  commentLikes: [],
  favPosts: [],
  allCommentLikes: [],
  errors: "",
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, posts: action.payload, loading: false };
    case "FAV_POSTS":
      return { ...state, favPosts: action.payload, loading: true }; 
    case "SUCCESS_FAV_POSTS":
      return { ...state, favPosts: action.payload, loading: false };  
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_POST":
      return { ...state };
    case "DELETE_POST":
      return { ...state };
    case "SUCCESS_CURRENT_POST":
      return { ...state, currentPost: action.payload, loading: false };
    case "EDIT_POST":
      return { ...state, loading: false}
    case "SET_COMMENT":
      return { ...state };
    case "EDIT_COMMENT":
      return { ...state, loading: false}
    case "DELETE_COMMENT":
        return { ...state };
    case "ADD_LIKE":
      return {...state };
    case "REMOVE_LIKE":
      return {...state } ; 
    case "GET_POST_COMMENTS":
      return {...state, comments: action.payload, loading: true }
    case "SUCCESS_GET_POST_COMMENTS":
      return {...state, currentPostComments: action.payload, loading: false}
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
