const initialState = {
  posts: [],
  currentPost: {
    title: "",
    description: "",
    comments: [],
    likes: []
  },
  currentPostComments: [],
  favPosts: [],
  errors: "",
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return { ...state, loadindPosts: action.payload, loading: true };
    case "SUCCESS_GET_ALL_POSTS":
      return { ...state, posts: action.payload, loading: false };  
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
    case "ADD_LIKE":
      return {...state };
    case "REMOVE_LIKE":
      return {...state };
    case "GET_POST_COMMENTS":
      return {...state, postComments: action.payload, loading: true }
    case "SUCCESS_GET_POST_COMMENTS":
      return {...state, currentPostComments: action.payload, loading: false} 
    case "FAV_POSTS":
      return { ...state, favPosts: action.payload, loading: true }; 
    case "SUCCESS_FAV_POSTS":
      return { ...state, favPosts: action.payload, loading: false }; 
    default:
      return { ...state };
  }
};
