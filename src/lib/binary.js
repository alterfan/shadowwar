var encodeUint8 = (function () {
    var arr = new Uint8Array(1)
    return function (number) {
        // If we assume that the number passed in
        // valid, we can just use it directly.
        // return String.fromCharCode( number );
        arr[0] = number
        return String.fromCharCode(arr[0])
    }
}())
var encodeFloat32 = (function () {
    var arr = new Float32Array(1)
    var char = new Uint8Array(arr.buffer)
    return function (number) {
        arr[0] = number
        // In production code, please pay
        // attention to endianness here.
        return String.fromCharCode(char[0], char[1], char[2], char[3])
    }
}())
var encodeState = function (state) {
    var msg = ''
    for (var i = 0; i < Object.keys(state).length; ++i) {
        var player = state[i]
        // Encode id
        msg += encodeUint8(player.id)
        // Encode transform
        msg += (encodeFloat32(player.transform.position.x) +
            encodeFloat32(player.transform.position.y) +
            encodeFloat32(player.transform.position.z) +
            encodeFloat32(player.transform.rotation.x) +
            encodeFloat32(player.transform.rotation.y) +
            encodeFloat32(player.transform.rotation.z) +
            encodeFloat32(player.transform.rotation.w))
    }
    return msg
}
var decodeUint8 = function (str, offset, obj, propName) {
    obj[propName] = str.charCodeAt(offset)
    // Number of bytes (characters) read.
    return 1
}
var decodeFloat32 = (function () {
    var arr = new Float32Array(1)
    var char = new Uint8Array(arr.buffer)
    return function (str, offset, obj, propName) {
        // Again, pay attention to endianness
        // here in production code.
        for (var i = 0; i < 4; ++i) {
            char[i] = str.charCodeAt(offset + i)
        }
        obj[propName] = arr[0]
        // Number of bytes (characters) read.
        return 4
    }
}())
var decodeState = function (str) {
    var charsRead = 0
    var state = []
    while (charsRead < str.length) {
        // GC performance suffers here. Read Martin Wells’
        // article about writing GC-friendly code, here
        // on BuildNewGames.com
        var player = { transform: {} }
        var position = player.transform.position = {}
        var rotation = player.transform.rotation = {}
        // !!!: The order of decode is same as encode!
        // Decode id
        charsRead += decodeUint8(str, charsRead, player, 'id')
        // Decode transform
        charsRead += decodeFloat32(str, charsRead, position, 'x')
        charsRead += decodeFloat32(str, charsRead, position, 'y')
        charsRead += decodeFloat32(str, charsRead, position, 'z')
        charsRead += decodeFloat32(str, charsRead, rotation, 'x')
        charsRead += decodeFloat32(str, charsRead, rotation, 'y')
        charsRead += decodeFloat32(str, charsRead, rotation, 'z')
        charsRead += decodeFloat32(str, charsRead, rotation, 'w')
        state.push(player)
    }
    return state
}
if (typeof module === 'object') {
    /**
     * If Constants is loaded as a Node module, then this line is called.
     */
    module.exports = { encodeState, decodeState }
} else {
    /**
     * If Constants is loaded into the browser, then this line is called.
     */
    window.encodeState = encodeState
    window.decodeState = decodeState
}
