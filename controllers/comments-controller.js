const {fetchCommentsByreviewID, sendCommentByReviewID} = require("../models/comments-model")



exports.getCommentsByReviewID = (req, res, next) => {
    const {review_id} = req.params;
    fetchCommentsByreviewID(review_id).then((comments) => {
        res.status(200).send({comments: comments})
    })
    .catch((err) => {
        next(err)
    })
}
// exports.postCommentsByReviewID = (req, res, next) => {
//     const review_id = req.params.review_id;
//     const body = req.body.body;
//     const author = req.body.username;
//     sendCommentByReviewID(body, author, review_id)
//       .then((comment) => {
//         res.status(201).send({ comment });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   };
  
  exports.postCommentsByReviewID = (req, res, next) => {
    const { review_id } = req.params;
    const { username, body } = req.body;
  
    sendCommentByReviewID(review_id, username, body)
      .then((newComment) => {
        res.status(201).send({ newComment });
      })
      .catch(next);
  };