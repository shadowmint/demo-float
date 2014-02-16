/// <reference path="__init__.ts"/>
declare var Proton;
declare var PIXI;
module cherub {
    export module display {
        export module core {

            /* Top level proton library reference */
            export class Particles {

                /* Global proton reference */
                private _core:any;

                /* Time since last frame */
                private _tdelta:number = 0;

                /* Time step for updates */
                private _timestep:number = 0;

                constructor(timestep:number) {
                    this._core = new Proton();
                    this._timestep = timestep;
                }

                /* Create a renderer for pixi */
                renderer():any {
                    return new Proton.Renderer('other', this._core);
                }

                /* Update if the timestep is valid */
                update(dt:number) {
                    if (this._step(dt, this._timestep)) {
                        this._core.update();
                    }
                }

                /* Bind an emitter */
                add(emitter:any) {
                    this._core.addEmitter(emitter);
                }

                /* Remove an emitter */
                remove(emitter:any) {
                    this._core.removeEmitter(emitter);
                }

                /*
                 * Handle stepping over frames.
                 * Returns true when enough time has elapsed since the last frame.
                 * @param dt The timestep delta.
                 * @param step_size How often to trigger updates.
                 */
                private _step(dt:number, step_size:number):boolean {
                    this._tdelta += dt;
                    if (this._tdelta > step_size) {
                        this._tdelta = 0;
                        return true;
                    }
                    return false;
                }
            }

            /* Common interface for particle emitters */
            export interface EmitterConfig {

                /* Return an emitter */
                config():any;
            }

            /* Emitter instance */
            export class Emitter implements cherub.display.core.Drawable {

                /* Config for this particle emitter instance */
                private _config:EmitterConfig = null;

                /* Display object container for this emitter */
                private _container:any;

                /* Renderer */
                private _renderer:any;

                /* Is this sprite alive still? */
                private _alive:boolean = true;

                /* The parent particle system */
                private _parent:Particles = null;

                /* The native emitter */
                private _emitter:any = null;

                constructor(config:EmitterConfig, parent:Particles) {
                    this._parent = parent;
                    this._container = new PIXI.DisplayObjectContainer();
                    this._renderer = this._createRender();
                    this._emitter = config.config();
                    this._parent.add(this._emitter);
                }

                update(dt:number, master:cherub.display.core.Master):void {
                }

                widget():cherub.display.core.Drawable {
                    return this._container;
                }

                alive():boolean {
                    return true;
                }

                halt():void {
                    this._alive = false;
                    this._renderer.stop();
                    this._parent.remove(this._emitter);
                }

                /* Move the emitter to the given canvas coordinates */
                move(x:number, y:number) {
                    this._emitter.p.x = x;
                    this._emitter.p.y = y;
                }

                /* Create a local renderer */
                private _createRender() {
                    var emitter = this;
                    var renderer = this._parent.renderer();
                    renderer.onProtonUpdate = function () {
                    };
                    renderer.onParticleCreated = function (particle) {
                        emitter._onCreateParticle(particle)
                    };
                    renderer.onParticleUpdate = function (particle) {
                        emitter._onUpdateParticle(particle);
                    };

                    renderer.onParticleDead = function (particle) {
                        emitter._onDestroyParticle(particle);
                    };
                    renderer.start();
                    return renderer;
                }

                /* Handle particle creation */
                private _onCreateParticle(particle:any) {
                    var particleSprite = new PIXI.Sprite(particle.target);
                    particle.sprite = particleSprite;
                    this._container.addChild(particle.sprite);
                }

                /* Handle particle destruction */
                private _onDestroyParticle(particle:any) {
                    this._container.removeChild(particle.sprite);
                }

                /* Handle particle updates */
                private _onUpdateParticle(particle:any) {
                    var sprite = particle.sprite;
                    sprite.position.x = particle.p.x;
                    sprite.position.y = particle.p.y;
                    sprite.scale.x = particle.scale;
                    sprite.scale.y = particle.scale;
                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;
                    sprite.alpha = particle.alpha;
                    sprite.rotation = particle.rotation * Math.PI / 180;
                }
            }
        }
    }
}
