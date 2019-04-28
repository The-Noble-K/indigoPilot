class SceneGameOver extends Phaser.Scene {
    
  constructor() {
    super({ key: "SceneGameOver" });
  }
    
  create() {
      
    this.tileSprite = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 640, 680, 'bg');
    this.tileSprite2 = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 640, 680, 'clouds');
    this.tileSprite3 = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 640, 680, 'transparentClouds');

    this.title = this.add.text(this.game.config.width * 0.5, 128, "Game Over", {
      fontFamily: 'impact',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#7c7a7f',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on("pointerover", function() {
      this.btnRestart.setTexture("sprBtnRestartHover");
      this.sfx.btnOver.play(); 
    }, this);

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on("pointerdown", function() {
      this.btnRestart.setTexture("sprBtnRestartDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on("pointerup", function() {
      this.btnRestart.setTexture("sprBtnRestart");
      this.scene.start("SceneMain");
    }, this);
  }

  update() {
    
    this.tileSprite.tilePositionY -= 1;
    this.tileSprite2.tilePositionY -= 3;
    this.tileSprite3.tilePositionY -= 1;
  }
}