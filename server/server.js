const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const config = require("./config.json");
const authFilter = require("./src/filters/auth.filter");
const routes = require("./src/routes/index");

const cors = require("cors");

app.use(
  cors({
    origin: "*"
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authFilter);
app.use("/api/v1", routes);

app.all("*", (req, res) => {
  res.status(400).json({ error: "Not found" });
});

//Database
mongoose.connect(config.DB_URL, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("connected to Database successfully");
});

//Start server on port 4000
app.listen(4000, () => {
  console.log("TODO app listening on port 4000!");
});
