/**
 * Created by texpe on 30/12/2016.
 */

const router = require('express').Router();
const User = require('../../models/user');
const utils = require('../../utils');

router.get('/search/:fragment', (req, res, next) => {
    if(!req.params.fragment) return utils.jsonResponse(res, { message: 'No parameter specified' }, 400);

    User.findOne({ AccessTokens: req.query.token }, 'Username', (err, user) => {
        if(err || !user) return utils.jsonResponse(res, { message: 'Internal error' }, 500);

        User.find({
            Username: {
                $regex: req.params.fragment,
                $options: 1
            }
        }, 'Username DisplayName', (err, results) => {
            if (err) return res.json({ success: false, results: [] }).end();
            for(let i = 0; i < results.length; i++) {
                if(results[i].Username === user.Username) {
                    results.splice(i, 1);
                    break;
                }
            }
            res.json({ success: true, results: results }).end();
        });
    });
});

router.get('/:token', (req, res, next) => {
    if(!req.params.token) return res.json({ success: false }).end();

    User.findOne({ AccessTokens: req.params.token }, (err, user) => {
        if(err || !user) return res.json({ success: false }).end();

        res.json({ success: true, user: user }).end();
    });
});

module.exports = router;