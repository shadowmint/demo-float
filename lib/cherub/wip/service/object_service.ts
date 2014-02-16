/// <reference path="__init__.ts"/>

/* Module */
module service {

    /* Config */
    var SERVICE_KEY = 'object';

    /* Protocol keys */
    var OBJECT_DESTROY = 'object_destroy';
    var OBJECT_CREATE = 'object_create';
    var OBJECT_MOVE = 'object_move';

    /* Websocket interaction service */
    export class ObjectService extends ServiceBase {

        /* Callback to invoke when we get a broadcast message */
        broadcast_callback:any;

        constructor() {
            super();
            this.broadcast_callback = null;
            this.service_key = SERVICE_KEY;

            /* Protocol handlers */
            var self = this;
            this.protocol = {}
            this.protocol[OBJECT_MOVE] = function (data) {
                self._handle_destroy(data);
            };
            this.protocol[OBJECT_CREATE] = function (data) {
                self._handle_create(data);
            };
            this.protocol[OBJECT_DESTROY] = function (data) {
                self._handle_move(data);
            };
        }

        /* Handle destroy event */
        _handle_destroy(data:any):void {
        }

        /* Handle create event */
        _handle_create(data:any):void {
        }

        /* Handle move event */
        _handle_move(data:any):void {
        }
    }
}
