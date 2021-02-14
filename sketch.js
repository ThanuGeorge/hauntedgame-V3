var tutorial;
var gamestate = 0;
var playerCount;
var tutorial;
var form, game, player;
var backgrd1,ghostbg;
var db;
var player1,player2,player3,player4,player5,player6,player7,player8,player9
var AllPlayers;
var BigCar;
var ghost;
var ghoststatus ="kill";
var edges;
var Allghost;
var Allskelly;
var skelly;
var skellyStatus = "kill";
var counter = 0;


function preload()
{
  backgrd1 = loadImage("house.png");
  ghostbg = loadImage("ghostbg.jpg");
  ghostImg = loadImage("ghost.png");
  skellyImg = loadImage('Skelly1.png');
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  db = firebase.database();
  game = new Game();
   //reset database
  
   game.updateGame(0);
   game.removeghost();
   game.removeskelly();
   //*********/
  game.readGame();
  game.startGame();

}

function draw()
 {
  if (tutorial == 0 )
  {
    game.updateGame(1);  
    player.updateCount(0);
    player.updateTutorial(3);
  }
  background(backgrd1);  

  if (gamestate == 1)
  {
    game.play();
    drawSprites();
    fill("white")
    textSize(25);
    text("Score: " + player.score, displayWidth - 200, 20)
    counter++
    
  }
  
if((counter >= 10000|| player.score >= 500) )
{
 
  game.updateGame(2);  

}

if(gamestate == 2)
{
 
     game.endGame();
    
}
  
}
  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  
