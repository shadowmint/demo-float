/// <reference path="__init__.ts"/>
module x {

    /* Implement this interface for things with event listeners */
    export interface EventListener {
        removeEventListener(key:string, callback:any):void;
        addEventListener(key:string, callback:any):void;
    }
}
