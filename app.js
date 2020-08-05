const CON = require('./src/shared/Constants.js')
const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
const PhaserAuthoritativeServer = require('phaser3-authoritative-server')(server, io, CON.SERVER.PORT)
app.set('port', CON.PORT)
console.log(CON.PORT)
app.use('/', express.static(__dirname + '/public'))
app.use('/public/assets', express.static(__dirname + '/public/assets'))
app.use('/vendors', express.static(__dirname + '/vendors'))
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/src', express.static(__dirname + '/src'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.get('/public/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
var obj = {
    console: console,
    Constants: __dirname + '/src/shared/Constants.js',
    Bullet: __dirname + '/src/server/Bullet.js',
    Player: __dirname + '/src/server/Player.js',
    Network: __dirname + '/src/server/Network.js',
    Preload: __dirname + '/src/shared/Preload.js',
    State: __dirname + '/src/shared/State.js',
    Tilemap: __dirname + '/src/server/Tilemap.js',
    Codec: require('./src/lib/codec.js'),
    Binary: require('./src/lib/binary.js'),
}
PhaserAuthoritativeServer.startScene('/src/server/Scene.js', obj)
