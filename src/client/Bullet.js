import { } from '../shared/Utils.js'
export default class Bullet {
    constructor (scene, state) {
        this.scene = scene
        this.born = 0
        this.direction = 0
        this.speed = 1000
        this.lastTime = 0
        this.obj = this.scene.add.image(state.x, state.y, 'acid-bullet')
        this.obj.setPosition(state.x, state.y)
        this.obj.setRotation(state.rotation)
        this.obj.setAngle(state.angle)
        this.scene.physics.add.existing(this.obj)
    }
    update(state, time) {
        let now = (new Date()).getTime(),
            dt = time / (now - this.lastTime),
            dx = (state.x - this.obj.x) / dt,
            dy = (state.y - this.obj.y) / dt
        this.obj.x += dx
        this.obj.y += dy
        this.obj.setRotation(state.rotation)
        this.obj.setAngle(state.angle)
        this.direction = Utils.Math.Direction(state.angle)
        this.lastTime = now
    }
    destroy() {
        if (this.obj) {
            this.obj.destroy()
        }
    }
}
