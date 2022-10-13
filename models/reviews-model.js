const db = require("../db/connection");

exports.selectReviews = (sort_by = "created_at", order = "DESC", category) => {
  const validCategories = [
    "strategy",
    "hidden-roles",
    "dexterity",
    "push-your-luck",
    "roll-and-write",
    "deck-building",
    "engine-building",
    "jigsaw",
  ];
  const validOrder = ["ASC", "DESC"];
  if (category) {
    if (!validCategories.includes(category)) {
      return Promise.reject({
        status: 400,
        msg: "category does not exist",
      });
    }
  }
  if (category) {
    return db
      .query(
        `
      SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.category = $1
      GROUP BY reviews.review_id
      ORDER BY ${sort_by} ${order}
      `,
        [category]
      )
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "sorry, no reviews found for this category",
          });
        }
        return result.rows;
      });
  } else
    return db
      .query(
        `
    SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order}
    ;`
      )
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "sorry, no reviews found",
          });
        }
        return result.rows;
      });
};

exports.selectReviewsByID = (review_id) => {
  return db
    .query(
      `
    SELECT reviews.*, COUNT(reviews.review_id) AS comment_count
    FROM reviews 
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id=$1
    GROUP BY reviews.review_id
`,
      [review_id]
    )
    .then(({ rows: [review] }) => {
      if (review) {
        return review;
      }
      return Promise.reject({ status: 404, msg: "ID NOT FOUND" });
    });
};

exports.updateVotes = (review_id, votes) => {
  if (!votes) {
    return Promise.reject({ status: 400, msg: "wrong input" });
  } else {
    return db
      .query(
        `UPDATE reviews SET votes=votes+$1 WHERE review_id=$2 RETURNING *`,
        [votes, review_id]
      )
      .then(({ rows: [review] }) => {
        if (review === undefined) {
          return Promise.reject({ status: 404, msg: "ID NOT FOUND" });
        }
        return review;
      });
  }
};
