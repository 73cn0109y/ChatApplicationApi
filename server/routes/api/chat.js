'use strict';

/**
 * Created by texpe on 30/12/2016.
 */

var router = require('express').Router();
var User = require('../../models/user');
var Chat = require('../../models/chat');
var utils = require('../../utils');
var uuid = require('uuid');

router.get('/list', function (req, res, next) {
    User.findOne({ AccessTokens: req.query.token }, 'Username', function (err, user) {
        if (err || !user) return utils.jsonResponse(res, { message: 'No user found' }, 400);

        Chat.ChatList.find({ $or: [{ 'Sender.Username': user.Username }, { 'Recipient.Username': user.Username }] }, function (err, list) {
            if (err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);

            res.json({ success: true, result: list || [] }).end();
        });
    });
});

router.get('/:id', function (req, res, next) {
    Chat.ChatList.findOne({ _id: req.params.id }, function (err, info) {
        if (err || !info) return utils.jsonResponse(res, { message: 'Invalid chat id' }, 400);
        res.json({ success: true, info: info }).end();
    });
});

router.post('/:id', function (req, res, next) {
    req.body.ChatId = req.params.id;
    var message = Chat.ChatMessage(req.body);

    message.save(function (err) {
        if (err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
        res.json({ success: true, id: message._id }).end();
    });

    Chat.ChatList.update({ _id: req.params.id }, { LastMessage: message.Message, LastTimestamp: message.Timestamp }, function (err, info) {
        if (err) console.error(err);
    });
});

router.get('/:id/history', function (req, res, next) {
    if (!req.params.id) return utils.jsonResponse(res, { message: 'No id provided' }, 400);

    var limit = req.query.limit || 25;
    var offset = req.query.offset || 0;

    Chat.ChatMessage.find({ ChatId: req.params.id }).skip(offset).limit(limit).exec(function (err, history) {
        console.log(history);
        console.log("id: " + req.params.id);
        if (err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
        res.json({ success: true, history: history });
    });
});

router.put('/list/:target', function (req, res, next) {
    User.findOne({ AccessTokens: req.query.token }, 'Username DisplayName', function (err, sender) {
        if (err || !sender) return utils.jsonResponse(res, { message: 'No user found' }, 400);

        User.findOne({ Username: req.params.target }, 'Username DisplayName', function (err, recipient) {
            if (err || !recipient) return utils.jsonResponse(res, { message: 'No user found' }, 400);

            var list = new Chat.ChatList({
                Sender: {
                    Username: sender.Username,
                    DisplayName: sender.DisplayName
                },
                Recipient: {
                    Username: recipient.Username,
                    DisplayName: recipient.DisplayName
                }
            });

            list.save(function (err) {
                if (err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
                res.json({ success: true, list: list }).end();
            });
        });
    });
});

module.exports = router;