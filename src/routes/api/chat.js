/**
 * Created by texpe on 30/12/2016.
 */

const router = require('express').Router();
const User = require('../../models/user');
const Chat = require('../../models/chat');
const utils = require('../../utils');
const uuid = require('uuid');

router.get('/list', (req, res, next) => {
    User.findOne({ AccessTokens: req.query.token }, 'Username', (err, user) => {
        if(err || !user) return utils.jsonResponse(res, { message: 'No user found' }, 400);

        Chat.ChatList.find({ $or: [ { 'Sender.Username': user.Username }, { 'Recipient.Username': user.Username } ] }, (err, list) => {
            if(err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);

            res.json({ success: true, result: list || [] }).end();
        });
    });
});

router.get('/history', (req, res, next) => {
    if(!req.query.id) return utils.jsonResponse(res, { message: 'No id provided' }, 400);

    let limit = req.query.limit || 25;
    let offset = req.query.offset || 0;

    Chat.ChatMessage.find({ ChatId: req.query.id }, { limit: limit, offset: offset }, (err, history) => {
        if(err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
        res.json({ success: true, history: history });
    });
});

router.get('/:id', (req, res, next) => {
    Chat.ChatList.findOne({ _id: req.params.id }, (err, info) => {
        if(err || !info) return utils.jsonResponse(res, { message: 'Invalid chat id' }, 400);
        res.json({ success: true, info: info }).end();
    });
});

router.put('/list/:target', (req, res, next) => {
    User.findOne({ AccessTokens: req.query.token }, 'Username DisplayName', (err, sender) => {
        if(err || !sender) return utils.jsonResponse(res, { message: 'No user found' }, 400);

        User.findOne({ Username: req.params.target }, 'Username DisplayName', (err, recipient) => {
            if(err || !recipient) return utils.jsonResponse(res, { message: 'No user found' }, 400);

            let list = new Chat.ChatList({
                Sender: {
                    Username: sender.Username,
                    DisplayName: sender.DisplayName
                },
                Recipient: {
                    Username: recipient.Username,
                    DisplayName: recipient.DisplayName
                }
            });

            list.save(err => {
                if(err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
                res.json({ success: true, list: list }).end();
            });
        });
    });
});

router.post('/:id', (req, res, next) => {
    let message = Chat.ChatMessage(req.body);

    message.save(err => {
        if(err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
        res.json({ success: true, id: message._id }).end();
    })
});

module.exports = router;