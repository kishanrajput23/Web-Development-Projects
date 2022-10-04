const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// this creates username & password fields in the UserSchema
UserSchema.plugin(passportLocalMongoose);

UserSchema.virtual('capitalized').get(function () {
    const arr1 = (this.username).split(' ');
    const arr2 = arr1.map(s => s.slice(0, 1).toUpperCase() + s.slice(1));
    return arr2.join(' ');
});

module.exports = mongoose.model('User', UserSchema);