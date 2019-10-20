import React, { useState, useEffect, useRef } from "react";

import classes from "./Navbar.css";

import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  withStyles
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";

import logo from "../../assets/logo.svg";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Axios from "axios";

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const Navbar = props => {
  const logoutFrom = () => {
    setCookie("token", "", 1);
    setCookie("username", "", 1);
    props.logout();
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <img src={logo} className={classes.Applogo} />

        <div className={classes.actions}>
          <AccountCircle />
          <p className={classes.titleName}>{props.auth.username}</p>
          <p className={classes.logout} onClick={logoutFrom}>
            logout
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default connect(
  state => ({ auth: state.auth }),
  mapDispatchToProps
)(Navbar);
