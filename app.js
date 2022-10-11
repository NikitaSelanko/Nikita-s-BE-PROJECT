const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories-controller");
const { getReviewByID, patchVotes} = require("./controllers/reviews-controller");
const {getUsers} = require("./controllers/users-controller")
const {handleIternalErrors,handleCustomErrors, handlePSQLErrors} = require("./controllers/error-controllers")


app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewByID);
app.get("/api/users", getUsers);
app.patch("/api/reviews/:review_id",patchVotes);




// Error handeling
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleIternalErrors);



module.exports = app;
