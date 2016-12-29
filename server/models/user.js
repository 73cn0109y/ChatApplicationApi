'use strict';

/**
 * Created by texpe on 30/12/2016.
 */

var mongoose = require('mongoose');
var uuid = require('uuid');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
        index: {
            unique: true
        },
        default: function _default() {
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
    AccessTokens: [String]
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('Password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.Password, salt, function (err, hash) {
            if (err) return next(err);

            user.Password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.Password, function (err, isMatch) {
        if (err) callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);