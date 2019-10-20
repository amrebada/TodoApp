const express = require("express");
const ApiError = require("../models/constants/ApiError");
const ApiResponse = require("../models/constants/ApiResponse");
const ErrorTypes = require("../models/constants/ErrorTypes");
const router = express.Router();

const controller = require("../controllers/auth.controller");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username && !password) {
      throw ApiError(ErrorTypes.BAD_REQUEST, "username or password not passed");
    }

    const token = await controller.login(username, password);

    return res.json(ApiResponse(token));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.token;

    let users = await controller.getAllUsers(token);

    res.json(ApiResponse(users));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.delete("/user", async (req, res) => {
  try {
    const token = req.token;

    const { userId } = req.body;
    if (!userId) {
      throw ApiError(ErrorTypes.BAD_REQUEST, "user ID not passed");
    }
    let users = await controller.delete(token, userId);

    res.json(ApiResponse(users));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

router.post("/user", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const token = req.token;

    if (!username && !password) {
      throw ApiError(ErrorTypes.BAD_REQUEST, " username or password is empty");
    }

    let user = await controller.create(
      token,
      username,
      password,
      role ? role : 0
    );

    res.json(ApiResponse(user));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

module.exports = router;
