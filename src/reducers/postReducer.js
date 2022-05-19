const initialState = {
  posts: [],
  currentPost: {
    title: "",
    description: "",
    comments: [],
    likes: []
  },
  errors: "",
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
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
    case "SET_COMMENT":
      return { ...state };
    case "EDIT_COMMENT":
      return { ...state, loading: false}
    case "DELETE_COMMENT":
        return { ...state };
    case "UPDATE_LIKES":
      return {...state };
    default:
      return { ...state };
  }
};
