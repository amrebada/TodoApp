const express = require("express");
const router = express.Router();

router.get("/todo", (req, res) => {
  res.json({ message: "Hello" });
});

module.exports = router;
