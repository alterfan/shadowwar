const Utils = {
    Math: {
        Direction: function (angle) {
            const rads = Phaser.Math.DegToRad(angle)
            const direction = Math.atan(Math.cos(rads) / Math.sin(rads))
            return direction
        },
        Random: function (range) {
            return Math.floor(Math.random() * range)
        },
    },
    Lerp: function (a, b, interpolation) {
        interpolation = interpolation > 1.0 ? 1.0 : interpolation
        return a + (b - a) * interpolation
    },
    Lerp2: function (a, b, interpolation) {
        interpolation = interpolation > 1.0 ? 1.0 : interpolation
        return {
            x: Lerp(a.x, b.x, interpolation),
            y: Lerp(a.y, b.y, interpolation)
        }
    }
    /*  Interpolate: function (p, n, interpolation) {
        interpolation = Math.max(0, Math.min(1, interpolation))
         return p + interpolation * (n - p)
     }, */
}
if (typeof module === 'object') {
	/**
	 * If Constants is loaded as a Node module, then this line is called.
	 */
    module.exports = Utils
} else {
	/**
	 * If Constants is loaded into the browser, then this line is called.
	 */
    window.Utils = Utils
}
