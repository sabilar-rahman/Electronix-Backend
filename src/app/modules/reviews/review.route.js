const express = require("express");
const router = express.Router();

const ReviewController = require("./review.controller");

const { verifyToken } = require("../../middleware/verifyToken");

const verifyAdmin = require("../../middleware/verifyAdmin");




router.post("/post-review", verifyToken,ReviewController.postReview);
router.get("/total-reviews", ReviewController.getTotalReviewsCount); // this need to be first because of countDocuments({})

router.get("/:userId", ReviewController.getUserReviews);





module.exports = router;
