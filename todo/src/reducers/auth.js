import { LOGIN, LOGOUT } from "../actions/auth";
const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export default (
  state = {
    token: getCookie("token"),
    username: getCookie("user")
  },
  action
) => {
  switch (action.type) {
    case LOGOUT:
      return {
        token: "",
        username: ""
      };

    case LOGIN:
      return {
        token: action.token,
        username: action.username
      };

    default:
      return state;
  }
};
