import React, { useState } from "react";

import classes from "./TextInput.css";

const TextInput = props => {
  let errorClass = props.errorMsg
    ? [classes.error, classes.show].join(" ")
    : classes.error;
  return (
    <div className={classes.inputBox}>
      <p className={classes.label}>{props.label}</p>
      <input
        className={classes.input}
        type={props.password ? "password" : "text"}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onLeave}
        value={props.value}
      />
      <p className={errorClass}> {props.errorMsg} </p>
    </div>
  );
};

export default TextInput;
