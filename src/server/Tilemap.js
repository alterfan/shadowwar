const Utils = require('../shared/Utils.js')
class Tilemap {
    constructor(scene, name) {
        this.scene = scene
        this.name = name
        this.places = {}
        this.state = {}
        this.usedZones = {}
        this.addLayers()
    }
    addLayers() {
        this.tilemap = this.scene.make.tilemap({
            key: '64x64'
        });
        this.layer = this.tilemap.createStaticLayer(0, this.tilemap.addTilesetImage('tileset', 'tileset'), 0, 0);
        const arr = Array(48).fill(31).map((v, i) => v + i + 1)
        this.layer.setCollisionByExclusion(arr, true, true);
        this.scene.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels)
        this.places = this.tilemap.objects[0].objects
    }
    getSpawn() {
        for (let id = 0; id < this.places.length; id++) {
            this.usedZones[id] = this.places[id]
            this.places.splice(id, 1)
            setTimeout(() => {
                this.places.push(this.usedZones[id])
            }, 5000)
            return {
                x: this.usedZones[id].x + this.usedZones[id].width / 2,
                y: this.usedZones[id].y + this.usedZones[id].height / 2,
            }
        }
    }
    getState() {
        this.state.w = this.tilemap.widthInPixels
        this.state.h = this.tilemap.heightInPixels
        this.state.name = this.name
        return this.state
    }
}
module.exports = Tilemap
