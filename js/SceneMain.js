class SceneMain extends Phaser.Scene {
    
    constructor() {
        super({ key: 'SceneMain' });
    }
    
    preload() {
        this.load.image('bg', 'content/backgrounds/desert-background.png');
        this.load.spritesheet('player', 'content/spritesheets/ship.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('explosion', 'content/spritesheets/explosion.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lasers', 'content/spritesheets/laser-bolts.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('smEnemy', 'content/spritesheets/enemy-small.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('mdEnemy', 'content/spritesheets/enemy-medium.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lgEnemy', 'content/spritesheets/enemy-big.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('pwrup', 'content/spritesheets/power-up.png', { frameWidth: 16, frameHeight: 16 });
    }
    
    create() {
        
    }
    
    update() {
        
    }
}