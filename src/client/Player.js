import {} from '../shared/Constants.js'
import Vision from './components/Vision.js'
export default class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, state, isEnemy) {
		super(scene, state, isEnemy)
		this.scene = scene
		this.id = state.id
		this.x = state.x
		this.y = state.y
		this.rotation = 0
		this.depth = 100
		this.health = 100
		this.state = state
		this.buffer = []
		this.firetime = 0
		this.isDead = false
		this.isEnemy = isEnemy
		this.lastTime = 0
		this.create(state)
	}
	create(state) {
		this.hp = this.text(0, 80, -1, 0)
		this.ammo = this.text(0, -100, -1, 0)
		this.nickname = this.text(0, -100, 0.5, 0)
		this.img = this.scene.add.sprite(0, 0, 'type-' + (1 + Math.floor(Math.random() * 4)), true)
		const container = this.scene.add.container(state.x, state.y)
		container.add(this.img)
		container.add(this.hp)
		container.add(this.ammo)
		container.add(this.nickname)
		this._physics = this.scene.physics.add.existing(container)
		this._physics.body.setCollideWorldBounds(true)
		this._physics.body.setOffset(-40, -40)
		this._physics.body.setCircle(40)
		this.container = this._physics
		if (!this.isEnemy) {
			this.scene.cameras.main.startFollow(this.container, false, 1, 1)
			this.printHealth(state.hp)
			this.printAmmo(state.ammo)
			this.vision = new Vision(this.scene, state, this.scene.map.tilemap.layers[0])
		} else this.printName(state.nickname)
	}
	text(hpos, vpos, ho, vo) {
		const text = new Phaser.GameObjects.Text(this.scene, hpos, vpos, '')
			.setOrigin(ho, vo)
			.setStyle(CON.FONTSTYLE.DEFAULT)
			.setFontFamily(CON.FONTSTYLE.DEFAULT.fontFamily)
		return text
	}
	printName(nickname) {
		this.nickname.setText(nickname).setFontFamily(CON.FONTSTYLE.DEFAULT.fontFamily)
	}
	printAmmo(ammo) {
		this.ammo.setText(ammo < 100 ? ' ' + ammo.toString() : ammo).setFontFamily(CON.FONTSTYLE.DEFAULT.fontFamily)
	}
	printHealth(hp) {
		hp = parseInt(hp)
		this.hp.setText(hp < 100 ? ' ' + hp : hp)
	}
	dead() {
		this.container.setVisible(false)
		this.container.setActive(false)
	}
	respawn() {
		this.health = 100
		this.container.setPosition(this.state.x, this.state.y)
		this.container.setVisible(true)
		this.container.setActive(true)
		this.scene.cameras.main.startFollow(this.container, false, 1, 1)
	}
	update(state, time) {
		let now = new Date().getTime(),
			dt = time / (now - this.lastTime),
			dx = (state.x - this.pos.x) / dt,
			dy = (state.y - this.pos.y) / dt
		this.container.x += dx
		this.container.y += dy
		this.img.setRotation(state.rotation)
		if (!this.isEnemy) {
			
			this.printHealth(state.hp)
			this.printAmmo(state.ammo)
		}
		this.lastTime = now
	}
	destroy() {
		this.container.destroy()
	}
	get sprite() {
		return this.container
	}
	get pos() {
		return { x: this.container.x, y: this.container.y }
	}
}
