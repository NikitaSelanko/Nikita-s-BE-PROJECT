const db = require("../db/connection");

exports.selectReviews = () => {
  return db.query("SELECT * FROM reviews;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewsByID = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id =$1`, [id])
    .then(({ rows: [review] }) => {
      if (review) {
        return review;
      }
      return Promise.reject({ status: 404, msg: "ID NOT FOUND" });
    });
};
