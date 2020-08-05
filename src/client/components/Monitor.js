import Stats from '../../lib/Stats.js'
class Monitor {
    constructor() {
        this.stats = new Stats()
        this.stats.setMode(0) // 0: fps, 1: ms
        this.stats.domElement.style.position = 'absolute'
        this.stats.domElement.style.margin = '0'
        this.stats.domElement.style.left = '5px'
        this.stats.domElement.style.top = '5px'
        document.body.appendChild(this.stats.domElement)
    }
    begin() {
        if (this.stats)
            this.stats.begin()
    }
    end() {
        if (this.stats)
            return this.stats.end();
    }
}
export default new Monitor()
