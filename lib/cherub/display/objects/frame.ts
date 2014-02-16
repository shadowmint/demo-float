/// <reference path="__init__.ts"/>
declare var PIXI;
module cherub {
    export module display {
        export module objects {

            /* Placeholder block */
            export class Frame extends display.core.Base implements display.core.Drawable {

                /* Configurable data */
                color:number = 0xefefef;

                /* Sprite set */
                graphics:any;

                /* The target we're tracking */
                target:any;

                /*
                 * Create a rendering frame around the target.
                 * @param target The object to draw a border for.
                 */
                constructor(target:any) {
                    super();
                    this.graphics = new PIXI.Graphics();
                    this.target = target;
                    this.redraw();
                }

                /* Redraw the space */
                redraw() {
                    var xmin:number = <number> this.target.position.x;
                    var xmax:number = <number> (this.target.position.x + this.target.width);
                    var ymin:number = <number> this.target.position.y;
                    var ymax:number = <number> (this.target.position.y + this.target.height);
                    this.graphics.clear();
                    this.graphics.lineStyle(3, this.color, 1);
                    this.graphics.moveTo(xmin, ymin);
                    this.graphics.lineTo(xmin, ymax);
                    this.graphics.lineTo(xmax, ymax);
                    this.graphics.lineTo(xmax, ymin);
                    this.graphics.lineTo(xmin, ymin);
                }

                update(dt:number, master:cherub.display.core.Master):void {
                    if (this.step(dt, 200)) {
                        this.redraw();
                    }
                }

                widget():any {
                    return this.graphics;
                }

                alive():boolean {
                    return true;
                }
            }
        }
    }
}
