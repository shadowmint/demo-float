/// <reference path="__init__.ts"/>

/* External JS dependnecies */
declare var SockJS;

/* Module */
module service {

    /* Config */
    var SERVICE_KEY = 'core';

    /* Protocol keys */
    var SESSION_CREATE = 'session_create';
    var SESSION_JOIN = 'session_join';
    var SESSION_JOINED = 'session_joined';
    var SESSION_FAILURE = 'session_failure';

    /* Helper class to multiplex messages to services */
    export class Multiplexer {

        socket:any;
        handlers:any;
        protocol:any;
        session_id:string;
        connected_callback:any;

        constructor() {

            /** Socket api */
            this.socket = null;

            /** The session id */
            this.session_id = null;

            /** The set of handlers */
            this.handlers = {};

            /** Callback to invoke once we're connected */
            this.connected_callback = null;

            /** Protocol handlers */
            var self = this;
            this.protocol = {};
            this.protocol[SESSION_JOINED] = function (data) {
                self._handle_session_join(data)
            };
            this.protocol[SESSION_FAILURE] = function (data) {
                self._handle_session_fail(data)
            };
        }


        /* Connect to the socket service */
        connect(url, callback) {
            this.connected_callback = callback;
            var self = this;
            if (this.socket == null) {
                log.info(url);
                this.socket = new SockJS(url);
                this.socket.onopen = function (data) {
                    self._open();
                };
                this.socket.onmessage = function (msg) {
                    self._message(msg.data);
                };
                this.socket.onclose = function (data) {
                    self._close();
                };
            }
        }

        /* Register a multiplex handler */
        register(key, handler) {
            this.handlers[key] = handler;
        }

        /* Url param helper */
        _param(name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            }
            else {
                return results[1] || 0;
            }
        }

        /* Send an object as json */
        send(data) {
            var json = JSON.stringify(data);
            this.socket.send(json);
        }

        /* Connected */
        _open() {
            var session_id = this._param('session_id');
            if (session_id) {
                log.info('joining an existing session');
                this.send({_type: SERVICE_KEY, type: SESSION_JOIN, session_id: session_id});
            }
            else {
                log.info('creating new session');
                this.send({_type: SERVICE_KEY, type: SESSION_CREATE});
            }
        }

        /* Disconnected */
        _close() {
            this.socket = null;
        }

        /* Handle messages */
        _message(json:string) {
            var data:IMultiMessage = null;
            try {
                data = <IMultiMessage>JSON.parse(json);
            }
            catch (e) {
                log.info('Invalid json: ' + json)
            }
            if (data) {
                if (data._type == SERVICE_KEY) {
                    if (this.protocol[data.type]) {
                        this.protocol[data.type](data);
                    }
                    else {
                        log.error('Unknown message', data);
                    }
                }
                else {
                    var handler = this.handlers[data._type];
                    if (handler) {
                        handler.message(data);
                    }
                    else {
                        log.error('Invalid json, no handler', json);
                    }
                }
            }
        }

        /* Handle successful connection to session */
        _handle_session_join(data) {
            log.info('Joined session ' + data.session_id);
            this.session_id = data.session_id;
            if (this.connected_callback) {
                this.connected_callback(this, data);
            }
        }

        /* Failed to fail a session for some reason */
        _handle_session_fail(data) {
            log.info('Failed to join session: ' + data.reason);
        }
    }

    /* Common parent for all message */
    interface IMultiMessage {

        /* The serivce to dispatch to */
        _type: string;

        /* The message type */
        type: string;
    }
}
