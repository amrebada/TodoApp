export const SET_USERS = "SET_USERS";

export const SET_SELECTED_USER = "SET_SELECTED_USER";

export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  };
};
export const setSelectedUser = id => {
  return {
    type: SET_SELECTED_USER,
    id
  };
};
