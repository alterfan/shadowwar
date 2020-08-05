import {} from '../../lib/codec.js'
import {} from '../../shared/Constants.js'
import {} from '../../shared/Preload.js'
import {} from '../../shared/State.js'
import Controls from '../Controls.js'
import Player from '../Player.js'
import Bullet from '../Bullet.js'
import Map from '../Tilemap.js'
import Stat from '../components/Monitor.js'
import Viewport from '../components/Viewport.js'
class SimpleLightShader extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
	constructor(game) {
		super(game)
		let lightsArray = new Array(MAX_LIGHTS * 4)
		lightsArray.fill(0, 0, lightsArray.length)
		this.uniforms.lightsCount = { type: '1i', value: 0 }
		this.uniforms.lights = { type: '4fv', value: lightsArray }
		this.fragmentSrc = `
        precision highp float;
        uniform int lightsCount;
        uniform vec4 lights[${MAX_LIGHTS}];
        void main() {
          float lightness = 0.;
          for (int i = 0; i < ${MAX_LIGHTS}; i++) {
            if (i >= lightsCount) break;
            vec4 light = lights[i];
            lightness += step(length(light.xy - gl_FragCoord.xy), light.z);
          }
          lightness = clamp(0., 1., lightness);
          gl_FragColor = mix(vec4(0,0,0,0.5), vec4(0,0,0,0), lightness);
        }
       `
	}
	updateLights(lightSources) {
		this.uniforms.lightsCount.value = lightSources.length
		let i = 0
		let array = this.uniforms.lights.value
		for (let light of lightSources) {
			array[i++] = light.x
			array[i++] = game.world.height - light.y
			array[i++] = light.radius
			i++
		}
	}
}
export default class Arena extends Phaser.Scene {
	constructor() {
		super({
			key: 'Arena',
		})
		this.socket = io({ timeout: 5000, reconnection: false })
		this.states_buffer = []
		this.lamps = []
		this.state = new State()
		this._players = {}
		this._bullets = {}
		this.player = false
		this.viewport = false
		this.lag = 0
		this.ut = 0
		this.local_time = 0
	}
	preload() {
		new Preload(this)
	}
	create() {
		this.controls = new Controls(this)
		this.viewport = new Viewport(this)
		this.physics.world.setFPS(30)
		this.socket.emit(CON.MSG.CONNECTED, {
			nickname: this.socket.id,
		})
		this.lamp = this.illuminated.createLamp(150, 170, {
			distance: 200,
			diffuse: 0.8,
			color: 'rgba(255, 255, 255, 0.5)',
		})
		this.lamps.push(this.lamp)
		this.socket.on(CON.MSG.SPAWN, (state) => {
			this.map = new Map(this, state)
			this.cameras.main.setBounds(0, 0, state.w, state.h)
			this.input.on('pointermove', (pointer) => {
				if (this.input.mouse.locked) this.controls.aim.update()
			})
			this.socket.on(CON.MSG.UPDATE, (state) => {
				this.stateUpdates(state)
				this.lamp.position = new illuminated.Vec2(state.x, state.y)
			})
			this.socket.on('disconnect', (reason) => {
				if (reason == 'transport close') location.reload()
			})
		})
		this.rect = this.illuminated.createRectangleObject(0, 0, 16, 24)
		var arr = []
		for (let i = 0; i < this.lamps.length; i++) this.lamps[i].createLighting([this.rect])
	}
	stateUpdates(state) {
		this.state = state
	}
	update(timestamp, time) {
		Stat.begin()
		this.applyUpdates(this.state, time)
		this.controls.handler(this.input)
		Stat.end()
	}
	applyUpdates(state, time) {
		for (var id in state.bullets) {
			let bulletState = state.bullets[id]
			if (this._bullets[id] == undefined) this._bullets[id] = new Bullet(this, bulletState)
			this._bullets[id].update(bulletState, state.time)
		}
		for (var id in this._bullets) {
			if (state.bullets[id] == undefined) {
				this._bullets[id].destroy()
				delete this._bullets[id]
			}
		}
		for (var id in state.players) {
			const p_entity = this._players[id],
				p_state = state.players[id]
			if (id === this.socket.id && p_entity == undefined) {
				this.player = this._players[id] = new Player(this, p_state, false)
			} else if (id != this.socket.id && p_entity == undefined) {
				this._players[id] = new Player(this, p_state, true)
			} else if (p_state.isDead) {
				p_entity.respawn()
			} else if (this.cameras.main) {
				p_entity.update(p_state, state.time)
			}
		}
		for (var id in this._players) {
			if (state.players == undefined) {
				this._players[id].destroy()
				delete this._players[id]
			}
		}
		this._previousTimestamp = this.timestamp
	}
}
