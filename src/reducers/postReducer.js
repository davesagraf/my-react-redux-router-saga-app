const initialState = {
  posts: [],
  currentPost: {
    title: "",
    description: "",
    comments: [],
    likes: [],
    commentLikes: [],
    showComments: false
  },
  favPosts: [],
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
    case "ADD_LIKE":
      return {...state };
    case "REMOVE_LIKE":
      return {...state } ; 
    default:
      return { ...state };
  }
};
