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
    console.log(token);

    return res.json(ApiResponse(token));
  } catch (error) {
    res.json(ApiResponse(null, error));
  }
});

module.exports = router;
