class SceneMain extends Phaser.Scene {
    
    constructor() {
        super({ key: 'SceneMain' });
    }
    
    preload() {
        
        //Backgrounds & Sprites
        this.load.image('bg', 'content/background.png');
        this.load.image('clouds', 'content/clouds.png');
        this.load.image('transparentClouds', 'content/clouds-transparent.png');
        this.load.spritesheet('player', 'content/ship.png', { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('explosion', 'content/explosion.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('playerLaser', 'content/playerlaser.png');
        this.load.image('enemyLaser', 'content/enemylaser.png');
        this.load.image('smEnemy', 'content/smallship.png');
        this.load.image('mdEnemy', 'content/mediumship.png');
        this.load.image('lgEnemy', 'content/largeship.png');
        this.load.image('pwrup1', 'content/powerup1.png');
        this.load.image('pwrup2', 'content/powerup2.png');
        
        //Audio Files
        this.load.audio('theme', 'content/indigoPilotTheme.wav');
        //this.load.audio();
        //this.load.audio();
    }
    
    create() {
        
        //Create Scrolling Backgrounds
        this.tileSprite = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 640, 680, 'bg');
        this.tileSprite2 = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 640, 680, 'clouds');
        this.tileSprite3 = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 640, 680, 'transparentClouds');
        
        //Theme Music
        var music = this.sound.add('theme');
        music.setLoop(true);
        music.play();
        
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
            frameRate: 8,
            repeat: -1
        });
        
        //Sound Effects
        this.sfx = {};
        
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
        
        //Initialize Groups
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        
        
        //Event Spawns
        this.time.addEvent({
            delay: 1000,
            callback: function() {
                var enemy = null;
                
                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                } else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType('ChaserShip').length < 5) {
                        enemy = new ChaserShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                    }
                } else {
                    enemy = new CarrierShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                }
                
                if (enemy !== null) {
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });
        
        //Collision Detection
        //<--Player Lasers & Enemies
        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
           if (enemy) {
               if (enemy.onDestroy !== undefined) {
                   enemy.onDestroy();
               }
               enemy.explode(true);
               playerLaser.destroy();
           } 
        });
        
        //<--Player & Enemies
        this.physics.add.collider(this.player, this.enemies, function(player, enemy) {
            if (!player.getData('isDead') && !enemy.getData('isDead')) {
                player.explode(false);
                player.onDestroy();
                enemy.explode(true);
            }
        });
        
        //<--Player & Enemy Lasers
        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if(!player.getData('isDead') && !laser.getData('isDead')) {
                player.explode(false);
                player.onDestroy();
                laser.destroy();
            }
        });
    }
    
    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData('type') == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }
    
    update() {
        
        //Update Backgrounds
        this.tileSprite.tilePositionY -= 1;
        this.tileSprite2.tilePositionY += 3;
        this.tileSprite3.tilePositionY -= 1;
        
        //Update Player
        if(!this.player.getData('isDead')) {
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
            //Lasers
            if (this.keySpace.isDown) {
                this.player.setData('isShooting', true);
            } else {
                this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
                this.player.setData('isShooting', false);
            }
        }
        
        //Update Enemies
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();
            
            //Frustum Culling
            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
        }
        
        //Update Enemy Lasers
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            
            //Frustum Culling
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        
        //Update Player Lasers
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            
            //Frustum Culling
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }
}