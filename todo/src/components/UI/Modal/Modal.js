import React from "react";

import classes from "./Modal.css";

const Modal = props => {
  return (
    <React.Fragment>
      <div className={classes.container} onClick={props.close}></div>
      <div className={classes.body}>{props.children}</div>
    </React.Fragment>
  );
};

export default Modal;
