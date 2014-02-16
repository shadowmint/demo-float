/// <reference path="__init__.ts"/>

/* Common base for service objects */
class ServiceBase {

    /* Socket api */
    socket:any;

    /* The service key */
    service_key:any;

    /* Protocol handler */
    protocol:any;

    constructor() {
        this.socket = null;
        this.service_key = '';
    }

    /* Register on parent */
    bind(multiplexer):ServiceBase {
        this.socket = multiplexer;
        this.socket.register(this.service_key, this);
        return this;
    }

    /* Handle messages */
    message(data):void {
        if (this.protocol[data.type]) {
            this.protocol[data.type](data);
        }
        else {
            log.warn('Unknown message');
            log.warn(data);
        }
    }
}
