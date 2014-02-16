declare module x {
    interface EventListener {
        removeEventListener(key: string, callback: any): void;
        addEventListener(key: string, callback: any): void;
    }
}
declare module x {
    enum Target {
        WORLD = 0,
        DISPLAY = 1,
    }
    interface Viewport {
        display: x.Point;
        world: x.Point;
        view(view: x.Quad): void;
        point(p: x.Point, target: Target): x.Point;
        size(p: x.Point, target: Target): x.Point;
    }
}
declare module x {
    class List<T> {
        private _data;
        public length(): number;
        public all(): T[];
        public set(data: T[]): void;
        public push(item: T): void;
        public filter(filter: (item: T) => boolean): void;
        public map(map: (item: T) => T): void;
        public each(apply: (item: T) => void): void;
        public remove(target: T): void;
        public indexOf(item: T): number;
        public any(item: T): boolean;
        public join(joiner: string): string;
    }
}
declare module x {
    interface Point {
        x: number;
        y: number;
    }
}
declare module x {
    class Vector {
        public x: number;
        public y: number;
        constructor(x?: number, y?: number);
        public magnitude(): number;
        public unit(): Vector;
        public multiply(factor: number): Vector;
        public add(other: Vector, factor?: number): Vector;
        public copy(other: Vector): Vector;
    }
}
declare module x {
    interface Quad {
        size: x.Point;
        pos: x.Point;
    }
}
declare module x {
    class StaticViewport {
        public world: x.Point;
        public display: x.Point;
        public viewport: x.Quad;
        constructor(world: x.Point, display: x.Point);
        public all(): void;
        public view(view: x.Quad): void;
        public point(p: x.Point, target?: x.Target): x.Point;
        public size(p: x.Point, target?: x.Target): x.Point;
    }
}
declare module x {
    module dom {
        function removeEventListener(e: HTMLElement, key: string, callback: any): void;
        function addEventListener(e: HTMLElement, key: string, callback: any): void;
    }
    class EventBinding {
        public handler: any;
        public token: any;
        public type: any;
        public target: any;
        constructor(target: any, type: string, handler: (e: any) => boolean);
        public setActive(active?: boolean): void;
    }
    class Events {
        public bindings: x.List<EventBinding>;
        public bind(target: any, event: string, handler: (e: any) => boolean): Events;
        public activate(): void;
        public clear(): void;
    }
}
declare module x {
    class EventListenerBase implements x.EventListener {
        private _bindings;
        private _keys;
        constructor(keys: string[]);
        private _guard(key);
        public addEventListener(key: string, callback: any): void;
        public removeEventListener(key: string, callback: any): void;
        public trigger(key: string, event: any): void;
    }
}
