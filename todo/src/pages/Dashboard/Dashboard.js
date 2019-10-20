import React from "react";

import classes from "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Users from "../../components/Users/Users";

const Dashboard = props => {
  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.body}>
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
