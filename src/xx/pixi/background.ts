/// <reference path="__init__.ts"/>
declare var PIXI;
module xx {

    /* Avoid namespace clutter */
    export module background {

        /* Model for the background widget */
        export class Model {
            ready:boolean = false;
            dead:boolean = false;
            source:string;
            stage:xx.Stage;

            constructor(url:string) {
                this.source = url;
            }
        }

        /* Display for the background */
        export class Display {
            sprite:any = null;
        }
    }

    /* Sets a large static background for the whole canvas */
    export class Background implements xx.Stagable {

        public model:xx.background.Model;

        public display:xx.background.Display;

        /*
         * Create a background widget
         * @param url The url for the background to display.
         */
        constructor(url:string) {
            this.model = new xx.background.Model(url);
            this.display = new xx.background.Display();
        }

        public attach(channel:string, stage:xx.Stage):void {
            stage.sync.add(channel, this.model, this.display, Background.sync, Background.state);
        }

        public static create(model:background.Model, display:background.Display) {
            model.ready = true;
            model.stage = xx.Stage.instance;
            display.sprite = PIXI.Sprite.fromImage(model.source);
            display.sprite.width = model.stage.view.display.x;
            display.sprite.height = model.stage.view.display.y;
            model.stage.stage.addChild(display.sprite);
        }

        public static destroy(model:background.Model, display:background.Display) {
            model.stage.stage.removeChild(display.sprite);
            display.sprite = null;
        }

        public static sync(model:xx.background.Model, display:xx.background.Display, changed:any[], dt:number):boolean {
            if (!model.ready) { Background.create(model, display); }
            if (model.dead) { Background.destroy(model, display); }
            return !model.dead;
        }

        public static state(model:xx.background.Model, display:xx.background.Display, dt:number):any[] {
            return [model.source, model.dead];
        }
    }
}
