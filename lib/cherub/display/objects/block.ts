/// <reference path="__init__.ts"/>
declare var PIXI;
module cherub {
    export module display {
        export module objects {

            /* Placeholder block */
            export class Block extends display.core.Base implements display.core.Drawable {

                /* Last known container state */
                _lstate:number[] = [0, 0];

                /* Sprite set */
                container:any = null;
                graphics:any = null;

                /* Configurable data */
                color:number = 0xefefef;
                size:cherub.geom.Point = new cherub.geom.Vector();
                pos:cherub.geom.Point = new cherub.geom.Vector();

                constructor() {
                    super();

                    this.graphics = new PIXI.Graphics();
                    this.redraw(-10, -10, 10, 10);

                    this.container = new PIXI.DisplayObjectContainer();
                    this.container.addChild(this.graphics);
                }

                /* Redraw the space */
                redraw(xmin:number, ymin:number, xmax:number, ymax:number) {
                    this.graphics.clear();
                    this.graphics.lineStyle(2, this.color, 1);
                    this.graphics.moveTo(xmin, ymin);
                    this.graphics.lineTo(xmin, ymax);
                    this.graphics.lineTo(xmax, ymax);
                    this.graphics.lineTo(xmax, ymin);
                    this.graphics.lineTo(xmin, ymin);
                    this.graphics.moveTo(xmin, ymin);
                    this.graphics.lineTo(xmax, ymax);
                }

                /* Save state */
                private _saveState():void {
                    this._lstate = [this.size.x, this.size.y, this.container.position.x, this.container.position.y];
                }

                /* Check if we've changed state */
                changed():boolean {
                    if ((this.size.x != this._lstate[0]) || (this.size.y != this._lstate[1])) {
                        this._saveState();
                        return true;
                    }
                    else if ((this.container.position.x != this._lstate[2]) || (this.container.position.y != this._lstate[3])) {
                        this._saveState();
                        return true;
                    }
                    return false;
                }

                update(dt:number, master:cherub.display.core.Master):void {
                    if (this.step(dt, 200)) {
                        if (this.changed()) {
                            var xmin:number = -this.size.x / 2;
                            var xmax:number = this.size.x / 2;
                            var ymin:number = -this.size.y / 2;
                            var ymax:number = this.size.y / 2;
                            this.redraw(xmin, ymin, xmax, ymax);
                            this.container.position.x = this.pos.x;
                            this.container.position.y = this.pos.y;
                        }
                    }
                }

                widget():any {
                    return this.container;
                }

                alive():boolean {
                    return true;
                }
            }
        }
    }
}
