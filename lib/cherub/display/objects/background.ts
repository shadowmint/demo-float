/// <reference path="__init__.ts"/>
declare var PIXI;
module cherub {
    export module display {
        export module objects {

            /* This is a light wrapper around PIXI.Sprite that fills an object with an asset */
            export class Background extends display.core.Base implements display.core.Drawable {

                /* Sprite */
                sprite:any;

                /* The target to fill */
                target:any;

                /* Offset if required */
                offset:cherub.geom.Point = new cherub.geom.Vector();

                constructor(file:string, target:any, x:number = 0, y:number = 0) {
                    super();
                    this.sprite = PIXI.Sprite.fromImage(file);
                    this.target = target;
                    this.offset.x = x;
                    this.offset.y = y;
                }

                /* Redraw the space */
                redraw() {
                    this.sprite.width = this.target.width;
                    this.sprite.height = this.target.height;
                    this.sprite.position.x = this.offset.x;
                    this.sprite.position.y = this.offset.y;
                }

                update(dt:number, master:cherub.display.core.Master):void {
                    if (this.step(dt, 50)) {
                        this.redraw();
                    }
                }

                widget():any {
                    return this.sprite;
                }

                alive():boolean {
                    return true;
                }
            }
        }
    }
}
