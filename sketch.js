var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg,restartimg;
var water, ship, helicopter, bomb,S,restart;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadAnimation("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg = loadImage("gameOver.png");
}

function setup()
{
   createCanvas(800,450);
   background(skybg);

   ship = createSprite(400,280);
   ship.addAnimation("runningship",shipimg);
   ship.scale = 0.3;

   water=createSprite(500,320);
   water.addImage(waterbg);
   water.velocityX = 3;
   
  helicopterGroup = new Group();
  bombGroup = new Group();
  
  //ship.debug = "true";
  ship.setCollider("rectangle", 0, 0,300,400);
}

function draw()
{
  background(skybg);
  fill("yellow");
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);

  if(gameState === PLAY){

    ship.x = World.mouseX;
    score = score + Math.round(frameCount/300);

    spawnHelicopter();
    spawnBomb();
    if(bombGroup.isTouching(ship)){
       gameState = END;
    } 
  }
  
  
  else if(gameState === END){
    restart = createSprite(400,200);
    restart.addImage("rsgO",restartimg);

   water.velocityX = 0;

  
   helicopterGroup.destroyEach();
   bombGroup.destroyEach();
  
  
  }
  if(water.position.x > 400){
    water.position.x = 300;
   
  }
  drawSprites();
}
function spawnHelicopter(){
  if(frameCount%100 === 0){
    S = ship.x;
    helicopter = createSprite(S+300,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-15,0);
    S = water.x;
    //helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 if(frameCount%100 === 0){
  S = ship.x;
  bomb = createSprite(S+50,150,50,20);
  bomb.addImage("bomb",bombimg);
  bomb.scale = 0.15;
  bomb.setVelocity(2,4);
  bombGroup.add(bomb);
  }  

}
