export const SET_TODOS = "SET_TODOS";

export const setTodos = todos => {
  return {
    type: SET_TODOS,
    todos
  };
};
