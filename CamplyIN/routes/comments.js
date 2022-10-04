const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const auth = require("../middleware");

// COMMENTS GET (RENDERS NEW COMMENT FORM)
router.get("/new", auth.isLoggedin, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            if (campground) {
                res.render("comments/new", { campground: campground });
            } else {
                req.flash("error", "Cannot find campground !!")
                res.redirect(`/campgrounds/${req.params.id}`);
            }

        }).catch((err) => {
            req.flash("error", "Cannot find campground !!")
            res.redirect(`/campgrounds/${req.params.id}`);
        });
});

// COMMENTS CREATE (POSTS NEW COMMENT)
router.post("/", auth.isLoggedin, (req, res) => {
    Campground.findById(req.params.id)
        .then((camp) => {
            Comment.create(req.body.comment)
                .then((comment) => {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save()
                        .then(() => {
                            res.redirect(`/campgrounds/${req.params.id}`);

                        }).catch((err) => { console.log("Error while posting comment\n", err) })

                }).catch((err) => {
                    console.log("Error while creating Comment\n", err);
                    req.flash("error", `something went wrong ${err.message}`);
                    res.redirect(`/campgrounds/${req.params.id}`);
                });

        }).catch((err) => {
            console.log("Camp Not Found\n", err);
            req.flash("error", "campground not found !!");
            res.redirect("/campgrounds");
        })
});

// COMMENTS EDIT (RENDERS EDIT COMMENT FORM)
router.get("/:commentId/edit", auth.authComment, (req, res) => {
    if (req.foundComment) {
        var comment = req.foundComment;
        res.render("comments/edit", {
            campground_id: req.params.id,
            comment: comment
        });
    } else {
        req.flash("error", "Something went wrong !!");
        res.redirect(`/campgrounds/${req.params.id}`);
    }
});

// COMMENTS UPDATE (UPDATES COMMENT)
router.put("/:commentId", auth.authComment, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment)
        .then((comment) => {
            req.flash("success", "comment updated !!");
            res.redirect(`/campgrounds/${req.params.id}`);
        }).catch((err) => {
            req.flash("error", `Something went wrong ${err.message}`);
            res.redirect(`/campgrounds/${req.params.id}`);
        });
});

// COMMENTS DELETE (DELETES A COMMENT)
router.delete("/:commentId", auth.authComment, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
        .then(() => {
            req.flash("success", "your comment was deleted !!");
            res.redirect(`/campgrounds/${req.params.id}`);

        }).catch((err) => {
            req.flash("error", "something went wrong, could not delete comment !!");
            res.redirect(`/campgrounds/${req.params.id}`);
        });
});

module.exports = router;