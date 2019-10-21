const Todos = require("../models/todos");
const ErrorTypes = require("../models/constants/ErrorTypes");
const ApiError = require("../models/constants/ApiError");
const bcrypt = require("bcrypt");
const config = require("../../config.json");
const { JWT, JWK } = require("jose");
const mongoose = require("mongoose");

const auth = require("./auth.controller");

class Todo {
  async create(token, todo) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = new Todos({
      todo,
      status: "doing",
      userId: user._id,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
    return await _todo.save();
  }
  async edit(token, todoID, todo) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = await Todos.findById(todoID);

    if (_todo.userId != user.id && user.role !== 1) {
      throw ApiError(ErrorTypes.FORBIDDEN, " Cannot edit this todo");
    }
    _todo.todo = todo;

    return await Todos.findByIdAndUpdate(todoID, _todo);
  }
  async changeStatus(token, todoID) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = await Todos.findById(todoID);

    if (_todo.userId != user.id && user.role !== 1) {
      throw ApiError(ErrorTypes.FORBIDDEN, " Cannot edit this todo");
    }
    _todo.status = _todo.status === "doing" ? "done" : "doing";

    return await Todos.findByIdAndUpdate(todoID, _todo);
  }
  async delete(token, todoID) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = await Todos.findById(todoID);
    if (user.role !== 1) {
      throw ApiError(ErrorTypes.FORBIDDEN, " Cannot delete this todo");
    }

    return await Todos.findByIdAndDelete(todoID);
  }
  async getTodo(token, todoID) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = await Todos.findById(todoID);
    if (_todo.userId !== user.id && user.role !== 1) {
      throw ApiError(ErrorTypes.FORBIDDEN, " Cannot get this todo");
    }

    return _todo;
  }
  async getByUser(token) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = await Todos.find({ userId: user.id });

    return _todo;
  }
  async getByUserId(token, userId) {
    let user = await auth.getUserByToken(token);
    if (!user) {
      throw ApiError(ErrorTypes.NOT_FOUND, " user not found");
    }
    let _todo = await Todos.find({ userId });

    return _todo;
  }
}
module.exports = new Todo();
