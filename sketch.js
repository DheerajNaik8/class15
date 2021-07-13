var trex ,trex_running;
var ground,groundImage;
var invisibleGround;
var cloud,cloudImage;
var obstacle,obstacle1, obstacle2, obstacle3, obstacle4, obstacle5,obstacle6;
var score;
var cloudsGroup,obstaclesGroup;
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var trex_collided;


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadImage("trex_collided.png");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
   trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;

  //create Groundsprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -4; 

  // create invisibleground sprite
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  score = 0;
  trex.setCollider("circle",0,0,50);
  trex.debug = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();


 }

function draw(){
  //clears the background
   background("white");

   text ("score: "+score,500,50);
  
   if(gameState === PLAY){
   
    ground.velocityX = -4;
   score = score + Math.round(frameCount / 60);

   //resets the ground
  if(ground.x<0){
    ground.x = ground.width/2;
  }
     //create trex jump
   if(keyDown("space")&& trex.y >= 100){
    trex.velocityY = -10;
   }

   //adds gravity
   trex.velocityY = trex.velocityY + 0.8; 
   
    
    //spawning clouds
  spawnClouds();
   spawnObstacles();

   if(obstaclesGroup.isTouching(trex)){
   gameState = END;
   }
 


   }


   else if(gameState === END){
    trex.changeAnimation("collided",trex_collided);
   ground.velocityX = 0;
 
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);

   

   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);

   

   }  


 //collides with invisibleGround 
  trex.collide(invisibleGround);
  drawSprites();
}



 function spawnClouds(){
 if(frameCount % 60 === 0){
  cloud = createSprite(600,100,40,10);
  cloud.addImage(cloudImage);
  cloud.y = Math.round(random(15,100));
  cloud.scale = 0.4;
  cloud.velocityX = -3;
  cloud.lifetime = 200;
  cloud.depth = trex.depth
  trex.depth = trex.depth + 1;
  
  //console.log(trex.depth);
  //console.log(cloud.depth);
  
  cloudsGroup.add(cloud);
 } 
}


  function spawnObstacles() {
  if (frameCount % 60 === 0) {
  obstacle = createSprite(600,165,10,40);
  obstacle.velocityX = -6;
  var ran = Math.round(random(1,6));
  switch (ran){
  case 1:obstacle.addImage(obstacle1);
  break;

  case 2:obstacle.addImage(obstacle2);
  break;

  case 3:obstacle.addImage(obstacle3);
  break;

  case 4:obstacle.addImage(obstacle4);
  break;

  case 5:obstacle.addImage(obstacle5);
  break;

  case 6:obstacle.addImage(obstacle6);
  break;

  default:break;



  }
  obstacle.scale = 0.5;
  obstacle.lifetime = 100;
  
  obstaclesGroup.add(obstacle);

  }




  }





