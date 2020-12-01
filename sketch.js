  //declare the variables here
  var monkey , monkeyRunning;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  var score;
  var boundary;
  var ground; 
  var survivalTime=0;
  var score=0;

  function preload()
{
  
  //load Images
  monkeyRunning =            loadAnimation("monkey.png","monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey7.png","monkey8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage =loadImage("background.jpg");
  
}

function setup()
{
  
  //create sprite for monkey
  monkey=createSprite(80,285,20,20);
  monkey.addAnimation("moving",monkeyRunning);
  monkey.scale=0.1;
  
  //create sprite for ground
  ground=createSprite(400,315,900,10);
  ground.shapeColor="white";
  ground.velocityX=-10;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  //create groups
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
}

function draw()
{
  
  //set background color
  background("#7FFFD4");
  
  //to give an infinite scrolling effect
  if (ground.x<0)
  {
    ground.x=ground.width/2;
  }
  
  //when space is pressed make the monkey jump
  if (keyDown("space"))
  {
    monkey.velocityY=-12;
  }
  
  //give gravity
  monkey.velocityY=monkey.velocityY+0.8;
  
  //make thee monkey collide with the ground
  monkey.collide(ground);
  
  //display survival time and update it
  stroke("yellow");
  fill("white");
  textSize(20);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,200,50);
  
  //to increase score
  if (monkey.isTouching(bananaGroup))
  {
      score=score+1;
    bananaGroup.destroyEach();
  }
  
  //display score
  stroke("red");
  fill("yellow");
  textSize(20);
  text("Score: "+score,100,50);
  
  drawSprites();
  
  //call the functions in thwe draw function
  banana();
  rock();
  
}

//create function for spawning bananas at regular intervals
function banana()
{
    if (World.frameCount%80===0)
  {
    var banana=createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.scale=0.1;
    banana.velocityX=-8;
    banana.lifetime=50;
    bananaGroup.add(banana);
  }
  
}

//create function for spawning bananas at regular intervals
function rock ()
{
  if (World.frameCount%300===0)
    {
      var obstacle=createSprite(400,300,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-8;
      obstacle.lifetime=50;
      obstacleGroup.add(obstacle);
      obstacle.scale=0.1;
    }
}