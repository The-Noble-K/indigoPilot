var config = {
    type: Phaser.WEBGL,
    width: 500,
    height: 500,
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
    }
};

var game = new Phaser.Game(config);