class Preload {
	constructor(scene) {
		this.scene = scene
		this.scene.load.setPath('../../../public/assets/')
		this.LoadLayers()
		this.LoadImages()
		this.LoadCharasters()
        this.scene.load.scenePlugin({
			key: 'IlluminatedJS',
			url: '../../src/lib/illuminated.p3.js',
			sceneKey: 'illuminated',
		})
		// ====
	}
	LoadLayers() {
		this.scene.load.image('tileset', ['maps/tilesetw.PNG'])
		this.scene.load.tilemapTiledJSON('64x64', 'maps/64x64.json')
	}
	LoadImages() {
		this.scene.load.image('acid-bullet', 'bullet/plazma.png')
		this.scene.load.image('aim', 'cursor-x.png')
		this.scene.load.glsl('bundle', 'shaders/bundle.glsl')
	}
	LoadCharasters() {
		for (let n = 1; n < 5; n++) {
			this.scene.load.image('type-' + n, ['characters/v' + n + '.png', 'characters/v' + n + '_n.png'])
		}
	}
}
if (typeof module === 'object') {
	/**
	 * If Constants is loaded as a Node module, then this line is called.tileset2
	 */
	module.exports = Preload
} else {
	/**
	 * If Constants is loaded into the browser, then this line is called.
	 */
	window.Preload = Preload
}
