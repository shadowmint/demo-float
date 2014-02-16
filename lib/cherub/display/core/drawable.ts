/// <reference path="__init__.ts"/>
module cherub {
    export module display {
        export module core {

            /* Common interface for drawable */
            export interface Drawable {

                /* Update the sprite */
                update(dt:Number, master:Master):void;

                /* Return set of widgets in a PIXI.DisplayObjectContainer */
                widget():any;

                /* Return false from this to cull a widget from the stage */
                alive():boolean;
            }
        }
    }
}
