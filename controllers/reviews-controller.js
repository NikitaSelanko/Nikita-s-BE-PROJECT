const { selectReviewsByID, updateVotes, selectReviews } = require("../models/reviews-model");

exports.getReviewByID = (req, res, next) => {
  const id = req.params.review_id;
  selectReviewsByID(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) =>{
  const queries = req.query
  selectReviews(queries.sort_by, queries.order, queries.category).then((reviews)=>{
    res.status(200).send({reviews})
  })
  .catch((err)=>{
    next(err)
  })
}

exports.patchVotes = (req, res, next) => {
  const review_id = req.params.review_id;
  const votes = req.body.inc_votes;

  updateVotes(review_id, votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
