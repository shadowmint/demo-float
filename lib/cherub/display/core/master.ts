/// <reference path="__init__.ts"/>
declare var PIXI;
module cherub {
    export module display {
        export module core {

            /* Master display class */
            export class Master {

                /* Pixi stage */
                public stage:any;

                /* Pixi renderer */
                public renderer:any;

                /* Current width */
                public width:number;

                /* Current height */
                public height:number;

                /* Currently held display objects */
                public objects:cherub.display.core.Drawable[];

                /* Last step */
                public tlast:number = 0;

                /* Particles system */
                public particles:Particles;

                /* Is this a fullscreen window? */
                public fullscreen:boolean;

                /* Containing element */
                private _target:any;

                constructor(fullscreen:boolean = true) {
                    this.stage = null;
                    this.renderer = null;
                    this.width = 0;
                    this.height = 0;
                    this.objects = [];
                    this.particles = new Particles(50);
                    this.fullscreen = fullscreen;
                }

                /* Reset the contents */
                reset():void {
                    var copy = this.objects.slice(0);
                    for (var i = 0; i < copy.length; ++i) {
                        this.remove(copy[i]);
                    }
                }

                /* Add an object to the display */
                add(target:Drawable):void {
                    if (target) {
                        this.objects.push(target);
                        var widget = target.widget();
                        if (this._validateWidget(widget)) {
                            this.stage.addChild(widget);
                        }
                        else {
                            n.log.warn('Drawable ' + target + ' has no valid widgets');
                        }
                    }
                }

                /* Validate the children of a widget */
                private _validateWidget(target:any):boolean {
                    var rtn:boolean = true;
                    if (!target) {
                        rtn = false;
                    }
                    else {
                        for (var i = 0; i < target.children; ++i) {
                            if (!target) {
                                rtn = false;
                                break;
                            }
                            else if (!this._validateWidget(target.children[i])) {
                                rtn = false;
                                break;
                            }
                        }
                    }
                    return rtn;
                }

                /* Remove a display object */
                remove(target:Drawable):void {
                    if ((target) && (target.widget())) {
                        this.stage.removeChild(target.widget());
                        var index = this.objects.indexOf(target);
                        if (index != -1) {
                            this.objects.splice(index, 1);
                        }
                    }
                }

                /*
                 * Create a full window canvas to play with, and load it, etc.
                 *
                 * Note that because requestAnimationFrame() requires a window context
                 * the correct way to invoke this using PIXI is:
                 *
                 *      // When ready...
                 *      $(function() {
                 *
                 *          // Create the display interface
                 *          var $window = $(window);
                 *          var master = new display.Master();
                 *          on_frame_callback = master.load_canvas($('#content'));
                 *          requestAnimFrame(on_frame);
                 *
                 *          // Handle resize
                 *          $(window).resize(function(e) { master.resize(); });
                 *      });
                 *
                 *      // Frame updates
                 *      var on_frame_callback = null;
                 *      function on_frame(dt) {
                 *          requestAnimFrame(on_frame);
                 *          if (on_frame_callback) {
                 *          on_frame_callback(dt);
                 *      }
                 *
                 * @param target The target to append the new canvas instance to.
                 */
                load_canvas(target:HTMLElement):any {

                    // create an new instance of a pixi stage
                    this.stage = new PIXI.Stage(0x000000);

                    // create a renderer instance
                    this.renderer = new PIXI.autoDetectRenderer();
                    this._target = target;
                    this.resize();

                    // add render view to DOM
                    var master = this;
                    target.appendChild(<HTMLElement>this.renderer.view);
                    return function (dt) {
                        master.animate(dt);
                    };
                }

                /*
                 * Redraw the scene
                 * @param tt The total elapsed time of this animation (ms)
                 */
                animate(tt:number):void {
                    var dt = tt - this.tlast;
                    this.tlast = tt;
                    for (var i = 0; i < this.objects.length; ++i) {
                        this.objects[i].update(dt, this);
                    }
                    this.particles.update(dt);
                    this.renderer.render(this.stage);
                }

                /* Resize content to window size */
                resize() {
                    if (this.fullscreen) {
                        if ((this.height != window.innerHeight) || (this.width != window.innerWidth)) {
                            this.height = window.innerHeight;
                            this.width = window.innerWidth;
                            this.renderer['resize'](this.width, this.height);
                        }
                    }
                    else {
                        this.height = this._target.offsetWidth;
                        this.width = this._target.offsetHeight;
                        this.renderer['resize'](this.width, this.height);
                    }
                }
            }
        }
    }
}
