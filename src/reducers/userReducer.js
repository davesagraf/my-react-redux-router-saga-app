const initialState =  [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, ...action.userData };

    case "LOGIN":
      return { ...state, ...action.userData };

    case "SUCCESS_AUTH":
      return {
        ...state,
        ...action.userData,
      };

    case "GET_USER_DATA":
      return { ...state, user: action.payload, loading: true  };

    case "SUCCESS_GET_USER":
      return { ...state, currentUser: action.payload, loading: false };

    default:
      return state;
  }
};
