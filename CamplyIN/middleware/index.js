const Campground = require("../models/campground");
const Comment = require("../models/comment");

exports.isLoggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You are Not Logged In !!");
    res.redirect("/login");
}

exports.authCamp = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id)
            .then((campground) => {
                if (campground.author.id.equals(req.user._id)) {
                    req.foundCamp = campground;
                    return next();
                } else {
                    req.flash("error", "you do not have permission to do that !!");
                    res.redirect("back");
                }
            }).catch((err) => {
                // Cast Error (when someone shortens the length of ObjectId)
                // OR .... Error when someone changes the objectId without changing the length
                // OR .... Database Error
                req.flash("error", "Something went wrong ! can't find campground !!");
                res.redirect("/campgrounds");
            });
    } else {
        req.flash("error", "you are not logged in !!");
        res.redirect("back");
    }
}

exports.authComment = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId)
            .then((comment) => {
                if (comment.author.id.equals(req.user._id)) {
                    req.foundComment = comment;
                    return next();
                } else {
                    req.flash("error", "you do not have permission to do that !!");
                    res.redirect("back");
                }
            }).catch((err) => {
                // Cast Error (when someone shortens the length of ObjectId)
                // OR .... Error when someone changes the objectId without changing the length
                // OR .... Database Error
                req.flash("error", "something went wrong ! can't find comment !!");
                res.redirect(`/campgrounds/${req.params.id}`);
            });
    } else {
        req.flash("error", "you are not logged in !!");
        res.redirect("back");
    }
}

exports.verifyUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user._id.equals(req.params.id)) {
            return next();
        } else {
            req.flash("error", "You do not have permission to do that !");
            res.redirect("back");
        }
    } else {
        req.flash("error", "you are not logged in !!");
        res.redirect("back");
    }
}