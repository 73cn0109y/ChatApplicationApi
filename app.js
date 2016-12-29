/**
 * Created by texpe on 30/12/2016.
 */

'use-strict';

const server = require('./server-instance');

const ip = '0.0.0.0';
const port = 8080;
const mongoURL = 'mongodb://localhost:27017/chat';

new server({
    ip,
    port,
    mongoURL
});