export const LOGIN = "LOGIN";

export const LOGOUT = "LOGOUT";

export const SET_ROLE = "SET_ROLE";

export const login = (token, username) => {
  return {
    type: LOGIN,
    token,
    username
  };
};
export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const setRole = role => {
  return {
    type: SET_ROLE,
    role
  };
};
