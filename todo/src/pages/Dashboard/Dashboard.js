import React from "react";

import classes from "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Users from "../../components/Users/Users";
import Todos from "../../components/Todos/Todos";

const Dashboard = props => {
  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.body}>
        <Users />
        <Todos />
      </div>
    </div>
  );
};

export default Dashboard;
