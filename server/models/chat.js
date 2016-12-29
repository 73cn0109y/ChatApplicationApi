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

var ChatSchema = new mongoose.Schema({
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
    Messages: [ChatMessageSchema]
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
    Username: {
        type: String,
        required: true
    },
    Chats: [String] // array of chat id's
});

module.exports = {
    ChatList: mongoose.model('ChatList', ChatListSchema),
    Chat: mongoose.model('Chat', ChatSchema),
    ChatMessage: mongoose.model('ChatMessage', ChatMessageSchema)
};