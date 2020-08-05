import {
    Spotlight
} from "./Shaders.js"
export default class Viewport {
    constructor(scene) {
        this.scene = scene
        this.cam = this.scene.cameras.cameras[0]
        this._viewport = this.scene.game.renderer.addPipeline('Spotlight', new Spotlight(this.scene.game))
        this._viewport.setFloat2('resolution', this.scene.game.config.width, this.scene.game.config.height)
        this._viewport.setFloat1('r', 0.35)
        //  Enable lights and set a dark ambient color
    }
    move(x, y) {
        const tx = (x - this.cam.worldView.x) / this.cam.worldView.width,
            ty = 1 - (y - this.cam.worldView.y) / this.cam.worldView.height
        this._viewport.setFloat1('tx', tx)
        this._viewport.setFloat1('ty', ty)
    }
    get() {
        return this._viewport
    }
}
