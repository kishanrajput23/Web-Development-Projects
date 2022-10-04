// imports
const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewControls = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync.js');
const { validateReview, requireLogIn, isReviewAuthor } = require('../utils/middleware.js');

//catchAsync -> check for errors, if there is an error it is passed it to the next
//then in app.js their are error handler route, so they render error.ejs to display error (views/campground/error.ejs)
//catchAsync is present in utils directory

//validateReview -> automatic validate data entered by user on server side.
//here validateReview is used as an middleware
router.post('/', requireLogIn, validateReview, catchAsync(reviewControls.createReview));

router.delete('/:reviewId', requireLogIn, isReviewAuthor, catchAsync(reviewControls.deleteReview));

module.exports = router;

//isLoggedIn -> it is a middleware, checks wheather a user is loggedIn or not.
//it uses authentication (passport npm).
//path -> middleware.js