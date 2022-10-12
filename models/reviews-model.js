const db = require("../db/connection");

exports.selectReviews = () => {
  return db.query("SELECT * FROM reviews;").then((data) => {
    return data.rows;
  });
};

exports.selectReviewsByID = (review_id) => {
  return db
    .query(`
    SELECT reviews.*, COUNT(reviews.review_id) AS comment_count
    FROM reviews 
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id=$1
    GROUP BY reviews.review_id
`, [review_id])
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
    if(review === undefined){
      return Promise.reject({ status: 404, msg: "ID NOT FOUND" });
    }
       return review
   
    })
  }
}
