const initialState =  {
  currentUser: {
    first_name: "",
    last_name: "",
    email: ""
  }
};

export const userReducer = (state = initialState, action) => {
  let response = action.response
  switch (action.type) {
    case "SIGNUP":
      return { ...state, ...action.userData };

    case "LOGIN":
      return { ...state, ...action.userData, response };

    case "SUCCESS_AUTH":
      return {
        ...state,
        user: action.payload
      };

    case "GET_USER_DATA":
      return { ...state, user: action.payload, loading: true  };

    case "SUCCESS_GET_USER":
      return { ...state, currentUser: action.payload, loading: false };

    default:
      return state;
  }
};