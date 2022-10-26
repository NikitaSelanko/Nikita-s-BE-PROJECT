const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories-controller");
const { getReviewByID, patchVotes, getReviews} = require("./controllers/reviews-controller");
const {getUsers} = require("./controllers/users-controller");
const {handleInternalErrors, handleCustomErrors, handlePSQLErrors} = require("./controllers/error-controllers");
const {getCommentsByReviewID,postCommentsByReviewID} = require("./controllers/comments-controller")


app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewByID);
app.get("/api/users", getUsers);
app.patch("/api/reviews/:review_id",patchVotes);
app.get("/api/reviews", getReviews)
app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.post("/api/reviews/:review_id/comments", postCommentsByReviewID)



// Error handeling
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);



module.exports = app;
