export default {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 0,
            },
        },
    },
    loader: {
        baseURL: 'http://83.166.96.65:5000',
        crossOrigin: 'anonymous',
    },
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin',
            }
        ],
    },
    fps: {
        min: 25,
        target: 60,
        forceSetTimeOut: true,
        deltaHistory: 10,
    },
}
