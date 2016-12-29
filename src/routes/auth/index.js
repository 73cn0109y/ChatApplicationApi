/**
 * Created by texpe on 30/12/2016.
 */

const router = require('express').Router();
const utils = require('../../utils');
const User = require('../../models/user');
const UserExt = require('../../models/extensions/user');
const uuid = require('uuid');

router.post('/login', (req, res, next) => {
    if (!req.body) return utils.jsonResponse(res, { message: 'No data defined' }, 400);

    const requiredFields = [ 'Username', 'Password' ];
    if (!utils.hasAllFields(req.body, requiredFields)) return utils.jsonResponse(res, { message: 'Missing required fields' }, 400);

    User.findOne({ Username: req.body.Username }, '+Password', (err, user) => {
        if (err || !user) return utils.jsonResponse(res, { message: 'No user found' }, 400);

        UserExt.Login(user, req.body.Password, result => {
            if (!result.success) return utils.jsonResponse(res, { message: 'Incorrect Username/Password' }, 400);

            const token = uuid();

            user.AccessTokens.push(token);

            user.save((err, result) => {
                if (err) return utils.jsonResponse(req, { message: 'Internal error' }, 500);
                res.json({
                    success: true,
                    token: token,
                    user: {
                        _id: user._id,
                        DisplayName: user.DisplayName,
                        Username: user.Username
                    }
                }).end();
            });
        });
    });
});

router.post('/register', (req, res, next) => {
    if (!req.body) return utils.jsonResponse(res, { message: 'No data defined' }, 400);

    const requiredFields = [ 'Username', 'DisplayName', 'Password' ];
    if (!utils.hasAllFields(req.body, requiredFields)) return utils.jsonResponse(res, { message: 'Missing required fields' }, 400);

    let user = new User(req.body);

    user.save((err, result) => {
        if (err) return utils.jsonResponse(res, { message: 'An error occured' }, 500);
        res.json({ success: true }).end();
    });
});

router.get('/logout', (req, res, next) => {
    if (!req.query.token) return res.json({ success: true }).end();

    User.update({ AccessToken: req.query.token }, { $pullAll: { AccessToken: [ req.query.token ] } }, (err, result) => {
        if (err) return utils.jsonResponse(res, { message: 'Internal error' }, 500);
        res.json({ success: true }).end();
    });
});

router.all('/*', (req, res, next) => {
    if (!req.url.startsWith('/api/users')) {
        if (!req.query || !req.query.token) return utils.jsonResponse(res, { message: 'Invalid access token' }, 404);
    }

    next();
});

module.exports = router;