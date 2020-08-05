import { } from '../lib/phaser.min.js'
import { } from '../lib/phaser-raycaster.js'
import { } from '../lib/phaser-illuminated.js'
import Config from './Config.js'
import Arena from './scenes/Arena.js'
class Game extends Phaser.Game {
    constructor (config) {
        super(
            Object.assign(config, {
                scene: [Arena],
            }),
        )
    }
}
window.addEventListener('load', () => {
    var game = new Game(Config)
})
document.onmousemove = () => {
    window.focus()
}
