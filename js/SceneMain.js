class SceneMain extends Phaser.Scene {
    
    constructor() {
        super({ key: 'SceneMain' });
    }
    
    preload() {
        
        //Backgrounds & Sprites
        this.load.image('background', "content/backgrounds/background.png");
        this.load.image('foreground', 'content/backgrounds/foreground.png');
        this.load.image('player', 'content/sprites/player.png');
        this.load.image('playerLaser', 'content/playerlaser.png');
        this.load.image('enemyLaser', 'content/enemylaser.png');
        this.load.image('bigEnemy', 'content/sprites/bigEnemy.png');
        this.load.image('medEnemy', 'content/sprites/medEnemy.png');
        this.load.image('rocketEnemy', 'content/sprites/rocketEnemy.png');
        this.load.image('seekerEnemy', 'content/sprites/seekerEnemy.png');
        this.load.image('tankEnemy', 'content/sprites/tankEnemy.png');
        this.load.image('truckEnemy', 'content/sprites/truckEnemy.png');
        this.load.image('turretEnemy', 'content/sprites/turretEnemy.png');
        this.load.image('xWingEnemy', 'content/sprites/xWingEnemy.png');
        this.load.image('miniGunEnemy', 'content/sprites/miniGunEnemy.png');
        this.load.image('wingEnemy', 'content/sprites/wingEnemy.png');
        this.load.image('pwrup1', 'content/powerup1.png');
        this.load.image('pwrup2', 'content/powerup2.png');
        this.load.image('enemyLasers', 'content/lasersnthings/enemyLasers.png');
        this.load.image('greenLasers', 'content/lasersnthings/greenLasers.png');
        this.load.spritesheet('explosion1', 'content/lasersnthings/explosion1.png', { frameWidth: 64, frameHeight: 64 }, 7);
        
        //Audio Files
        this.load.audio('theme', 'content/indigoPilotTheme.wav');
        //this.load.audio();
        //this.load.audio();
    }
    
    create() {
        
        //Create Scrolling Backgrounds
        this.background = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1200, 640, 'background');
        this.foreground = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1200, 640, 'foreground');
        
        //Theme Music
        var music = this.sound.add('theme');
        music.setLoop(true);
        music.play();
        
        //Explosion Effects
        this.anims.create({
            key: 'explosion1',
            frames: this.anims.generateFrameNumbers('explosion1'),
            frameRate: 7,
            repeat: 0
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
            delay: 1500,
            callback: function() {
                var enemy = null;
                
                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(this, this.game.config.width, Phaser.Math.Between(0, this.game.config.height));
                } else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType('ChaserShip').length < 5) {
                        enemy = new ChaserShip(this, this.game.config.width, Phaser.Math.Between(0, this.game.config.height));
                    }
                } else {
                    enemy = new CarrierShip(this, this.game.config.width, Phaser.Math.Between(0, this.game.config.height));
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
        this.background.tilePositionX += 3;
        this.foreground.tilePositionX += 5;
        
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