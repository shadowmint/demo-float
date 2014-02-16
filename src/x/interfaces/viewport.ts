/// <reference path="__init__.ts"/>
module x {

    /* Directions for mapping */
    export enum Target {
        WORLD,
        DISPLAY
    }

    /* Implement this interface for things with event listeners */
    export interface Viewport {

        /* The display size */
        display:x.Point;

        /* The world size */
        world:x.Point;

        /* Change the current view to that given */
        view(view:x.Quad):void;

        /* Map a point in one domain to the other */
        point(p:x.Point, target:Target):x.Point;

        /* Map a size in one domain to the other */
        size(p:x.Point, target:Target):x.Point;
    }
}
