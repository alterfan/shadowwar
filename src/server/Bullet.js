const Utils = require('../shared/Utils.js')
const CON = require('../shared/Constants.js')
class Bullet extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, 0, 0, 'acid-bullet')
        this.scene = this.scene
        this.born = 0
        this.direction = 0
        this.damage = 20
        this.maxDmgDistance = 200
        this.scene.physics.add.existing(this)
        this.scene.physics.add.collider(this, this.scene.map.layer, bulletCollide, null, this)
    }
    colliders() {
        for (const key in this.scene.players) {
            const enemy = this.scene.players[key]
            this.scene.physics.add.overlap(enemy, this, () => {
                this.scene.players[key].damage(this.damage)
                this.destroy()
            })
        }
    }
    fire(shooter) {
        const offset = Phaser.Math.Rotate({ x: 64, y: 0, }, shooter.rotation)
        const x = shooter.x + offset.x
        const y = shooter.y + offset.y
        this.shooter = shooter
        this.weaponType = CON.WEAPON[shooter.weapon].BULLETSPEED
        this.speed = CON.WEAPON[shooter.weapon].BULLETSPEED
        this.setPosition(x, y)
        this.setRotation(shooter.rotation)
        this.setAngle(shooter.angle)
        this.colliders()
        this.born = 0
    }
    update(time, delta) {
        this.scene.physics.velocityFromAngle(this.angle, this.speed, this.body.velocity)
        this.born++
        if (this.born > 2000) this.destroy()
    }
    getState() {
        return {
            x: this.x,
            y: this.y,
            rotation: this.body.rotation,
            angle: this.angle,
            weaponType: this.weaponType,
        }
    }
}
function bulletCollide(bullet, groundLayer) {
    bullet.destroy()

}
module.exports = Bullet
