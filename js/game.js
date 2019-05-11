var config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 640,
    autoCenter: 1,
    backgroundColor: 'black',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true,
    audio: {
        disableWebAudio: true,
        noAudio: false
    },
    fps: {
        target: 2,
        min: 2,
        forceSetTimeOut: true
    }
};

var game = new Phaser.Game(config);