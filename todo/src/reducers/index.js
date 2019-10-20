import auth from "./auth";
import users from "./users";
import todos from "./todos";
import { combineReducers } from "redux";

export default combineReducers({
  auth,
  users,
  todos
});
