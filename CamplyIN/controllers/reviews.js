// import models
const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.lastUpdated = Date.now();
    console.log('New Review:', review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash('success', `Successfully added a review.`);
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findOneAndDelete(reviewId);
    req.flash('success', `Successfully deleted the review.`);
    res.redirect(`/campgrounds/${req.params.id}`);
}




// module.exports.createReview = async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     //create a new review
//     const review = new Review(req.body.review);
//     review.author = req.user._id;
//     //push review to campground
//     campground.reviews.push(review);
//     //save to database
//     await review.save();
//     await campground.save();
//     req.flash('success', 'Created new review!');
//     res.redirect(`/campgrounds/${campground._id}`);
// }

// module.exports.deleteReview = async (req, res) => {
//     const { id, reviewId } = req.params;
//     //first parameter in findByIdAndUpdate is user id and second parameter is object is pull.
//     //it pull all the reviews having id 'reviewId' and store it in 'reviews' array.
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     //delete the review, where id == reviewId
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/campgrounds/${id}`);
// }