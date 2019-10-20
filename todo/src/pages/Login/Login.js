import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Login.css";

import logo from "../../assets/logo.svg";

import { logout, login } from "../../actions/auth";
import TextInput from "../../components/UI/TextInput/TextInput";
import Button from "../../components/UI/ButtonC/ButtonC";

import axios from "axios";

const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
const Login = props => {
  useEffect(() => {
    setCookie("token", "", 1);
    setCookie("username", "", 1);
    props.logout();
  }, []);

  const [userError, setUserError] = useState({
    user: undefined,
    pass: undefined
  });
  const [userValue, setUserValue] = useState({ user: "", pass: "" });

  const handleError = isUser => {
    isUser
      ? userValue.user === ""
        ? setUserError(prev => ({ ...prev, user: "please enter user name" }))
        : setUserError(prev => ({ ...prev, user: undefined }))
      : userValue.pass === ""
      ? setUserError(prev => ({ ...prev, pass: "please enter password" }))
      : setUserError(prev => ({ ...prev, pass: undefined }));
  };

  const handleSubmit = () => {
    if (userValue.user !== "" && userValue.pass !== "") {
      axios
        .post("http://localhost:4000/api/v1/login", {
          username: userValue.user,
          password: userValue.pass
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data.success) {
              setCookie("token", resp.data.data.token, 1);
              setCookie("username", userValue.user, 1);
              props.login(resp.data.data.token, userValue.user);
            }
          }
        });
    }
    handleError(true);
    handleError(false);
  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>
          <img src={logo} className={classes.image} />
          Login
        </div>
        <div className={classes.body}>
          <TextInput
            label="Username"
            onChange={evt => {
              const user = evt.target.value;
              setUserValue(prev => ({ ...prev, user }));
            }}
            onLeave={() => handleError(true)}
            errorMsg={userError.user}
          />
          <TextInput
            label="Password"
            password
            onChange={evt => {
              const pass = evt.target.value;
              setUserValue(prev => ({ ...prev, pass }));
            }}
            onLeave={() => handleError(false)}
            errorMsg={userError.pass}
          />
          <div className={classes.submit}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "50%", fontSize: "1.3rem" }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    login: (token, username) => dispatch(login(token, username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
