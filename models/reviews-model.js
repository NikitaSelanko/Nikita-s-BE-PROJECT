const db = require("../db/connection");

exports.selectReviews = () => {
  return db.query("SELECT * FROM reviews;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewsByID = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id =$1`, [review_id])
    .then(({ rows: [review] }) => {
      if (review) {
        return review;
      }
      return Promise.reject({ status: 404, msg: "ID NOT FOUND" });
    });
};

exports.updateVotes = (review_id, votes) => {
  if(!votes) {
    return Promise.reject({ status: 400, msg: "wrong input" });  
  } else {
  return db
  .query(`UPDATE reviews SET votes=votes+$1 WHERE review_id=$2 RETURNING *`,[votes, review_id])
  .then(({ rows: [review]})=>{
    return review;
    })
  }
}
