const {fetchCommentsByreviewID} = require("../models/comments-model")


exports.getCommentsByReviewID = (req, res, next) => {
    const {review_id} = req.params;
    fetchCommentsByreviewID(review_id).then((comments) => {
        res.status(200).send({comments: comments})
    })
    .catch((err) => {
        next(err)
    })
}