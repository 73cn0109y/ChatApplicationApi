/**
 * Created by texpe on 30/12/2016.
 */

const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
        index: {
            unique: true
        },
        default: () => {
            return uuid();
        }
    },
    __v: {
        type: Number,
        select: false
    },
    Username: {
        type: String,
        required: true
    },
    DisplayName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
        select: false
    },
    AccessTokens: [ String ]
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('Password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.Password, salt, (err, hash) => {
            if (err) return next(err);

            user.Password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.Password, (err, isMatch) => {
        if (err) callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);