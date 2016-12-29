'use strict';

/**
 * Created by texpe on 30/12/2016.
 */

var mongoose = require('mongoose');
var uuid = require('uuid');

var ChatMessageSchema = new mongoose.Schema({
    _id: {
        type: String,
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
    ChatId: {
        type: String,
        require: true
    },
    Sender: {
        type: String,
        required: true
    },
    Recipient: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now
    }
});

var ChatListSchema = new mongoose.Schema({
    _id: {
        type: String,
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
    Sender: {
        Username: String,
        DisplayName: String
    },
    Recipient: {
        Username: String,
        DisplayName: String
    },
    LastMessage: {
        type: String,
        default: 'No messages yet...'
    },
    LastTimestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    ChatList: mongoose.model('ChatList', ChatListSchema),
    ChatMessage: mongoose.model('ChatMessage', ChatMessageSchema)
};