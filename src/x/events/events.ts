/// <reference path="__init__.ts"/>
module x {
    export module dom {

        /* Browser agnostic remove events */
        export function removeEventListener(e:HTMLElement, key:string, callback:any):void {
            if (e.removeEventListener) {
                e.removeEventListener(key, callback, false);
            }
            else if (e.detachEvent) {
                e.detachEvent('on' + key, callback);
            }
        }

        /* Browser agnostic add events */
        export function addEventListener(e:HTMLElement, key:string, callback:any):void {
            if (e.addEventListener) {
                e.addEventListener(key, callback, false);
            }
            else if (e.attachEvent) {
                e.attachEvent('on' + key, callback);
            }
        }
    }

    /* A single event binding */
    export class EventBinding {

        /* The callback */
        handler:any;

        /* The event removal token */
        token:any;

        /* The event type */
        type:any;

        /* The target for this event */
        target:any;

        constructor(target:any, type:string, handler:{(e:any):boolean}) {
            this.type = type;
            this.handler = handler;
            this.token = null;
        }

        /* Add/remove this event target */
        public setActive(active:boolean = true):void {
            if ((active) && (!this.token)) {
                this.token = (e) => { return this.handler(e); };
                x.dom.addEventListener(this.target, this.type, this.token);
            }
            else if ((!active) && this.token) {
                x.dom.removeEventListener(this.target, this.type, this.token);
            }
        }
    }

    /* A collection of events which can easily be turned on or off */
    export class Events {

        /* Set of bindings we currently have */
        public bindings:x.List<EventBinding> = new x.List<EventBinding>();

        /*
         * Add an event binding
         * @param target The target element to attach an event to.
         * @param event The event code; eg. keydown
         * @param handler The callback to invoke when the event happens.
         * @return This call returns the object itself to as to be chainable.
         */
        public bind(target:any, event:string, handler:{(e:any):boolean}):Events {
            return this;
        }

        /* Turn all events on */
        public activate():void {
        }

        /* Turn all events off */
        public clear():void {
        }
    }
}
