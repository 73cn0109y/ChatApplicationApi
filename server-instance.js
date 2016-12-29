/**
 * Created by texpe on 30/12/2016.
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

class Server {
    constructor(options) {
        this.options = options;
        this.app = express();

        this.initDB();
        this.initEngine();
        this.initRoutes();
        this.finalInit();
    }

    initDB() {
        /*this.session = session({
            secret: 'm39chm240dg90kh24ghk92h45c9gh4',
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
            cookie: {
                secure: false,
                httpOnly: false
            }
        });*/

        mongoose.Promise = global.Promise;
        mongoose.connect(this.options.mongoURL, err => {
            if(err) console.error(err);
        });

        //this.app.use(this.session);
    }

    initEngine() {
        this.app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
        this.app.use(require('cors')());
    }

    initRoutes() {
        this.app.use(require('./server/routes'));
    }

    finalInit() {
        let server = this.app.listen(this.options.port, this.options.ip, () => {
            console.log(`Server listening on ${this.options.ip}:${this.options.port}`);
        });
    }
}

module.exports = Server;