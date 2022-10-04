const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdated: Number
});

reviewSchema.virtual('lastUpdatedString').get(function () {
    const oneDay = 1000 * 60 * 60 * 24;
    const days = (Date.now() - this.lastUpdated) / oneDay;
    if (days < 1) {
        return 'Just today';
    } else if (days < 2) {
        return '1 day ago'
    }
    return Math.floor(days) + ' ago';
});

module.exports = mongoose.model("Review", reviewSchema);