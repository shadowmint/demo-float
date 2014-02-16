/// <reference path="../../public/js/xx.d.ts"/>
module float {
    export function main() {
        var world = {x: 1000, y: 1000};
        var display = {x: 400, y: 400};
        var target = document.getElementById('content');
        var stage = new xx.Stage(target, world, display);

        stage.sync.channel('display');
        stage.add('display', new xx.Background('/assets/float.png'));

        stage.start();
    }
}

