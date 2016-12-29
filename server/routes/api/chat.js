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

        Chat.ChatList.findOne({ Username: user.Username }, function (err, list) {
            if (err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);

            res.json({ success: true, result: list || [] }).end();
        });
    });
});

module.exports = router;