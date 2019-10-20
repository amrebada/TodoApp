import React from "react";

import classes from "./ProfileCard.css";
import { IconButton } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const ProfileCard = props => {
  let containerClass = props.active
    ? [classes.container, classes.active].join(" ")
    : classes.container;
  return (
    <div className={containerClass} onClick={props.onClick}>
      <div className={classes.profile}>{props.name[0]}</div>
      <p>{props.name}</p>
      <IconButton
        color="secondary"
        onClick={props.onDelete}
        style={{ display: "inline-block" }}
      >
        <DeleteOutline />
      </IconButton>
    </div>
  );
};

export default ProfileCard;
