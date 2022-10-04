const mongoose = require("mongoose");
const User = require("../models/user");

const commentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1, max: 5
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        username: {
            type: String,
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);