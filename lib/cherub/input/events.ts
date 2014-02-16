/// <reference path="__init__.ts"/>
module cherub {
    export module input {

        /* Check what sort of event a thing is */
        export function type(id:string):string {
            var types = [
                 cherub.input.pointer.POINTER,
                 cherub.input.key.KEY
            ];
            for (var i = 0; i < types.length; ++i) {
                if (id.substring(0, types[i].length) === types[i]) {
                    return types[i];
                }
            }
            return null;
        }

        /* A single event binding */
        export class Binding {

            /* The callback */
            handler:any;

            /* The event removal token */
            token:any;

            /* The event type */
            type:any;

            constructor(type:string, handler:any) {
                this.type = type;
                this.handler = handler;
                this.token = null;
            }
        }

        /* Keep track of a bunch of different events and dispatch them using this */
        export class Events {

            /* Bound events */
            events:Binding[] = [];

            /* Known event types */
            _binders:{[key:string]:any} = {};
            _removers:{[key:string]:any} = {};

            constructor() {
                this._binders[cherub.input.pointer.POINTER]= cherub.input.pointer.bind;
                this._binders[cherub.input.key.KEY]= cherub.input.key.bind;
                this._removers[cherub.input.pointer.POINTER]= cherub.input.pointer.remove;
                this._removers[cherub.input.key.KEY]= cherub.input.key.remove;
            }

            /* Create an event handler binding */
            bind(type:string, handler:any) {
                var binding:Binding = new Binding(type, handler);
                this.events.push(binding);
            }

            /* Create event handlers */
            register(master:cherub.display.core.Master):void {
                for (var i = 0; i < this.events.length; ++i) {
                    var event:Binding = this.events[i];
                    for (var key in this._binders) {
                        if (input.type(event.type) == key) {
                            event.token = this._binders[key](event.type, master, event.handler);
                        }
                    }
                }
            }

            /* Remove event handlers */
            remove(master:cherub.display.core.Master):void {
                for (var i = 0; i < this.events.length; ++i) {
                    var event:Binding = this.events[i];
                    for (var key in this._removers) {
                        if (input.type(event.type) == key) {
                            event.token = this._removers[key](event.type, master, event.token);
                        }
                    }
                }
            }
        }
    }
}
