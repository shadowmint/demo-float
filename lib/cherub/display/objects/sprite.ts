/// <reference path="__init__.ts"/>
declare var PIXI;
module cherub {
    export module display {
        export module objects {

            /* This is a light wrapper around PIXI.Sprite that tracks motion */
            export class Sprite extends display.core.Base implements display.core.Drawable {

                /* Last known container state */
                _lstate:number[] = [0, 0];

                /* Sprite set */
                sprite:any = null;

                /* Configurable data */
                size:cherub.geom.Point = new cherub.geom.Vector();
                pos:cherub.geom.Point = new cherub.geom.Vector();

                constructor(file:string) {
                    super();
                    this.sprite = PIXI.Sprite.fromImage(file);
                }

                /* Redraw the space */
                redraw() {
                    this.sprite.width = this.size.x;
                    this.sprite.height = this.size.y;
                    this.sprite.position.x = this.pos.x - this.size.x / 2;
                    this.sprite.position.y = this.pos.y - this.size.y / 2;
                }

                /* Save state */
                private _saveState():void {
                    this._lstate = [this.size.x, this.size.y, this.sprite.position.x, this.sprite.position.y];
                }

                /* Check if we've changed state */
                changed():boolean {
                    if ((this.size.x != this._lstate[0]) || (this.size.y != this._lstate[1])) {
                        this._saveState();
                        return true;
                    }
                    else if ((this.sprite.position.x != this._lstate[2]) || (this.sprite.position.y != this._lstate[3])) {
                        this._saveState();
                        return true;
                    }
                    return false;
                }

                update(dt:number, master:cherub.display.core.Master):void {
                    if (this.step(dt, 50)) {
                        if (this.changed()) {
                            this.redraw();
                        }
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
