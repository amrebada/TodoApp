const express = require("express");
const ApiError = require("../models/constants/ApiError");
const ApiResponse = require("../models/constants/ApiResponse");
const ErrorTypes = require("../models/constants/ErrorTypes");
const router = express.Router();

const controller = require("../controllers/todo.controller");

router.post("/todo", async (req, res) => {
  try {
    const token = req.token;
    const { todo } = req.body;

    if (!todo) {
      throw ApiError(ErrorTypes.BAD_REQUEST, "Empty Todo");
    }
    const resp = await controller.create(token, todo);
    return res.json(ApiResponse(resp));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.get("/todo", async (req, res) => {
  try {
    const token = req.token;

    const resp = await controller.getByUser(token);

    return res.json(ApiResponse(resp));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const token = req.token;

    const todoId = req.params.id;

    const resp = await controller.getTodo(token, todoId);

    return res.json(ApiResponse(resp));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const token = req.token;

    const todoId = req.params.id;

    const resp = await controller.delete(token, todoId);

    return res.json(ApiResponse(resp));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.patch("/todo/:id", async (req, res) => {
  try {
    const token = req.token;

    const todoId = req.params.id;

    const { todo } = req.body;
    let resp;
    if (todo) {
      resp = await controller.edit(token, todoId, todo);
    } else {
      resp = await controller.changeStatus(token, todoId);
    }

    return res.json(ApiResponse(resp));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

module.exports = router;
