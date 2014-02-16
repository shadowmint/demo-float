/// <reference path="__init__.ts"/>

/* Module */
module service {

    /* Config */
    var SERVICE_KEY = 'chat';

    /* Protocol keys */
    var BROADCAST_REQUEST = 'broadcast_request';
    var BROADCAST_PUBLISH = 'broadcast_publish';

    /* Websocket interaction service */
    export class ChatService extends ServiceBase {

        /* Callback to invoke when we get a broadcast message */
        broadcast_callback:any;

        constructor() {
            super();
            this.broadcast_callback = null;
            this.service_key = SERVICE_KEY;

            /* Protocol handlers */
            var self = this;
            this.protocol = {}
            this.protocol[BROADCAST_PUBLISH] = function (data) {
                self._handle_broadcast(data);
            };
        }

        /* Broadcast a message */
        broadcast(message:any):void {
            this.socket.send({_type: SERVICE_KEY, type: BROADCAST_REQUEST, message: message});
        }

        /* Attach a handler for broadcast messages */
        on_broadcast(handler:any):void {
            this.broadcast_callback = handler;
        }

        /* Handle successful connection to session */
        _handle_broadcast(data:any):void {
            if (this.broadcast_callback) {
                this.broadcast_callback(data.name, data.message);
            }
        }
    }
}
