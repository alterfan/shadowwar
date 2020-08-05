const CON = require('../shared/Constants.js')
const Player = require('./Player.js')
class Network {
    constructor (scene, io) {
        this.scene = scene
        this.io = io
    }
    init() {
        const self = this
        this.clients = self.scene.clients
        this.io.emit(CON.MSG.GETSPAWN, self.scene.map.getState())
        this.io.on('connection', function (socket) {
            self.scene.clients[socket.id] = {
                kills: 0,
                deads: 0,
                name: 'Player'
            }
            console.log('@connection ')
            console.log('*** ', self.clients[socket.id])
            socket.on(CON.MSG.CONNECTED, (state) => onConnected(socket, state, self))
            socket.on(CON.MSG.INPUT, (state) => onInput(socket, state, self))
            socket.on(CON.MSG.PING, () => {
                socket.emit(CON.MSG.PING)
            })
            socket.on(CON.MSG.DISCONNECT, () => {
                console.log('@disconnection ')
                console.log('*** ', socket.id)
                delete self.scene.state.players[socket.id]
                delete self.scene.players[socket.id]
            })
        })
    }
    emit(m, d) {
        this.io.emit(m, d)
    }
}
const onConnected = function (socket, state, self) {
    const spawnzone = self.scene.map.getSpawn()
    state.x = spawnzone.x
    state.y = spawnzone.y
    self.scene.player = self.scene.players[socket.id] = new Player(self.scene, socket.id, state)
    socket.emit(CON.MSG.SPAWN, self.scene.map.getState())
}
const onInput = function (socket, state, self) {
    self.scene.players[socket.id].action(state)
    if (state.mouseLocked) self.scene.players[socket.id].fire(state)
}
if (typeof module === 'object') {
    /**
     * If Constants is loaded as a Node module, then this line is called.
     */
    module.exports = Network
} else {
    /**
     * If Constants is loaded into the browser, then this line is called.
     */
    window.Network = new Network()
}
