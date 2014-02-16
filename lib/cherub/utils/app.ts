/// <reference path="__init__.ts"/>
declare var requestAnimFrame;
module cherub {
    export module utils {

        /* Top level application state */
        export class App {

            /* The master display controller */
            master:cherub.display.core.Master = null;

            /* The scene manager */
            scenes:cherub.display.core.SceneManager = null;

            /* Display viewport */
            view:cherub.display.camera.Viewport = null;

            /* If the application currently running */
            running:boolean = true;

            public constructor(parent:HTMLElement, fullscreen:boolean=true) {
                this.master = new cherub.display.core.Master(fullscreen);
                this.scenes = new cherub.display.core.SceneManager(this.master, this);
                cherub.utils.app = this;

                // Animation base
                var app = this;
                on_frame_callback = app.master.load_canvas(parent);
                if (fullscreen) {
                    window.onresize = function () {
                        app.master.resize();
                    };
                }
                requestAnimFrame(on_frame);
            }

            /* Stop running, for whatever reason */
            halt():void {
                this.running = false;
                n.log.info('Halted application');
            }

            /* Update the state; override this */
            update(dt:number):void {
            }
        }

        /* Singleton for app; updated on application create */
        export var app:App = null;
    }
}

/* Callback to invoke on a frame */
var on_frame_callback:any = null;

/* Render each frame */
function on_frame(dt) {
    try {
        if (cherub.utils.app.running) {
            requestAnimFrame(on_frame);
            if (on_frame_callback) {
                cherub.utils.app.update(dt);
                on_frame_callback(dt);
            }
        }
    }
    catch (error) {
        n.log.error('Failed', error);
        cherub.utils.app.halt();
    }
}
