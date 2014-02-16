/// <reference path="__init__.ts"/>
declare var PIXI;
module xx {

    /* Something that supports adding a sync object */
    export interface Stagable {
        attach(channel:string, stage:xx.Stage):void;
    }

    /* A wrapper around the pixi stage with some extra stuff */
    export class Stage {

        /* The current viewport for the stage */
        public view:x.Viewport = null;

        /* Stage we're using */
        public stage:any;

        /* Sync target */
        public sync:dsync.Sync;

        /* Renderer we're using */
        private _renderer:any;

        /* Actions to invoke every step */
        private _actions:{(stage:Stage):void}[] = [];

        /* Are we running? */
        private _running:boolean = false;

        /* Animation worker */
        private __worker:any;

        /* We can only have one stage at any time; this is it. */
        public static instance:Stage = null;

        /* Create a new canvas using the given size and viewport. */
        constructor(target:HTMLElement, world:x.Point, display:x.Point, background:number = 0xffffff) {
            if (Stage.instance != null) { throw Error('Only one stage can exist on a single page'); }
            this.stage = new PIXI.Stage(background);
            this._renderer = PIXI.autoDetectRenderer(display.x, display.y);
            this.sync = new dsync.Sync();
            this.action((s:Stage) => { s.redraw() });
            this.action((s:Stage) => { s.sync.update() });
            this.view = new x.StaticViewport(world, display);
            target.appendChild(<HTMLElement> this._renderer.view);
            Stage.instance = this;
        }

        /* Add a stagable to the stage */
        public add(channel:string, stagable:Stagable):void {
            stagable.attach(channel, this);
        }

        /* Animation step worker */
        private _worker() {
            if (this.__worker == null) {
                this.__worker = () =>  {
                    for (var i = 0; i < this._actions.length; ++i) {
                        this._actions[i](this);
                    }
                    if (this._running) {
                        requestAnimationFrame(this.__worker);
                    }
                };
            }
            return this.__worker;
        }

        /* Redraw */
        public redraw():void {
            this._renderer.render(this.stage);
        }

        /* Add another callback to invoke every step */
        public action(action:{(stage:Stage):void}):void {
            this._actions.unshift(action);
        }

        start():void {
            if (!this._running) {
                this._running = true;
                requestAnimationFrame(this._worker());
            }
        }

        stop():void {
            this._running = false;
        }
    }
}
