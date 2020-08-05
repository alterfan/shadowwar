export default class Map {
    constructor (scene, state) {
        this.scene = scene
        this.name = state.name
        this.tilemap = this.scene.make.tilemap({
            key: '64x64',
        })
        this.objects = this.tilemap.objects[0].objects
        this.createLayers()
    }
    createLayers() {
        const arr = Array(48)
            .fill(31)
            .map((v, i) => v + i + 1)
        const w = this.tilemap.widthInPixels
        const h = this.tilemap.heightInPixels
        this.layer = this.tilemap.createStaticLayer(
            0,
            [this.tilemap.addTilesetImage('tileset', 'tileset')],
            0,
            0,
        )
        this.layer.setCollisionByExclusion(arr, true, true)
        this.scene.physics.world.setBounds(0, 0, w, h)
		/* 	this.tilemap.renderDebug(this.scene.add.graphics(), {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 50),
			faceColor: new Phaser.Display.Color(243, 134, 48, 255),
		}) */
        this.layer.setDepth(0)
        this.layer.setBlendMode(3)
    }
    get obstaclesGroup() {
        return this.obstacles
    }
}
