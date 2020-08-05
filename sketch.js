var score=0
var playbutton
var gameState=0
var player, line1, cover1, cover3,cover4
var edges
var opponent, fire
var bullet, bullet2
var bulletGroup
var bullet2Group = []
var opponentGroup = []
var Gunshot, WallHit

var playerImage, CoverImage, OpponentImage, FireImage, BulletImage, Bullet2Image

function preload(){
  playerImage=loadImage("images/Player.png")
  CoverImage=loadImage("images/box.png")
  FireImage=loadImage("images/Fire.png")
  OpponentImage=loadImage("images/Opponent.png")
  BulletImage=loadImage("images/Bullet.png")
  Bullet2Image=loadImage("images/Bullet2.png")
  Gunshot=loadSound("Gunshot.mp3")
  WallHit=loadSound("WallHit .mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  player=createSprite(35, windowHeight/2, 50, 50);
  player.addImage(playerImage)
  player.scale=0.50
  player.setCollider("rectangle",0,0,50,125)
  line1=createSprite(330, windowHeight/2, 5, windowHeight);
  line1.shapeColor=0
  cover1=createSprite(130,115,40,40)
  //cover2=createSprite(150,275,40,40)
  cover3=createSprite(120,510,40,40)
  cover4=createSprite(145,325,40,40)
  cover1.addImage(CoverImage)
  //cover2.addImage(CoverImage)
  cover3.addImage(CoverImage)
  cover4.addImage(CoverImage)
  cover1.scale=0.28
  //cover2.scale=0.28
  cover3.scale=0.28
  cover4.scale=0.28
  playbutton=createButton("PLAY")
  playbutton.position(windowWidth/2,windowHeight-50)
  playbutton.style('font-size','35px')
  playbutton.style('background-color','Red')

  bulletGroup=new Group()
}

function draw() {

  if(gameState==0){
    background(0);
    text(mouseX+":"+mouseY,100,30)
    textSize(40)
    fill(255,0,0)
    text("Insert Game Name",windowWidth/2-100,35)
    player.visible=false
    line1.visible=false
    cover1.visible=false
    cover3.visible=false
    cover4.visible=false
  }
  playbutton.mousePressed(()=>{
    gameState=1
    playbutton.hide()
  })

  if(gameState==1){
    background("#7C5E19")
    textSize(20)
    fill(0)
    text("SCORE:"+score,1250,50)
    edges=createEdgeSprites()
    text(mouseX+":"+mouseY,100,30)
    player.visible=true
    cover1.visible=true
    //cover2.visible=true
    cover3.visible=true
    cover4.visible=true
    line1.visible=true
    player.collide(line1)
    player.collide(edges)
    player.collide(cover1)
    player.collide(cover3)
    player.collide(cover4)

    if(bulletGroup.isTouching(cover1)){
      WallHit.play()
      bulletGroup.destroyEach()
    }
    if(bulletGroup.isTouching(cover3)){
      WallHit.play()
      bulletGroup.destroyEach()
    }
    if(bulletGroup.isTouching(cover4)){
      WallHit.play()
      bulletGroup.destroyEach()
    }

    createOpponent()

    if(keyDown(RIGHT_ARROW)){
      player.x=player.x+6
    }
    if(keyDown(LEFT_ARROW)){
      player.x=player.x-6
    }
    if(keyDown(UP_ARROW)){
      player.y=player.y-6
    }
    if(keyDown(DOWN_ARROW)){
      player.y=player.y+6
    }
   if(frameCount%15==0){
    if(keyDown("space")){
      var bullet=createSprite(player.x+50,player.y-16.1,10,10)
      bullet.scale=0.12
      bullet.addImage(BulletImage)
      bullet.velocityX=16
      bulletGroup.add(bullet)
      Gunshot.play()
    }
   }

   for(var i=0; i<bullet2Group.length;i++){
     if(bullet2Group[i].isTouching(cover1)){
      WallHit.play()
       bullet2Group[i].destroy()
      }
      else if(bullet2Group[i].isTouching(cover3)){
        WallHit.play()
        bullet2Group[i].destroy()
       }
      else if(bullet2Group[i].isTouching(cover4)){
        WallHit.play()
        bullet2Group[i].destroy()
       }
       if(bullet2Group[i].isTouching(player)){
       score=score-100
       bullet2Group[i].destroy()
        }
   }
   
   for(var i=0; i<opponentGroup.length;i++){
    if(opponentGroup[i].isTouching(bulletGroup)){
      opponentGroup[i].destroy()
      score=score+100
      console.log(score)
      bulletGroup.destroyEach()
    }
    if(opponentGroup[i].x<0&&opponentGroup[i].x>-10){
    score=score-25
    }
  }
  }
  drawSprites();
}

function createOpponent(){

if(frameCount%100==0){
  opponent=createSprite(windowWidth, random(50,windowHeight-50), 50, 50);
  opponent.addImage(OpponentImage)
  opponent.scale=0.5
  opponent.velocityX= random(-6,-3)
  opponentGroup.push(opponent)
  
    var bullet2=createSprite(opponent.x+50,opponent.y-16.1,10,10)
    bullet2.scale=0.12
    bullet2.addImage(Bullet2Image)
    bullet2.velocityX=-20
    bullet2Group.push(bullet2)
    bullet2Group.push(bullet2)
    Gunshot.play()
}
}

