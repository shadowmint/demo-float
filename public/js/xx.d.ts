/// <reference path="x.d.ts" />
/// <reference path="dsync.d.ts" />
declare var PIXI: any;
declare module xx {
    interface Stagable {
        attach(channel: string, stage: Stage): void;
    }
    class Stage {
        public view: x.Viewport;
        public stage: any;
        public sync: dsync.Sync;
        private _renderer;
        private _actions;
        private _running;
        private __worker;
        static instance: Stage;
        constructor(target: HTMLElement, world: x.Point, display: x.Point, background?: number);
        public add(channel: string, stagable: Stagable): void;
        private _worker();
        public redraw(): void;
        public action(action: (stage: Stage) => void): void;
        public start(): void;
        public stop(): void;
    }
}
declare var PIXI: any;
declare module xx {
    module background {
        class Model {
            public ready: boolean;
            public dead: boolean;
            public source: string;
            public stage: xx.Stage;
            constructor(url: string);
        }
        class Display {
            public sprite: any;
        }
    }
    class Background implements xx.Stagable {
        public model: background.Model;
        public display: background.Display;
        constructor(url: string);
        public attach(channel: string, stage: xx.Stage): void;
        static create(model: background.Model, display: background.Display): void;
        static destroy(model: background.Model, display: background.Display): void;
        static sync(model: background.Model, display: background.Display, changed: any[], dt: number): boolean;
        static state(model: background.Model, display: background.Display, dt: number): any[];
    }
}
