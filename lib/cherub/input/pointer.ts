/// <reference path="__init__.ts"/>
module cherub {
    export module input {
        export module pointer {

            /* Pointer event type constants */
            export var POINTER:string = 'pointer';
            export var POINTER_MOTION:string = 'pointer.motion';
            export var POINTER_DOWN:string = 'pointer.down';
            export var POINTER_UP:string = 'pointer.up';

            /* Returns the native code for a event type */
            export function native(id:string):string {
                if (id == POINTER_DOWN) {
                    return 'mousedown';
                }
                else if (id == POINTER_UP) {
                    return 'mouseup';
                }
                else if (id == POINTER_MOTION) {
                    return 'mousemotion';
                }
                return null;
            }

            /* Pointer event type */
            export class PointerEvent {

                /* Id of this pointer */
                id:number;

                /* Which button is it, if that's meaningful */
                button:number;

                /* Is the pointer state down? */
                touch:boolean;

                /* Absolute x coordinates relative to stage */
                x:number;

                /* Absolute y coordinates relative to stage */
                y:number;
            }

            /*
             * Attach a callback that is invoked when the pointer gets clicked~
             * The callback should take a pointer event argument.
             * To remove the binding, use the returned value.
             */
            export function bind(type:string, master:cherub.display.core.Master, callback:any):any {
                var code:string = native(type);
                if (code != null) {
                    var rtn:any = function (e) {
                        var event:PointerEvent = populateEvent(master, e);
                        callback(event);
                    };
                    master.renderer.view.addEventListener(code, rtn, false);
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

            /* The pointer instance we use for everything */
            var _pointer = new PointerEvent();

            /* Populate the pointer event from a native event */
            function populateEvent(master:cherub.display.core.Master, e:any):PointerEvent {
                var coords = relMouseCoords(master, e);
                _pointer.x = coords.x;
                _pointer.y = coords.y;
                return _pointer;
            }

            /* Type for coordinates */
            interface MouseEvent {
                offsetLeft:number;
                offsetTop:number;
                scrollLeft:number;
                scrollTop:number;
                offsetParent:MouseEvent;
            }

            /* Calculate relative canvas coordinates */
            function relMouseCoords(master, event) {
                var totalOffsetX:number = 0;
                var totalOffsetY:number = 0;
                var canvasX:number;
                var canvasY:number;
                var currentElement:MouseEvent = <MouseEvent> master.renderer.view;

                do {
                    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
                }
                while (currentElement = currentElement.offsetParent)

                canvasX = event.pageX - totalOffsetX;
                canvasY = event.pageY - totalOffsetY;

                return {x: canvasX, y: canvasY}
            }
        }
    }
}
