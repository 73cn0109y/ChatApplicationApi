/**
 * Created by texpe on 30/12/2016.
 */

const io = require('socket.io');
const uuid = require('uuid');

class WebSocketServer {
    constructor(app) {
        this.socket = io(app, {
            origins: '*:*'
        });

        this.clients = new Map();

        this.init();
    }

    init() {
        const self = this;

        this.socket.on('connection', socket => {
            let socketInfo = {
                uuid: uuid(),
                Socket: socket
            };

            socket.on('disconnect', () => {
                this.clients.delete(socketInfo.uuid);
            });

            socket.on('userInfo', data => {
                socketInfo.UserInfo = data;
                this.clients.set(socketInfo.uuid, socketInfo);
            });

            socket.on('message', data => {
                this.clients.forEach(value => {
                    if(!value.UserInfo) return;
                    if(value.UserInfo.Username === data.Recipient.Username)
                        value.Socket.send(data);
                });
            });
        });
    }
}

module.exports = WebSocketServer;