import { SET_USERS, SET_SELECTED_USER } from "../actions/users";

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case SET_SELECTED_USER:
      return state.map(user =>
        user._id === action.id
          ? { ...user, active: true }
          : { ...user, active: false }
      );
    default:
      return state;
  }
};
