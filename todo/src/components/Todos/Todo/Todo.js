import React from "react";

import classes from "./Todo.css";

const Todo = props => {
  const todoClass = props.done
    ? [classes.container, classes.done].join(" ")
    : classes.container;
  return (
    <div className={todoClass} onClick={props.changeState}>
      {props.todo}
    </div>
  );
};

export default Todo;
