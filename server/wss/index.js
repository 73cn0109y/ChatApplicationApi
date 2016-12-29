'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by texpe on 30/12/2016.
 */

var io = require('socket.io');
var uuid = require('uuid');

var WebSocketServer = function () {
    function WebSocketServer(app) {
        _classCallCheck(this, WebSocketServer);

        this.socket = io(app, {
            origins: '*:*'
        });

        this.clients = new Map();

        this.init();
    }

    _createClass(WebSocketServer, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var self = this;

            this.socket.on('connection', function (socket) {
                var socketInfo = {
                    uuid: uuid(),
                    Socket: socket
                };

                socket.on('disconnect', function () {
                    _this.clients.delete(socketInfo.uuid);
                });

                socket.on('userInfo', function (data) {
                    socketInfo.UserInfo = data;
                    _this.clients.set(socketInfo.uuid, socketInfo);
                });

                socket.on('message', function (data) {
                    _this.clients.forEach(function (value) {
                        if (!value.UserInfo) return;
                        if (value.UserInfo.Username === data.Recipient.Username) value.Socket.send(data);
                    });
                });
            });
        }
    }]);

    return WebSocketServer;
}();

module.exports = WebSocketServer;