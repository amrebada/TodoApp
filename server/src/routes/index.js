const express = require("express");
const router = express.Router();

const auth = require("./auth.route");
const todos = require("./todo.routes");

router.use(auth);
router.use(todos);

module.exports = router;
