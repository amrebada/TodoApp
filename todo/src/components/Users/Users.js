import React, { useEffect, useState } from "react";

import classes from "./Users.css";
import ProfileCard from "../UI/ProfileCard/ProfileCard";
import ColorButton from "../UI/ButtonC/ButtonC";

import { connect } from "react-redux";
import { setUsers, setSelectedUser } from "../../actions/users";

import axios from "axios";
import { setTodos } from "../../actions/todos";
import Modal from "../UI/Modal/Modal";
import TextInput from "../UI/TextInput/TextInput";
import Checkbox from "../UI/Checkbox/Checkbox";
import { setRole } from "../../actions/auth";

const Users = props => {
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [userValue, setUserValue] = useState({ role: 0 });

  useEffect(() => {
    updateUsers();
  }, []);

  const selectUser = userId => {
    props.setSelectedUser(userId);

    axios
      .get(`http://localhost:4000/api/v1/todo?userId=${userId}`, {
        headers: { authorization: `Bearer ${props.auth.token}` }
      })
      .then(resp => {
        if (resp.data.success) {
          console.log(resp.data.data);
          props.setTodos(resp.data.data);
        }
      });
  };

  const deleteUser = userId => {
    axios
      .delete(`http://localhost:4000/api/v1/user?userId=${userId}`, {
        headers: { authorization: `Bearer ${props.auth.token}` }
      })
      .then(resp => {
        console.log(resp.data);
        if (resp.data.success) {
          updateUsers();
        }
      });
  };

  const updateUsers = () => {
    axios
      .get("http://localhost:4000/api/v1/user", {
        headers: { authorization: `Bearer ${props.auth.token}` }
      })
      .then(resp => {
        if (resp.data.success) {
          props.setUsers(resp.data.data);
          // setStateUsers(resp.data.data);
          props.setRole(1);
          setShow(true);
        } else {
          setShow(false);
          props.setRole(0);
        }
      });
  };

  const handleCreate = () => {
    setShowCreate(false);
    axios
      .post(
        `http://localhost:4000/api/v1/user`,
        {
          username: userValue.user,
          password: userValue.pass,
          role: userValue.role
        },
        {
          headers: { authorization: `Bearer ${props.auth.token}` }
        }
      )
      .then(resp => {
        if (resp.data.success) {
          updateUsers();
        }
      });
  };
  return (
    <div
      className={classes.container}
      style={show ? null : { display: "none" }}
    >
      {props.users.map((user, i) => (
        <ProfileCard
          key={user._id}
          name={user.username}
          active={user.active ? true : false}
          onClick={() => selectUser(user._id)}
          onDelete={
            user.username !== "admin" ? () => deleteUser(user._id) : null
          }
        />
      ))}

      <div className={classes.create}>
        <ColorButton onClick={() => setShowCreate(true)}>create +</ColorButton>
      </div>
      {showCreate && (
        <Modal close={() => setShowCreate(false)}>
          <h2>Create User</h2>
          <TextInput
            label="Username"
            onChange={evt => {
              const user = evt.target.value;
              setUserValue(prev => ({ ...prev, user }));
            }}
            onLeave={() => {}}
          />
          <TextInput
            label="Password"
            password
            onChange={evt => {
              const pass = evt.target.value;
              setUserValue(prev => ({ ...prev, pass }));
            }}
            onLeave={() => {}}
          />
          <Checkbox
            label="Admin"
            onChange={() =>
              setUserValue(prev => ({
                ...prev,
                role: prev.role === 1 ? 0 : 1
              }))
            }
          />

          <ColorButton onClick={handleCreate}> create</ColorButton>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth, users: state.users };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: users => dispatch(setUsers(users)),
    setSelectedUser: id => dispatch(setSelectedUser(id)),
    setTodos: todos => dispatch(setTodos(todos)),
    setRole: role => dispatch(setRole(role))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
