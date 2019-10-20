export const LOGIN = "LOGIN";

export const LOGOUT = "LOGOUT";

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
