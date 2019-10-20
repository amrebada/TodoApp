import { SET_TODOS } from "../actions/todos";

export default (state = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;

    default:
      return state;
  }
};
