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
  const [showEdit, setShowEdit] = useState(false);
  const [editValue, setEditValue] = useState({});
  const [todoValue, setTodoValue] = useState("");
  useEffect(() => {
    updateTodos();
  }, []);
  const updateTodos = userId => {
    axios
      .get(
        `http://localhost:4000/api/v1/todo${userId ? "?userId=" + userId : ""}`,
        {
          headers: { authorization: `Bearer ${props.auth.token}` }
        }
      )
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

  const handleChangeState = (id, userId) => {
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
          updateTodos(userId);
        }
      });
  };

  const handleDeleteTodo = (id, userId) => {
    axios
      .delete(
        `http://localhost:4000/api/v1/todo/${id}`,

        {
          headers: { authorization: `Bearer ${props.auth.token}` }
        }
      )
      .then(resp => {
        console.log(resp.data);

        if (resp.data.success) {
          updateTodos(userId);
        }
      });
  };

  const showEditModal = (id, todo, userId) => {
    setEditValue({ id, todo, userId });
    setShowEdit(true);
  };

  const handleEdit = () => {
    axios
      .patch(
        `http://localhost:4000/api/v1/todo/${editValue.id}`,
        { todo: editValue.todo },
        {
          headers: { authorization: `Bearer ${props.auth.token}` }
        }
      )
      .then(resp => {
        setShowEdit(false);
        if (resp.data.success) {
          updateTodos(editValue.userId);
        } else {
          alert(resp.data.error.message);
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

      {showEdit && (
        <Modal close={() => setShowEdit(false)}>
          <h2>Edit Todo</h2>
          <TextInput
            label="Todo"
            onChange={evt => {
              const t = evt.target.value;
              setEditValue(prev => ({ ...prev, todo: t }));
            }}
            value={editValue.todo}
            onLeave={() => {}}
          />

          <ColorButton onClick={handleEdit}> Edit</ColorButton>
        </Modal>
      )}
      {props.todos.map(todo => (
        <Todo
          key={todo._id}
          todo={todo.todo}
          done={todo.status !== "doing"}
          changeState={() => handleChangeState(todo._id, todo.userId)}
          onDelete={
            props.auth.role && props.auth.role === 1
              ? () => handleDeleteTodo(todo._id, todo.userId)
              : null
          }
          onEdit={() => showEditModal(todo._id, todo.todo, todo.userId)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth, todos: state.todos };
};

export default connect(mapStateToProps)(Todos);
