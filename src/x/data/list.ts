/// <reference path="../__init__.ts"/>
module x {

    /* An array wrapper with some extra features and browser support */
    export class List<T> {

        /* Internal data array */
        private _data:T[] = [];

        /* Calc length */
        public length():number {
            return this._data.length;
        }

        /* Return a copy of the internal data (but not the inner array itself) */
        public all():T[] {
            return this._data.slice(0);
        }

        /*
         * Absorb a list to replace the internal data model
         * Notice this takes a copy of the given list.
         */
        public set(data:T[]):void {
            this._data = data.slice(0);
        }

        /* Add a new child */
        public push(item:T):void {
            this._data.push(item);
        }

        /* Filter this list */
        public filter(filter:{(item:T):boolean}):void {
            var data:T[] = [];
            this.each((i:T) => { if (filter(i)) { data.push(i); }});
            this._data = data;
        }

        /*
         * Map objects to the same type and apply and update.
         * Often each is good enough for this, but for example to modify
         * a list of primitive types like strings, you need to use this.
         */
        public map(map:{(item:T):T}):void {
            var _data = [];
            this.each((i:T) => { _data.push(map(i)); });
            this.set(_data);
        }

        /* Do something on each element */
        public each(apply:{(item:T):void}):void {
            for (var i = 0; i < this._data.length; ++i) {
                apply(this._data[i]);
            }
        }

        /* Remove a specific elements */
        public remove(target:T):void {
            this.filter((i:T) => { return i != target; });
        }

        /* Return the index of the given element in the list, or -1 */
        public indexOf(item:T):number {
            if (this._data.indexOf) {
                return this._data.indexOf(item);
            }
            for (var i = 0; i < this._data.length; ++i) {
                if (this._data[i] === item) {
                    return i;
                }
            }
            return -1;
        }

        /* A simple wrapper for indexOf that returns a boolean */
        public any(item:T):boolean {
            return this.indexOf(item) != -1;
        }

        /* Join wrapper */
        public join(joiner:string):string {
            return this._data.join(joiner);
        }
    }
}
