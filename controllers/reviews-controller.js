const {selectReviewsByID} = require("../models/reviews-model")


exports.getReviewByID = ((req, res, next)=>{
    const id = req.params.review_id
    selectReviewsByID(id).then((review)=>{
        res.status(200).send({review})
    })
    .catch((err)=>{
        next(err)
    })
    
})