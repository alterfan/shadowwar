const CON = {
    PLAYER: {
        HP: 100,
        VEL: 400,
    },
    SERVER: {
        PORT: 5000,
        RATE: 60,
    },
    GRAPH: {
        FOG_DARK: 0.8,
        FOG_SHADOWS: 0.5
    },
    WEAPON: {
        1: {
            name: 'HANDGUN',
            FIRERATE: 0,
            DAMAGE: 10,
            AMMO: 30,
            BULLETSPEED: 2000
        },
        2: {
            name: 'PLASMA_GUN',
            FIRERATE: 200,
            DAMAGE: 20,
            AMMO: 20,
            BULLETSPEED: 1000
        },
        3: {
            name: 'ASSAULT_RIFLE',
            FIRERATE: 500,
            DAMAGE: 10,
            AMMO: 30,
            BULLETSPEED: 1200
        },
    },
    MSG: {
        CONNECTION: 'connection',
        CONNECT: 'connect',
        CONNECTED: 'connected',
        UPDATE: 'update',
        INPUT: 'input',
        DEAD: 'dead',
        DAMAGE: 'damage',
        DISCONNECT: 'disconnect',
        FIRE: 'fire',
        SPAWN: 'spawn',
        GETSPAWN: 'get_spawn',
        PING: 'ping_time',
    },
    FONTSTYLE: {
        DEFAULT: {
            fontSize: '18px',
            fontFamily: 'Major Mono Display',
            fontStyle: 'bold',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 8,
            },
        },
        SYSTEM: {
            fontSize: '12px',
            fontFamily: 'Major Mono Display',
            fontStyle: 'bold',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            backgroundColor: 'rgba(0,0,0,1)',
            lineSpacing: 10,
        },
        LINEHEIGHT: 25,
    },
}
if (typeof module === 'object') {
    /**
     * If Constants is loaded as a Node module, then this line is called.
     */
    module.exports = CON
} else {
    /**
     * If Constants is loaded into the browser, then this line is called.
     */
    window.CON = CON
}
