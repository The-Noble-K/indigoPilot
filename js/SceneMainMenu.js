class SceneMainMenu extends Phaser.Scene {
    
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image('background', "content/backgrounds/background.png");
    this.load.image('foreground', 'content/backgrounds/foreground.png');
    this.load.image("sprBtnPlay", "content/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "content/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "content/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "content/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "content/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "content/sprBtnRestartDown.png");
    this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
    this.load.audio('theme', 'content/indigoPilotTheme.wav');
  }

  create() {
      
    //Enable Aracde Physics  
    //this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Define Background Layers
    this.background = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1200, 640, 'background');
    this.foreground = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1200, 640, 'foreground');
    
      
    //Initialize Music  
    var music = this.sound.add('theme');
        music.setLoop(true);
        music.play();
    
    //Button SFX
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on("pointerover", function() {
      this.btnPlay.setTexture("sprBtnPlayHover"); 
      this.sfx.btnOver.play();
    }, this);

    this.btnPlay.on("pointerout", function() {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on("pointerdown", function() {
      this.btnPlay.setTexture("sprBtnPlayDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnPlay.on("pointerup", function() {
      this.btnPlay.setTexture("sprBtnPlay");
      this.scene.start("SceneMain");
    }, this);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "Indigo Pilot", {
      fontFamily: 'impact',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#7c7a7f',
      align: 'center'
    });
    this.title.setOrigin(0.5);
  }

  update() {
    
      this.background.tilePositionX += 3;
      this.foreground.tilePositionX += 5;
      
  }
}