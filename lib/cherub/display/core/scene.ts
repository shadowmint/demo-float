/// <reference path="__init__.ts"/>
module cherub {
    export module display {
        export module core {

            /*
             * Collection of logic and things
             *
             * Really, what's the difference between a scene and a drawable?
             * Not a lot, but scenes let you define load() and unload() blocks,
             * and bind events within a given scope.
             *
             * Logically a scene is a visualization of the event state.
             *
             * Events registered using events.bind() will only be invoked if the
             * scene is currently active.
             */
            export class Scene implements Drawable {

                /* The manager for this scene */
                public manager:SceneManager = null;

                /* The set of events this scene is looking after */
                public events:input.Events = new input.Events();

                /* The viewport for this scene */
                public view:cherub.display.camera.Viewport = null;

                /* List of widgets currently looked after */
                private _drawables:Drawable[] = [];

                /* Top level display object conatiner for this scene */
                private _container:any = new PIXI.DisplayObjectContainer();

                /* Add a drawable */
                add(drawable:Drawable):void {
                    this._drawables.push(drawable);
                    this._container.addChild(drawable.widget());
                }

                /* Remove a drawable */
                remove(target:Drawable):void {
                    if ((target) && (target.widget())) {
                        this._container.removeChild(target.widget());
                        var index = this._drawables.indexOf(target);
                        if (index != -1) {
                            this._drawables.splice(index, 1);
                        }
                    }
                }

                /* Update the sprite */
                update(dt:Number, master:cherub.display.core.Master):void {
                    var alive:Drawable[] = [];
                    for (var i = 0; i < this._drawables.length; ++i) {
                        var d:Drawable = this._drawables[i];
                        if (d.alive()) {
                            d.update(dt, master);
                            alive.push(d);
                        }
                        else {
                            this._container.removeChild(d.widget());
                        }
                    }
                    if (alive.length != this._drawables.length) {
                        this._drawables = alive;
                    }
                }

                /* Reset the contents of this scene */
                reset():void {
                    var copy:Drawable[] = this._drawables.slice(0);
                    for (var i = 0; i < copy.length; ++i) {
                        this.remove(copy[i]);
                    }
                }

                /* Return set of widgets in a PIXI.DisplayObjectContainer */
                widget():any {
                    return this._container;
                }

                /* Return false from this to cull a widget from the stage */
                alive():boolean {
                    return true;
                }

                /*
                 * Invoked after the scene has been registered to a scene manager.
                 * Override this method in subclasses.
                 */
                init(state:any):void {
                }

                /*
                 * Invoked before a scene is displayed
                 * Override this method in subclasses.
                 */
                load():void {
                }

                /*
                 * Invoked before a scene is displayed
                 * Override this method in subclasses.
                 */
                unload():void {
                }
            }
        }
    }
}
