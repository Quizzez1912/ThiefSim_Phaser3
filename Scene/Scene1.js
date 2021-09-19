class Scene1 extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("bg","assets/testbg.png");
    this.load.image("player","assets/player.png"); 
    this.load.image("gem","assets/gem.png");
  }

  create() { 
    this.background = this.add.image(0, 0, "bg");
    this.background.setOrigin(0, 0);
    this.background.setDepth(-10);

    //! HUD 
    this.text = this.add.text(20,30);
    this.timer = false;
    this.timertime = 0;

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.player = this.physics.add.image(0, 128, "player");
    this.player.setOrigin(0, 0);

    this.gem = this.physics.add.image(80, 80 , "gem");
    this.gem.setOrigin(0, 0);

    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
    //! Collider

    this.physics.add.overlap(this.player, this.gem, this.playerHitGem, null, this);
  
  }
    


  update() { 
    this.movePlayerManager();
    //console.log( this.player.y);

    if(this.timer){
      this.timertime++;
      console.log("timer läuft");
      
      this.text.setText("Die Zeit : " + (this.timertime/60).toFixed(2));
      if(this.timertime/60 > 3){
        this.timer = false;
        this.timertime = 0;
        this.text.setText();
       
      }
    }
    }
    
   
  

 //* Playermovement
 movePlayerManager() {
  if(!this.timer){
      if (Phaser.Input.Keyboard.JustDown(this.left) && this.player.x > 0) {
          this.player.setX(this.player.x - 64 );

      } else if (Phaser.Input.Keyboard.JustDown(this.right) && this.player.x < 896) {
          this.player.setX(this.player.x + 64 );
      
    } else if (Phaser.Input.Keyboard.JustDown(this.up) && this.player.y > 0) {
      this.player.setY(this.player.y -64 );
       
    }else if (Phaser.Input.Keyboard.JustDown(this.down) && this.player.y < 384) {
      this.player.setY(this.player.y  + 64 );
    } 

      // Jump
     /* if (this.cursorKeys.up.isDown && this.player.body.onFloor()) {
          this.player.setVelocityY(-gameSettings.playerSpeed);

      }*/
      // Jump with Boost    
      if (this.cursorKeys.up.isDown && this.player.body.onFloor() && this.jumpBoost) {
          this.player.setVelocityY(-gameSettings.playerSpeed * 1.5);
          this.avaibleBoostJump++;
          if (this.avaibleBoostJump == 2) {
              this.jumpBoost = false;
              this.jumpBoostIcon.setAlpha(0.25);
          }
          console.log(" jumpBoost JUMP schon benutzt == " + this.avaibleBoostJump)

        }
  }

 }

playerHitGem(player, gem){
  this.timer = true;
  setTimeout(function() { gem.destroy(); },3000)
 }

 collectGem(gem){

 }


}
