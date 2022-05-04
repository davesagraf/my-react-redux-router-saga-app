export const GET_USER_DATA = "GET_USER_DATA";
export const SUCCESS_AUTH = "SUCCESS_AUTH";
export const ERROR_AUTH = "ERROR_AUTH";
export const SIGNUP = "SIGNUP";
export const LOGIN = 'LOGIN'
export const SUCCESS_GET_USER = "SUCCESS_GET_USER"

export const signUp = (userData) => {
  return {
    type: SIGNUP,
    userData,
  };
};

export const logIn = (userData) => {
  return {
    type: LOGIN,
    userData,
  };
};

export const authSuccess = (userData) => {
  return {
    type: SUCCESS_AUTH,
    userData
  }
}

export const authError = (userData) => {
  return {
    type: ERROR_AUTH,
    userData
  }
}

export const getUserData = () => {
  return {
    type: GET_USER_DATA
  };
};