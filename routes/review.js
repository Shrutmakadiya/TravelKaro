const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewsControllers = require("../controllers/reviews");

// POST route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsControllers.createReview));

// delete review
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewsControllers.deleteReview)
)

module.exports = router;