const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories-controller");
const { getReviewByID } = require("./controllers/reviews-controller");
const {getUsers} = require("./controllers/users-controller")

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewByID);
app.get("/api/users", getUsers)

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "wrong input" });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
