class Entity extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData('type', type);
        this.setData('isDead', false);
    }
    
    explode(canDestroy) {
        if (!this.getData('isDead')) {
            this.setTexture('explosion1');
            this.play('explosion1');
            
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false);
                }
            }
            
            this.setAngle(0);
            this.body.setVelocity(0, 0);
            
            this.on('animationcomplete', function() {
                if (canDestroy) {
                    this.destroy();
                } else {
                    this.setVisible(false);
                }
            }, this);
            
            this.setData('isDead', true);
        }
    }
}

class Player extends Entity {
    
    constructor(scene, x, y, key) {
        super(scene, x, y, key, 'Player');
        this.setData('speed', 200);
        this.setData('isShooting', false);
        this.setData('timerShootDelay', 10);
        this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    }
    
    //Movement Controls
    moveUp() {
        this.body.velocity.y = -this.getData('speed');
    }
    
    moveDown() {
        this.body.velocity.y = this.getData('speed');
    }
    
    moveLeft() {
        this.body.velocity.x = -this.getData('speed');
    }
    
    moveRight() {
        this.body.velocity.x = this.getData('speed');
    }
    
    update() {
        
        //Reset Velocity
        this.body.setVelocity(0, 0);
        
        
        //Stay in Bounds
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
        
        //Laser Function
        if (this.getData('isShooting')) {
            if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
                this.setData('timerShootTick', this.getData('timerShootTick') + 1);
            } else {
                var laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);
                this.setData('timerShootTick', 0);
            }
        }
    }
    
    onDestroy() {
        this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
                this.scene.scene.start('SceneGameOver');
            },
            callbackScope: this,
            loop: false
        });
    }
}

class PlayerLaser extends Entity {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'greenLasers');
        this.body.velocity.x = 200;
    }
}

class EnemyLaser extends Entity {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyLasers');
        this.body.velocity.x = -200;
    }
    
    onDestroy() {
        
    }
    
}

class ChaserShip extends Entity {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'seekerEnemy', 'ChaserShip');
        
        //Randomize Velocity
        this.body.velocity.x = -Phaser.Math.Between(50, 100);
        
        //Define Chase State
        this.states = { MOVE_DOWN: 'MOVE_DOWN', CHASE: 'CHASE'};
        this.state = this.states.MOVE_DOWN;
    }
    
    update() {
        if (!this.getData('isDead') && this.scene.player) {
            if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 320) {
                this.state = this.states.CHASE;
                }
            if (this.state == this.states.CHASE) {
                var dx = this.scene.player.x - this.x;
                var dy = this.scene.player.y - this.y;
                var angle = Math.atan2(dy, dx);
                var speed = 100;
                this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            }   
        }
    }
}

class GunShip extends Entity {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'medEnemy', 'GunShip');
        
        //Randomize Velocity
        this.body.velocity.x = -Phaser.Math.Between(50, 100);
        
        //Spawn Laser Objects
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
                var laser = new EnemyLaser(this.scene, this.x, this.y);
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }
    
    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}

class CarrierShip extends Entity {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'bigEnemy', 'CarrierShip');
        this.body.velocity.x = -Phaser.Math.Between(50, 100);
    }
}

class ScrollingBackground {
    
    constructor(scene, key, velocityY) {
        this.scene = scene;
        this.key = key;
        this.velocityY = velocityY;
        this.layers = this.scene.add.group();
        this.createLayers();
    }
    
    createLayers() {
        for (var i = 0; i < 2; i++) {
            var layer = this.scene.add.sprite(250, 250, this.key);
            layer.y = (layer.displayHeight * i);
            layer.setDepth(-5 - (i - 1));
            this.scene.physics.world.enableBody(layer, 0);
            layer.body.velocity.y = this.velocityY;
            this.layers.add(layer);
        }
    }
    
    update() {
        
    }
}






















