/// <reference path="__init__.ts"/>
module cherub {
    export module input {

        /* Helper for key codes */
        export module keys {
            export var LEFT:number = 37;
            export var UP:number= 38;
            export var RIGHT:number = 39;
            export var DOWN:number = 40;
        }

        export module key {

            /* Key event type constants */
            export var KEY:string = 'key';
            export var KEY_DOWN:string = 'key.down';
            export var KEY_UP:string = 'key.up';

            /* Returns the native code for a event type */
            export function native(id:string):string {
                if (id == KEY_DOWN) {
                    return 'keydown';
                }
                else if (id == KEY_UP) {
                    return 'keyup';
                }
                return null;
            }

            /* Key event type */
            export class KeyEvent {

                /* Which key was it? */
                code:number;
            }

            /*
             * Attach a callback that is invoked when the keyboard is pressed.
             * The callback should take a key event argument.
             * To remove the binding, use the returned value.
             */
            export function bind(type:string, master:cherub.display.core.Master, callback:any):any {
                var code:string = native(type);
                if (code != null) {
                    var rtn:any = function (e) {
                        var event:KeyEvent = populateEvent(master, e);
                        callback(event);
                    };
                    window.addEventListener(code, rtn, false);
                    return rtn;
                }
                return null;
            }

            /* Remove an event binding */
            export function remove(type:string, master:cherub.display.core.Master, callback:any):void {
                var code:string = native(type);
                if (code != null) {
                    master.renderer.view.removeEventListener(code, callback, false);
                }
            }

            /* The key instance we use for everything */
            var _key = new KeyEvent();

            /* Populate the key event from a native event */
            function populateEvent(master:cherub.display.core.Master, e:any):KeyEvent {
                var event = window.event ? window.event : e;
                _key.code = event.keyCode;
                return _key;
            }
        }
    }
}
