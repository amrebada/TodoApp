import React, { useEffect } from "react";

import classes from "./App.css";

import { connect } from "react-redux";

import Login from "../Login/Login";

function App(props) {
  return props.auth.token ? <div>fr</div> : <Login />;
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
