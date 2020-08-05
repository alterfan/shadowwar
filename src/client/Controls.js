import { } from '../shared/Constants.js'
class Aim extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'aim')
        this.scene = scene
        this.x = 24
        this.y = 24
        this.container = this.scene.add
            .container(x, y, this)
            .setSize(this.displayWidth, this.displayHeight)
            .setDepth(1000)
            .setPosition(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY)
            .setVisible(false)
            .setBlendMode(Phaser.BlendModes.NORMAL)
        this.scene.tweens.add({
            targets: this,
            scale: {
                value: 0.8,
                duration: 600,
                yoyo: true,
                repeat: -1,
            },
        })
    }
    update() {
        const p = this.scene.input.activePointer
        const c = this.scene.cameras.main
        let x = this.container.x
        let y = this.container.y
        let offscreenX = {
            min: c.worldView.x,
            max: c.worldView.x + window.innerWidth,
        }
        let offscreenY = {
            min: c.worldView.y,
            max: c.worldView.y + window.innerHeight,
        }
        x += p.movementX
        y += p.movementY
        if (x <= offscreenX.min) x = offscreenX.min
        if (x >= offscreenX.max) x = offscreenX.max
        if (y <= offscreenY.min) y = offscreenY.min
        if (y >= offscreenY.max) y = offscreenY.max
        this.container.setPosition(x, y)
    }
    get pos() {
        return {
            x: this.container.x,
            y: this.container.y,
        }
    }
}
export default class Controls {
    constructor (scene) {
        this.scene = scene
        this.pressTime = 0
        this.aim = new Aim(
            this.scene,
            this.scene.input.manager.activePointer.x,
            this.scene.input.manager.activePointer.y,
        )
        document.onpointerlockchange = () => {
            if (!this.scene.input.mouse.locked) this.aim.container.setVisible(false)
            else if (this.scene.input.mouse.locked) this.aim.container.setVisible(true)
        }
        this.key = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            w: Phaser.Input.Keyboard.KeyCodes.W,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            r: Phaser.Input.Keyboard.KeyCodes.R,
        })
        this.mouse = {
            x: this.scene.input.activePointer.x,
            y: this.scene.input.activePointer.y,
            mouseLeft: false,
            mouseRight: false,
        }
        this.touch = {}
        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            r: false,
            mouseX: this.mouse.x,
            mouseY: this.mouse.y,
            mouseLeft: false,
            mouseRight: false,
        }
        this.lastState = {}
    }
    onKeyPress() {
        if (this.key.left.isDown || this.key.a.isDown) this.state.left = true
        else if (this.key.left.isUp || this.key.a.isUp) this.state.left = false
        if (this.key.right.isDown || this.key.d.isDown) this.state.right = true
        else if (this.key.right.isUp || this.key.d.isUp) this.state.right = false
        if (this.key.up.isDown || this.key.w.isDown) this.state.up = true
        else if (this.key.up.isUp || this.key.w.isUp) this.state.up = false
        if (this.key.down.isDown || this.key.s.isDown) this.state.down = true
        else if (this.key.down.isUp || this.key.s.isUp) this.state.down = false
        if (this.key.r.isDown) this.state.r = true
        else if (this.key.r.isUp) this.state.r = false
    }
    onMouseMove(input) {
        if (this.scene.input.mouse.locked && this.aim) {
            this.state.mouseX = this.aim.pos.x
            this.state.mouseY = this.aim.pos.y
        }
    }
    onMousePress(input) {
        window.focus()
        input.on('pointerdown', (pointer) => {
            if (!pointer.locked) input.mouse.requestPointerLock()
            else {
                this.state.mouseLeft = pointer.leftButtonDown()
                this.state.mouseRight = pointer.rightButtonDown()
                this.state.mouseLocked = pointer.locked
            }
        })
        input.on('pointerup', (pointer) => {
            this.state.mouseLeft = pointer.leftButtonDown()
            this.state.mouseRight = pointer.rightButtonDown()
            this.state.mouseLocked = pointer.locked
        })
    }
    handler(mouse) {
        this.onKeyPress()
        this.onMousePress(mouse)
        this.onMouseMove(mouse)
        this.state.timestamp = Date.now()
        this.scene.socket.emit(CON.MSG.INPUT, this.state)
    }
    getState() {
        return this.state
    }
}
