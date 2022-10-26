const db = require("../db/connection");


exports.fetchCommentsByreviewID = (review_id) => {
  return db
    .query(
      `
    SELECT comments.*
    FROM comments
    LEFT JOIN users ON comments.author = users.username
    WHERE comments.review_id = $1
    ORDER BY created_at DESC;`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return db
          .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
          .then(({ rowCount }) => {
            console.log(rowCount);
            if (rowCount) {
              return [];
            }
            return Promise.reject({ status: 404, msg: "ID NOT FOUND" });
          });
      }
      return rows;
    });
};
exports.sendCommentByReviewID = (review_id, username, body) => {
  if(!username || !body){
    return Promise.reject({status: 400, msg: "wrong input"})
  }
  return db.query(
    `INSERT INTO comments (author, body, review_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,[username, body, review_id])
    .then (({rows}) =>{
      if(rows.length === 0){
        return Promise.reject({status:404, msg:"ID NOT FOUND"})
      }
      return rows[0];
    })
  }

