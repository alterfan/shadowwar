import {} from './illuminated.js'
class Spotlight extends Phaser.Plugins.BasePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager)
		this.scene = scene
		this.scene.add.spotlight = {}
		this._all_lamps = []
		this._all_lightings = []
		var lamp = new illuminated.Lamp({ distance: 200, position: new illuminated.Vec2(x, y) })
		var lighting = new illuminated.Lighting({ light: lamp, objects: objects })
		var s_canvas = this.scene.textures.createCanvas('shadows_canvas', this.canvasSize.w, this.canvasSize.h)
		const ctx = s_canvas.getContext()
		function refresh() {
			ctx.clearRect(0, 0, self.canvasSize.w, self.canvasSize.h)
			ctx.fillStyle = 'black'
			ctx.fillRect(0, 0, self.canvasSize.w, self.canvasSize.h)
			ctx.globalCompositeOperation = 'lighter'
			lighting.compute(self.canvasSize.w, self.canvasSize.h)
			lighting.render(ctx)
		}
	}
	get canvasSize() {
		const h = this.scene.scale.height
		const w = this.scene.scale.width
		return { h: h, w: w }
	}
	move(x, y) {
		this._lamp.position = new illuminated.Vec2(x, y)
	}
	
}
Spotlight.prototype.constructor = illuminated.constructor
if (typeof module === 'object') {
	/**
	 * If Map is loaded as a Node module, then this line is called.
	 */
	module.exports = Spotlight
} else {
	/**
	 * If Map is loaded into the browser, then this line is called.
	 */
	window.Spotlight = Spotlight
}
