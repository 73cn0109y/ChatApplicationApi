'use strict';

/**
 * Created by texpe on 30/12/2016.
 */

var router = require('express').Router();

router.use(require('./auth'));
router.use('/api', require('./api/chat'));

module.exports = router;