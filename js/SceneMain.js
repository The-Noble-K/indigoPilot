class SceneMain extends Phaser.Scene {
    
    constructor() {
        super({ key: 'SceneMain' });
    }
    
    preload() {
        
        //Backgrounds & Sprites
        this.load.image('bg', 'content/background.png');
        this.load.spritesheet('player', 'content/ship.png', { frameWidth: 16, frameHeight: 24 });
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
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 16,
            repeat: -1
        });
        
        
        //Instantiate Player
        this.player = new Player(this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'player');
        console.log(this.player);
        
        //Add Key Detection
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update() {
        
        //Update Player
        this.player.update();
        //Up & Down
        if (this.keyW.isDown || this.keyUp.isDown) {
            this.player.moveUp();
        } else if (this.keyS.isDown || this.keyDown.isDown) {
            this.player.moveDown();
        }
        //Left & Right
        if (this.keyA.isDown || this.keyLeft.isDown) {
            this.player.moveLeft();
        } else if (this.keyD.isDown || this.keyRight.isDown) {
            this.player.moveRight();
        }
    }
}











































