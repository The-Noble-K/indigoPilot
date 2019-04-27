class SceneMain extends Phaser.Scene {
    
    constructor() {
        super({ key: 'SceneMain' });
    }
    
    preload() {
        
        //Backgrounds & Sprites
        this.load.image('bg', 'content/background.png');
        this.load.spritesheet('player', 'content/ship.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('explosion', 'content/explosion.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('playerLaser', 'content/playerlaser.png');
        this.load.image('enemyLaser', 'content/enemylaser.png')
        this.load.image('smEnemy', 'content/smallship.png');
        this.load.image('mdEnemy', 'content/mediumship.png');
        this.load.image('lgEnemy', 'content/largeship.png');
        this.load.image('pwrup1', 'content/powerup1.png');
        this.load.image('pwrup2', 'content/powerup2.png');
        
        //Audio Files
        //this.load.audio();
        //this.load.audio();
        //this.load.audio();
    }
    
    create() {
        
        //Create Animations
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'lasers',
            frames: this.anims.generateFrameNumbers('lasers'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'smEnemy',
            frames: this.anims.generateFrameNumbers('smEnemy'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'mdEnemy',
            frames: this.anims.generateFrameNumbers('mdEnemy'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'lgEnemy',
            frames: this.anims.generateFrameNumbers('lgEnemy'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'pwrup',
            frames: this.anims.generateFrameNumbers('pwrup'),
            frameRate: 20,
            repeat: -1
        });
        
    }
    
    update() {
        
    }
}