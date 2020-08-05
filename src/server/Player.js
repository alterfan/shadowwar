const CON = require('../shared/Constants.js')
class Player extends Phaser.Physics.Arcade.Image {
    constructor (scene, id, state) {
        super(scene, 0, 0, 'player')
        this.scene = scene
        this.id = id
        this.vel = CON.PLAYER.VEL
        this.hp = CON.PLAYER.HP
        this.isDead = false
        this.weapon = 2
        this.canFire = true
        this.ammo = CON.WEAPON[2].AMMO
        this.create(state, id)
    }
    create(state, id) {
        this.x = state.x
        this.y = state.y
        this.lastFired = 0
        this.nickname = state.nickname
        this.ID = id
        this.scene.physics.add.existing(this)
        this.body.setBounce(0)
        this.body.setMass(100)
        this.body.setOffset(-26, -26)
        this.body.setCircle(40)
        this.setCollideWorldBounds(true)
        this.scene.physics.add.collider(this, this.scene.map.layer)
        for (const id in this.scene.players) {
            if (this.ID != id) this.scene.physics.add.collider(this, this.scene.players[id].obj)
        }
        this.velocity = 800
    }
    getState() {
        return {
            id: this.ID,
            hp: this.hp,
            ammo: this.ammo,
            x: this.x,
            y: this.y,
            rotation: this.rotation,
            angle: this.angle,
            nickname: this.nickname,
            isDead: this.isDead,
            weapon: this.weapon,
            st: Date.now()
        }
    }
    action(state) {
        const vel = this.body.velocity
        if (state.left) vel.x = -this.vel
        else if (state.right) vel.x = this.vel
        else if (!state.right && !state.left) vel.x = 0
        if (state.up) vel.y = -this.vel
        else if (state.down) vel.y = this.vel
        else if (!state.up && !state.down) vel.y = 0
        if (state.r) this.reloadAmmo()
        this.rotation = Math.atan2(state.mouseY - this.y + 24, state.mouseX - this.x + 24)
    }
    fire(state) {
        /*         this.bullets = new Bullets(this);
                this.bullets.fireBullet(this.ship.x, this.ship.y); */
        const time = Date.now()
        if (state.mouseLeft && time > this.lastFired) {
            if (this.ammo > 0) {
                const bullet = this.scene.bullets.get()
                if (bullet) {
                    bullet.fire(this.getState())
                    this.ammo -= 1
                }
                this.lastFired = time + CON.WEAPON[this.weapon].FIRERATE
            } else if (this.ammo < 0) this.canFire = false
        }
        if (!state.mouseLeft) this.lastFired = 0
    }
    reloadAmmo() {
        this.ammo = 'R'
        setTimeout(() => {
            this.ammo = CON.WEAPON[this.weapon].AMMO
            this.canFire = true
        }, 3000)
    }
    damage(dmg) {
        this.hp -= dmg
        if (this.hp <= 0) {
            this.respawn()
        }
    }
    respawn() {
        this.isDead = true
        setTimeout(() => {
            this.isDead = false
            const st = this.scene.map.getSpawn()
            this.x = st.x
            this.y = st.y
            this.hp = 100
        }, 1000)
    }
    destroy() {
        this.destroy()
    }
}
module.exports = Player
