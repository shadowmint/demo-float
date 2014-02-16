/// <reference path="__init__.ts"/>
module cherub {
    export module display {
        export module core {

            /* Common top level scene management */
            export class SceneManager {

                /* Set of known scenes */
                scenes:n.Dict<Scene> = {};

                /* The master display object */
                master:cherub.display.core.Master = null;

                /* The currently active scene */
                active:Scene = null;

                /* The state for scenes */
                state:any = null;

                constructor(master:cherub.display.core.Master, state:any = null) {
                    this.master = master;
                    this.state = state;
                }

                /* Register a scene <--> id binding */
                register(id:string, scene:Scene):void {
                    scene.view = new cherub.display.camera.Viewport(this.master);
                    scene.manager = this;
                    this.scenes[id] = scene;
                    scene.init(this.state);
                }

                /* Open a specific scene */
                open(id:string):void {
                    var scene = this.scenes[id];
                    if (this.active != null) {
                        this.active.events.remove(this.master);
                        this.master.remove(this.active);
                        this.active.unload();
                    }
                    if (scene) {
                        this.active = scene;
                        this.active.load();
                        this.master.add(this.active);
                        this.active.events.register(this.master);
                    }
                }
            }
        }
    }
}
