/// <reference path="__init__.ts"/>
module cherub {
    export module display {
        export module core {

            /* Simple common base for similar drawables */
            export class Base {

                /* Time since last frame */
                _tdelta:number = 0;

                /* Child drawables owned by this one to update */
                _children:cherub.display.core.Drawable[] = [];

                /* Children who are dead since the last update */
                public _dead:cherub.display.core.Drawable[] = [];

                /* Validate the given set of assets */
                validate(assets:any):boolean {
                    var rtn = true;
                    for (var key in assets) {
                        if (!cherub.utils.assets.validate(assets[key])) {
                            n.log.warn('Missing asset: ' + assets[key]);
                            rtn = false;
                        }
                    }
                    return rtn;
                }

                /*
                 * Handle stepping over frames.
                 * Returns true when enough time has elapsed since the last frame.
                 * @param dt The timestep delta.
                 * @param step_size How often to trigger updates.
                 */
                step(dt:number, step_size:number):boolean {
                    this._tdelta += dt;
                    if (this._tdelta > step_size) {
                        this._tdelta = 0;
                        return true;
                    }
                    return false;
                }

                /*
                 * Consume this child and return it as itself.
                 * Use this with update().
                 * @param child A child drawable.
                 * @return The same child drawable.
                 */
                public child(c:cherub.display.core.Drawable):cherub.display.core.Drawable {
                    this._children.push(c);
                    return c;
                }

                /*
                 * Update the set of child objects.
                 * @param dt The time delta
                 * @param master The master interface.
                 */
                update(dt:number, master:cherub.display.core.Master):void {
                    this._dead = [];
                    for (var i = 0; i < this._children.length; ++i) {
                        this._children[i].update(dt, master);
                        if (!this._children[i].alive()) {
                            this._dead.push(this._children[i]);
                        }
                    }
                    for (var i = 0; i < this._dead.length; ++i) {
                        var offset = this._children.indexOf(this._dead[i]);
                        this._children.splice(offset, 1);
                    }
                }
            }
        }
    }
}
