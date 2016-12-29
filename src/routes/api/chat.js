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

        Chat.ChatList.findOne({ Username: user.Username }, (err, list) => {
            if(err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);

            res.json({ success: true, result: list || [] }).end();
        });
    });
});

module.exports = router;