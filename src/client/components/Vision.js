import {} from '../../shared/Constants.js'
// get a relative position with and event
function positionWithE(e) {
	return {
		x: e.pageX || 0,
		y: e.pageY || 0,
	}
}
export default class Vision {
	constructor(scene, player, map) {
	//this.scene = scene
	//this.elem = []
	//this.x = player.x || 0
	//this.y = player.y || 0
	//this.rotation = player.rotation || 0
	//this.obstacles = this.scene.add.group()
	//this.add = this.scene.add.spotlight
	////this.raycaster = this.scene.raycasterPlugin.createRaycaster({
	////    mapSegmentCount: 31,
	////})
	////this.raycaster.setBoundingBox(
	////    this.camera.x,
	////    this.camera.y,
	////    this.camera.width,
	////    this.camera.height,
	////)
	////this.ray = this.raycaster.createRay({ autoSlice: true })
	////this.ray.setOrigin(this.x, this.y).setCone(90)
	//var texture = this.scene.textures.createCanvas('canvastexture', 800, 600)
	//this.scene.add.image(0, 0, 'canvastexture').setOrigin(0)
	//this.lamp = this.add.lamp(this.x, this.y, 300)
	//this.rect = this.add.rect(this.lamp, [this.rect])
	//this.lighting = this.add.lighting(this)
	//console.log(this.lamp, this.rect, this.lighting)
	//this.draw(player)
	////this.raycaster.mapGameObjects(this.obstacles.getChildren())
	////this.intersections = this.ray.castCircle()
	////this.createViewField({
	////    width: 1,
	////    color: 0xffffff,
	////    alpha: 0,
	////})
	////this.draw()
	}
	// /update(state) {
	// /	//this.raycaster.setBoundingBox(
	// /	//    this.camera.x,
	// /	//    this.camera.y,
	// /	//    this.camera.width,
	// /	//    this.camera.height,
	// /	//)
	// /	//this.ray.setOrigin(state.x, state.y)
	// /	//this.intersections = this.ray.castCircle()
	// /	this.draw(state)
	// /}
	// /createViewField(colors) {
	// /	this.graph = this.scene.add.graphics().setVisible(false)
	// /	this.fog = createFog(this, this.graph)
	// /}
	// /draw(state) {
	// /	this.scene.spotlight.update()
	// /	//  this.light.position = new Vec2(state.x, state.y)
	// /	//  this.lighting.compute(this.camera.width, this.camera.height)
	// /	//this.ctx.fillStyle = 'black'
	// /	//this.ctx.fillRect(0, 0, this.camera.width, this.camera.height)
	// /	this.ctx.globalCompositeOperation = 'lighter'
	// /	//this.lighting.render(this.ctx)
	// /	this.ctx.globalCompositeOperation = 'source-over'
	// /	//this.graph.fillStyle(0xffffff, 1)
	// /	//if (this.intersections.length > 0) this.graph.fillPoints(this.intersections)
	// /	//this.graph.fillPoint(this.ray.origin.x, this.ray.origin.y, 3)
	// /}
	// /get camera() {
	// /	return this.scene.cameras.main.worldView
	// /}
}
function createFog(self, mask) {
	const rt = self.scene.make
		.renderTexture(
			{
				width: window.innerWidth,
				height: window.innerHeight,
			},
			true,
		)
		.fill(0x000000, 0.5)
		.setScrollFactor(0)
		.setBlendMode(0)
	rt.mask = new Phaser.Display.Masks.GeometryMask(self.scene, mask)
	rt.mask.invertAlpha = true
	return rt
}
function createObstacles(self) {
	const scene = self.scene
	const objects = scene.map.objects
	for (let i = 0; i < objects.length; i++) {
		let obj = objects[i],
			_x = obj.x,
			_y = obj.y
		if (obj.type == 'rectangle') {
			_x = _x + obj.width / 2
			_y = _y + obj.height / 2
			self.obstacles.add(scene.add.rectangle(_x, _y, obj.width, obj.height).setStrokeStyle(0, 0x000000))
		}
	}
}
