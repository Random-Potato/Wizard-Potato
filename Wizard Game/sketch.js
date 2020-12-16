var wizard, wizardWalk, ouch;
var enemy, enemyAnimation, enemyGroup, enemyHealth;
var obstacle, obstacleGroup, obstacleImage
var ground, invisibleGroud, groundImage;
var score = 0;
var highScore = score;
var highScore2 = highScore;
var fireball, fireballAnimation, fireballGroup;
var variableThatDoesntDoMuchExceptBeThereAndDoNothingButThenAgainItIsDoingSomthingWhichIsBeingThereAndBeVeryLongButNotAsLongAsTheLongestWordWhichIsVeryLong189819DigitsLongToBeExactHoweverItsAProteinChemicalOrSomethingAndMostOfThemAreVeryLongButNotAsLongAsTheLongestOneAnywaysThisVariableNameIsGettingLongEvenThoughItDoesntDoMuchAndDoesAbsolutelyNothingForTheCodeExceptBeThere;
var gameState = "play";
var gameover, gameoverImage, reset, resetImage;
var goblinDeath, fireballSound, fail, hop;


function preload(){
  wizardWalk = loadAnimation("wizard1.png","wizard1.png","wizard2.png","wizard2.png");
  ouch = loadAnimation("wizard_fallen.png");
  
  fireballAnimation = loadAnimation("fire1.png","fire2.png","fire3.png","fire4.png","fire5.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  resetImage = loadImage("tryAgain.png");
  
  groundImage = loadImage("ground.png");
  
  gameoverImage = loadImage("rats.png");
  
  enemyAnimation = loadAnimation("goblin1.png", "goblin2.png");
  
  fireballSound = loadSound("Pew2.m4a");
  goblinDeath = loadSound("Death.m4a");
  fail = loadSound("Fail.m4a");
  hop = loadSound("Hop.m4a")
}

function setup(){
  createCanvas(600,200);

  wizard = createSprite(50,130);
  wizard.addAnimation("walk", wizardWalk);
  wizard.scale = 0.1;
  wizard.velocityX = 6;
  
  
  ground=createSprite(300,115);
  ground.addImage(groundImage);
  
  invisibleGround = createSprite(300,170,600,20);
  
  //Oh look! It DOES do something! How suprising!;
  variableThatDoesntDoMuchExceptBeThereAndDoNothingButThenAgainItIsDoingSomthingWhichIsBeingThereAndBeVeryLongButNotAsLongAsTheLongestWordWhichIsVeryLong189819DigitsLongToBeExactHoweverItsAProteinChemicalOrSomethingAndMostOfThemAreVeryLongButNotAsLongAsTheLongestOneAnywaysThisVariableNameIsGettingLongEvenThoughItDoesntDoMuchAndDoesAbsolutelyNothingForTheCodeExceptBeThere = createSprite(300,30,600,10);
  variableThatDoesntDoMuchExceptBeThereAndDoNothingButThenAgainItIsDoingSomthingWhichIsBeingThereAndBeVeryLongButNotAsLongAsTheLongestWordWhichIsVeryLong189819DigitsLongToBeExactHoweverItsAProteinChemicalOrSomethingAndMostOfThemAreVeryLongButNotAsLongAsTheLongestOneAnywaysThisVariableNameIsGettingLongEvenThoughItDoesntDoMuchAndDoesAbsolutelyNothingForTheCodeExceptBeThere.shapeColor = "lightBlue";
  
  enemyGroup = new Group(); 
  obstacleGroup = new Group();
  
  fireballGroup = new Group();
  
  ground.scale=1
  
  //ground.velocityX = -6;
  
  ground.x=600;
  
  gameover = createSprite(300,50);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.2;
  
  reset = createSprite(300,120);
  reset.addImage(resetImage);
  reset.scale = 0.2;
  
  wizard.depth=ground.depth;
  wizard.depth += 5;
  
  invisibleGround.visible = false;
}

function draw(){
  background("lightBlue")
  
  invisibleGround.x = wizard.x;

  camera.position.x = wizard.x+250;
  //camera.position.y = wizard.y-28;

  wizard.collide(invisibleGround);
  
  text("Score: " + score,500,20)
  text("Highscore: "+highScore,400,20)
  
  variableThatDoesntDoMuchExceptBeThereAndDoNothingButThenAgainItIsDoingSomthingWhichIsBeingThereAndBeVeryLongButNotAsLongAsTheLongestWordWhichIsVeryLong189819DigitsLongToBeExactHoweverItsAProteinChemicalOrSomethingAndMostOfThemAreVeryLongButNotAsLongAsTheLongestOneAnywaysThisVariableNameIsGettingLongEvenThoughItDoesntDoMuchAndDoesAbsolutelyNothingForTheCodeExceptBeThere.x = wizard.x + 300

  if (gameState == "play"){
    wizard.velocityY ++;
    
    if(highScore<score){
      highScore = score;
    }
    
    gameover.visible = false;
    reset.visible = false;
    
    if(frameCount%3 === 0){
      score ++;
    }
  
    if(keyDown("space")&&wizard.y>129){
      wizard.velocityY = -15;
      hop.play();
    }
   
    if(frameCount%100 == 0){
      ground.x= wizard.x + 500;
    }

    console.log(frameCount);
  
    if(enemyGroup.isTouching(fireballGroup)){
      enemyHealth --;
    }
  
    if(enemyHealth<1){
      enemyGroup.destroyEach();
      score += 100;
      goblinDeath.play();
      enemyHealth = 100;
    }
  
    if(frameCount%100 === 0){
      var r = Math.round(random(1,2))
      switch (r){
        case 1: gobgobgobgobgob();
          break;
        case 2: aaaRock();
          break;
      }
    }
  
  
    
    if (wizard.isTouching(obstacleGroup)||wizard.isTouching(enemyGroup)){
      gameState = "end";
      fail.play();
    }
    
    if(keyWentDown(RIGHT_ARROW)){
      fire();
    }
  }
  
  if(gameState === "end"){
    
    if(highScore>highScore2){
      text("NEW HIGH SCORE", 50, 20)
    }
    
    wizard.velocityY = 0;
    wizard.velocityX = 0;
    
    gameover.visible = true;
    reset.visible = true;
    
    if(mousePressedOver(reset)){
      restart();
      highScore2 = highScore;
    }
    
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}

function gobgobgobgobgob(){
  enemyHealth = 50;
  enemy = createSprite(wizard.x+550,135);
  //enemy.velocityX = -6;
  enemy.addAnimation("enemyAnimation", enemyAnimation);
  enemy.scale = 0.25;
  enemy.lifetime = 130;
  enemyGroup.add(enemy);
}

function aaaRock(){
  obstacle = createSprite(wizard.x+550,137);
  //obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.5;
  obstacle.lifetime = 130;
  obstacleGroup.add(obstacle);
  
}

function fire(){
  fireball = createSprite(wizard.x + 10,wizard.y,10,10)
  fireball.velocityX = 5;
  fireball.addAnimation("fireball", fireballAnimation);
  fireball.scale = 0.2;
  fireballGroup.add(fireball);
  fireballSound.play();
  fireball.lifetime = 130;
}

function restart(){
  score = 0;
  obstacleGroup.destroyEach();
  enemyGroup.destroyEach();
  gameState = "play";
}