const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    ID: { type: String },
    Message: { type: String },
    Global: {
        type: Object,
    },
    Countries: {
        type: Array
    },
    Date: { type: String }
});

const Data = mongoose.model('data', dataSchema);
module.exports = Data;