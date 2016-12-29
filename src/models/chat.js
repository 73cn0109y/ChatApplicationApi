/**
 * Created by texpe on 30/12/2016.
 */

const mongoose = require('mongoose');
const uuid = require('uuid');

const ChatMessageSchema = new mongoose.Schema({
    _id: {
        type: String,
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

const ChatListSchema = new mongoose.Schema({
    _id: {
        type: String,
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
    Recipient: {
        type: String,
        required: true
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
}