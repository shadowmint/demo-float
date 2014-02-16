/// <reference path="__init__.ts"/>
module cherub {
    export module display {
        export module camera {

            /* Map between centralized 0,0 coordinates and top left viewport coordinates */
            export class Viewport {

                /* x center of the viewport */
                x:number;

                /* y center of the viewport */
                y:number;

                /* Ideal width of viewport; real width depends on aspect ratio */
                width:number;

                /* Ideal height of viewport; real height depends on aspect ratio */
                height:number;

                /* The canvas we're attached to */
                master:cherub.display.core.Master = null;

                constructor(master:cherub.display.core.Master) {
                    this.master = master;
                    this.x = 0;
                    this.y = 0;
                    this.width = 100;
                    this.height = 100;
                }

                /*
                 * Return the effective width and height of this viewport.
                 *
                 * This is based on the aspect ratio of the master, and set such that the
                 * largest bound matches the largest bound of the viewport.
                 */
                size():number[] {
                    if (this.master.height > this.master.width) {
                        var factor:number = this.master.width / this.master.height;
                        return [this.height * factor, this.height];
                    }
                    else {
                        var factor:number = this.master.height / this.master.width;
                        return [this.width, this.width * factor];
                    }
                }

                /* Update a point to be relative to the viewport */
                map(p:cherub.geom.Point):void {
                    var size:number[] = this.size();
                    var tl:number[] = [this.x - size[0] / 2, this.y - size[1] / 2];
                    var x = p.x;
                    var y = p.y;
                    p.x = p.x - tl[0];
                    p.y = p.y - tl[1];

                    /* Scale by canvas size */
                    p.x = this.master.width * (p.x / size[0]);
                    p.y = this.master.height * (p.y / size[1]);
                }

                /* Update a size point to be relative to the viewport */
                mapSize(p:cherub.geom.Point):void {
                    var size:number[] = this.size();
                    p.x = this.master.width * p.x / size[0];
                    p.y = this.master.height * p.y / size[1];
                }

                /* Map x viewport coordinate to domain space */
                rmap(p:cherub.geom.Point):void {
                    var size:number[] = this.size();
                    var tl:number[] = [this.x - size[0] / 2, this.y - size[1] / 2];
                    p.x = size[0] * p.x / this.master.width;
                    p.y = size[1] * p.y / this.master.height;
                    p.x += tl[0]; // ? Probably
                    p.y += tl[1];
                }
            }
        }
    }
}
