/**
 * Created by texpe on 30/12/2016.
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
        mongoose.Promise = global.Promise;
        mongoose.connect(this.options.mongoURL, err => {
            if(err) console.error(err);
        });
    }

    initEngine() {
        this.app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
        this.app.use(require('cors')());
    }

    initRoutes() {
        this.app.use(require('./server/routes'));
    }

    finalInit() {
        this.app.listen(this.options.port, this.options.ip, () => {
            console.log(`Server listening on ${this.options.ip}:${this.options.port}`);
        });
    }
}

module.exports = Server;