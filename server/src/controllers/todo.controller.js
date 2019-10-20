const Users = require("../models/users");
const ErrorTypes = require("../models/constants/ErrorTypes");
const ApiError = require("../models/constants/ApiError");
const bcrypt = require("bcrypt");
const config = require("../../config.json");
const { JWT, JWK } = require("jose");

class Todo {
  async create(token, todo) {}
  async edit(token, todoID, todo) {}
  async changeStatus(token, todoID) {}
  async delete(token, todoID) {}
  async getTodo(token, todoId) {}
  async getByUser(token) {}
}
module.exports = new Todo();
