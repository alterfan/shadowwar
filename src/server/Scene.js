class Scene {
    constructor () {
        this.players = {}
        this.clients = {}
        this.state = new State()
        this.player = false
        this.network = new Network(this, io)
    }
    preload() {
        new Preload(this)
    }
    create() {
        this.physics.world.setFPS(60)
        this.map = new Tilemap(this, '60x60')
        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        })
        this.network.init()
    }
    update(timestamp, time) {

        this.state.time = time
        this._bullets = this.bullets.getChildren()
        for (let id in this.players)
            this.state.players[id] = this.players[id].getState()
        for (let id = 0; id < this._bullets.length; id++)
            this.state.bullets[id] = this._bullets[id].getState()
        for (let id in this.state.bullets)
            if (this._bullets[id] == undefined) delete this.state.bullets[id]
        this.network.emit(Constants.MSG.UPDATE, this.state)
    }
}
let fps_timer = 0
let sps_timer = 0
var update = () => {
    const now = Date.now()
    if (now - fps_timer >= CONFIG.FPS) {
        fps_timer = now
    }
    else
        fps_timer += this.time.elapsedMS
    if (sps_timer >= CONFIG.SPS) {
        sps_timer -= CONFIG.SPS
    }
    else
        sps_timer += this.time.elapsedMS
}
new Phaser.Game({
    type: Phaser.HEADLESS,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            },
            maxVelocity: 5000,
        },
    },
    scene: Scene,
    autoFocus: false,
    fps: {
        min: 10,
        target: 15,
        forceSetTimeOut: true,
        deltaHistory: 10,
    },
})
PhaserStartServer()
