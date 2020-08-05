class State {
	constructor() {
		this.players = {}
		this.bullets = {}
		this.clients = {}
		this.leaderbord = {}
		this.data = {
			players: {},
			bullets: {},
			leaderbord: {},
			map: {},
		}
		this.map
	}
}

if (typeof module === 'object') {
	/**
	 * If Map is loaded as a Node module, then this line is called.
	 */
	module.exports = State
} else {
	/**
	 * If Map is loaded into the browser, then this line is called.
	 */
	window.State = State
}
