const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  todo: mongoose.SchemaTypes.String,
  status: mongoose.SchemaTypes.String,
  userId: mongoose.SchemaTypes.ObjectId,
  createdAt: mongoose.SchemaTypes.Number,
  updatedAt: mongoose.SchemaTypes.Number
});

module.exports = mongoose.model("todos", schema);
