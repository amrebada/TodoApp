import React, { useEffect } from "react";

import classes from "./App.css";

import { connect } from "react-redux";

import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";

function App(props) {
  return props.auth.token ? <Dashboard /> : <Login />;
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
