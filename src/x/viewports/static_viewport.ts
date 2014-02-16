/// <reference path="__init__.ts"/>
module x {

    /* Map between centralized 0,0 coordinates and top left viewport coordinates */
    export class StaticViewport {

        /* The world space coordinates the viewport represents */
        world:x.Point;

        /* The display coordinates to use */
        display:x.Point;

        /* The current viewport */
        viewport:x.Quad;

        constructor(world:x.Point, display:x.Point) {
            this.world = world;
            this.display = display;
            this.all();
        }

        /* View the entire world space */
        all():void {
            this.view({size: {x: this.display.x / 2, y:this.display.y / 2}, pos: {x: 0, y:0}});
        }

        /* Change the current view to that given */
        view(view:x.Quad):void {
            this.viewport = view;
        }

        /*
         * Generate a new point to be relative to the viewport.
         * By default the output is in display space; to modify use target.
         * @param p The point to generate output from
         * @param target The output coordinate space
         * @return A new point in the target coordinate space.
         */
        point(p:x.Point, target:x.Target = x.Target.DISPLAY):x.Point {
            return {x: 0, y: 0};
        }

        /*
         * Generate a new size to be relative to the viewport.
         * By default the output is in display space; to modify use target.
         *
         * Notice that the distinction between size() and point() is that the
         * point assumes that display space is 0,0 based at the top left, and
         * corrects coordiantes accordingly.
         *
         * @param p The point to generate output from
         * @param target The output coordinate space
         * @return A new point in the target coordinate space.
         */
        size(p:x.Point, target:x.Target = x.Target.DISPLAY):x.Point {
            return {x: 0, y: 0};
        }
    }
}
