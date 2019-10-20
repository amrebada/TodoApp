import React from "react";

import classes from "./ProfileCard.css";

const ProfileCard = props => {
  let containerClass = props.active
    ? [classes.container, classes.active].join(" ")
    : classes.container;
  return (
    <div className={containerClass} onClick={props.onClick}>
      <div className={classes.profile}>{props.name[0]}</div>
      <p>{props.name}</p>
    </div>
  );
};

export default ProfileCard;
