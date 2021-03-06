import React from "react";

import classes from "./Todo.css";
import { IconButton } from "@material-ui/core";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";

const Todo = props => {
  const todoClass = props.done
    ? [classes.container, classes.done].join(" ")
    : classes.container;
  return (
    <div className={classes.row}>
      <div className={todoClass} onClick={props.changeState}>
        {props.todo}
      </div>
      {props.onDelete !== null && (
        <IconButton
          color="secondary"
          onClick={props.onDelete}
          style={{ display: "inline-block" }}
        >
          <DeleteOutline />
        </IconButton>
      )}
      {props.onEdit !== null && (
        <IconButton
          color="primary"
          onClick={props.onEdit}
          style={{ display: "inline-block" }}
        >
          <EditOutlined />
        </IconButton>
      )}
    </div>
  );
};

export default Todo;
