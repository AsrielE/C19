var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.45;
  invisibleBlockGroup = new Group();
  spookySound.loop();
}

function draw() {
  background(200);
  spawnDoors();
  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites();
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x -3
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x +3
    }
    if(keyDown("space")){
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.8
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
    }
}
function spawnDoors(){
  if(frameCount%160===0){
  var door = createSprite(300,300)
  door.addImage(doorImg)
door.velocityY = 3;
door.x = Math.round(random(100,500))
door.lifetime = 150;
doorsGroup.add(door)
climber = createSprite(300,370)
climber.addImage(climberImg)
climber.velocityY = 3;
climber.x = door.x
climber.lifetime = 150;
climbersGroup.add(climber);
ghost.depth = door.depth
ghost.depth += 1
var invisibleBlock = createSprite(300,390)
invisibleBlock.width = climber.width
invisibleBlock.height = 2
invisibleBlock.x = door.x
invisibleBlock.velocityY = 3;
invisibleBlockGroup.add(invisibleBlock)
invisibleBlock.debug = true
  }
}