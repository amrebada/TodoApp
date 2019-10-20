import React, { useState, useEffect } from "react";

import classes from "./Todos.css";
import Todo from "./Todo/Todo";
import Modal from "../UI/Modal/Modal";
import TextInput from "../UI/TextInput/TextInput";
import Checkboxe from "../UI/Checkbox/Checkbox";
import ColorButton from "../UI/ButtonC/ButtonC";

import { connect } from "react-redux";

import axios from "axios";
import { setTodos } from "../../actions/todos";

const Todos = props => {
  const [showCreate, setShowCreate] = useState(false);
  const [todoValue, setTodoValue] = useState("");
  useEffect(() => {
    updateTodos();
  }, []);
  const updateTodos = () => {
    axios
      .get(`http://localhost:4000/api/v1/todo`, {
        headers: { authorization: `Bearer ${props.auth.token}` }
      })
      .then(resp => {
        console.log(resp.data);
        if (resp.data.success) {
          props.dispatch(setTodos(resp.data.data));
        }
      });
  };
  const handleCreate = () => {
    setShowCreate(false);
    axios
      .post(
        `http://localhost:4000/api/v1/todo`,
        {
          todo: todoValue
        },
        {
          headers: { authorization: `Bearer ${props.auth.token}` }
        }
      )
      .then(resp => {
        console.log(resp.data);

        if (resp.data.success) {
          console.log("resp.data");

          updateTodos();
        }
      });
  };

  const handleChangeState = id => {
    axios
      .patch(
        `http://localhost:4000/api/v1/todo/${id}`,
        {},
        {
          headers: { authorization: `Bearer ${props.auth.token}` }
        }
      )
      .then(resp => {
        console.log(resp.data);

        if (resp.data.success) {
          updateTodos();
        }
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes.create}>
        <ColorButton onClick={() => setShowCreate(true)}>
          create todo +
        </ColorButton>
      </div>
      {showCreate && (
        <Modal close={() => setShowCreate(false)}>
          <h2>Create Todo</h2>
          <TextInput
            label="Todo"
            onChange={evt => {
              const t = evt.target.value;
              setTodoValue(t);
            }}
            onLeave={() => {}}
          />

          <ColorButton onClick={handleCreate}> create</ColorButton>
        </Modal>
      )}
      {props.todos.map(todo => (
        <Todo
          key={todo._id}
          todo={todo.todo}
          done={todo.status !== "doing"}
          changeState={() => handleChangeState(todo._id)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth, todos: state.todos };
};

export default connect(mapStateToProps)(Todos);
