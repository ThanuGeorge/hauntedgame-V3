class Game
{
    constructor()
    {

    }
    readGame()
    {
        var gameRef = db.ref('GameState');
        gameRef.on("value", function(data){
            gamestate = data.val();
        })
    }
    updateGame(state)
    {
        db.ref('/').update({
            GameState:state
        })
    }
     //*************************************************** **/
      //*************************************************** **/
      //DB updates for Ghost
      //*************************************************** **/
      //*************************************************** **/
    removeghost(){
        db.ref('Ghost').remove().then(function() {
            console.log("Remove succeeded.")
          })
      }
    readghost()
    {
        var Rankref = db.ref('GhostStatus');
        Rankref.on("value", (data) =>
        {
            ghoststatus= data.val();
        })
    }
    updateghost(X,Y){
        var ghostindex = "Ghost/ghost"+player.index;
        db.ref(ghostindex).set({
            'Ghostxpos':X,
            'Ghostypos':Y
        })
    }
    
    static getghost()
    {
        var playerRef = db.ref('Ghost');
        playerRef.on("value", function(data){

            Allghost = data.val();
        })
        
    }

     //*************************************************** **/
      //*************************************************** **/
      //DB update for skeleton
      //*************************************************** **/
      //*************************************************** **/
    removeskelly(){
        db.ref('Skelly').remove().then(function() {
            console.log("Remove succeeded.")
          })
      }
      updateskelly(X,Y){
        var skellyindex = "Skelly/skelly"+player.index;
        db.ref(skellyindex).set({
            'Skellyxpos':X,
            'Skellyypos':Y
        })
    }
    static getskelly()
    {
        var playerRef = db.ref('Skelly');
        playerRef.on("value", function(data){

            Allskelly = data.val();
        })
        
    }
    startGame()
    {
        if(gamestate == 0)
        {
            
        player1 = createSprite(displayWidth/2, displayHeight/2, 20, 20)
        player2 = createSprite(displayWidth/2, displayHeight/2 + 50, 20, 20)
        player3 = createSprite(displayWidth/2, displayHeight/2 - 50, 20, 20)
        player4 = createSprite(displayWidth/2 - 50, displayHeight/2, 20, 20)
    //    player5 = createSprite(displayWidth/2 - 50,  displayHeight/2 + 50, 20, 20)
  //      player6 = createSprite(displayWidth/2 - 50, displayHeight/2 - 50, 20, 20)
  //      player7 = createSprite(displayWidth/2 + 50, displayHeight/2, 20, 20)
  //      player8 = createSprite(displayWidth/2 + 50,  displayHeight/2 + 50, 20, 20)
  //      player9 = createSprite(displayWidth/2 + 50, displayHeight/2 - 50, 20, 20)
      //  BigCar = [player1, player2, player3, player4, player5, player6, player7, player8, player9];
         BigCar = [player1, player2, player3,player4];
        
            player = new Player();
            player.readCount();
            player.readTutorial();
           
            form = new Form();
            form.display();         
            edges = createEdgeSprites(); 
      //      game.readghost();
      
    //    car1.addImage(car1Img);
    //    car2.addImage(car2Img);
    //    car3.addImage(car3Img);
    //    car4.addImage(car4Img);
    
    
    }
    }
    play()
    {
        form.hide();
        Player.getplayerinfo();
        Game.getghost();
        Game.getskelly();
     
        if(AllPlayers !== undefined){
                       
            background(0);
            image(ghostbg,-100, -300, displayWidth+300, displayHeight+300);
            var arrayindex = 0;
    
            for(var P in AllPlayers){
          //       ypos = displayHeight/2 - AllPlayers[P].Distance  ;
          if(player.index !== (arrayindex+1))
          {
             BigCar[arrayindex].x = AllPlayers[P].xpos;
             BigCar[arrayindex].y = AllPlayers[P].ypos;
          }
            else 
               if(player.index == (arrayindex+1)){
                fill("blue");
                 ellipse(BigCar[arrayindex].x ,BigCar[arrayindex].y,20, 20);
              //  camera.position.x = BigCar[arrayindex].x;
              //  camera.position.x = displayWidth/2;
              //  camera.position.y = BigCar[arrayindex].y
            
          // player move up
                 
               }              
                 arrayindex++;
           
            }
        }        
        if(keyDown("w") && player.index!==null)
        {
           
            BigCar[player.index - 1].velocityY =  Math.round(random(-1, -3))          
        
        }
        if(keyDown("a") && player.index!==null)
        {

           BigCar[player.index - 1].velocityX =  Math.round(random(-1, -3))          
                                                                   
        }
        if(keyDown("s")  && player.index!==null)
        {
            BigCar[player.index - 1].velocityY =  Math.round(random(1, 3))
           
        }
        if(keyDown("d") && player.index!==null)
        {
            BigCar[player.index - 1].velocityX =  Math.round(random(1, 3))
           
        }
        
                
      //*************************************************** **/
      //*************************************************** **/
      //Generating Ghost for the game
      //*************************************************** **/
      //*************************************************** **/
        if(frameCount% 300 === 0 && ghoststatus == "kill" ){
           
            ghost = createSprite(Math.round(random(45, 300)),Math.round(random(40,90)),40,10);
            ghost.addImage(ghostImg);
            ghost.scale=0.1;
            game.updateghost(ghost.x,ghost.y);
            ghoststatus = "alive";
            
        }   
        if(ghoststatus == "alive" && player.index!==null){
        
            var ghostspeed = BigCar[player.index - 1].getSpeed();
            //find distance
          
            var dx = player.xpos - ghost.x;
            var dy = player.ypos - ghost.y;
            var distance = Math.sqrt((dx*dx) + (dy*dy));
            //find speed
            var ghostspeedX = ghostspeed * (dx/distance);
            var ghostspeedY = ghostspeed * (dy/distance);
        
            //ghost follow player
            ghost.x += (ghostspeedX*random(0.5,1));
         //   ghost.x += ghostspeedX;
            ghost.y += (ghostspeedY*random(0.5,1));
         //   ghost.y += ghostspeedY;
            game.updateghost(ghost.x,ghost.y);
           
         if(ghost.isTouching(BigCar[0])||ghost.isTouching(BigCar[1])||ghost.isTouching(BigCar[2])
        ||ghost.isTouching(BigCar[3])){
            ghost.destroy();          
            ghoststatus = "kill";
            game.updateghost(0,0);
            player.score = player.score + Math.round(random(20, 40));
            player.updateDetails();
        }

        }
        

      //  console.log(Allghost)
        if(Allghost !== undefined){
            for (var gh in Allghost){
     //           console.log(gh)
                var currind = gh.slice(5)
       //         console.log(currind)
                if(Number(currind) !== player.index){
                    
                    if(Allghost[gh].Ghostxpos !==0 && Allghost[gh].Ghostypos!== 0){
                        image(ghostImg,Allghost[gh].Ghostxpos,Allghost[gh].Ghostypos,80,80)
                    }              
                }

                
            }
            
        }

      //*************************************************** **/
      //*************************************************** **/
      //Generating skeleton for the game
      //*************************************************** **/
      //*************************************************** **/

        if(frameCount% 100 === 0 && skellyStatus == "kill" ){
           
            skelly = createSprite(Math.round(random(305, 800)),Math.round(random(90,400)),40,10);
            skelly.addImage(skellyImg);
             //ghost.scale=0.1; 
            game.updateskelly(skelly.x,skelly.y);
            skellyStatus = "alive";
            
        }   
        if(skellyStatus == "alive" && player.index!==null){
        
            var skellySpeed = BigCar[player.index - 1].getSpeed();
            //find distance
          
            var dx = player.xpos - skelly.x;
            var dy = player.ypos - skelly.y;
            var distance = Math.sqrt((dx*dx) + (dy*dy));
            //find speed
            var skellySpeedX = skellySpeed * (dx/distance);
            var skellySpeedY = skellySpeed * (dy/distance);
        
            //ghost follow player
            skelly.x += (skellySpeedX*random(0.5,1));
         //   ghost.x += ghostspeedX;
            skelly.y += (skellySpeedY*random(0.5,1));
         //   ghost.y += ghostspeedY;
            game.updateskelly(skelly.x,skelly.y);
           
         if(skelly.isTouching(BigCar[0])||skelly.isTouching(BigCar[1])||skelly.isTouching(BigCar[2])
        ||skelly.isTouching(BigCar[3])){
            skelly.destroy();          
            skellyStatus = "kill";
            game.updateskelly(0,0);
            player.score = player.score + Math.round(random(10, 20));
            player.updateDetails();
        }

        }
        

      //  console.log(Allghost)
        if(Allskelly !== undefined){
            for (var gh in Allskelly){
     //           console.log(gh)
                var currind = gh.slice(6);
       //         console.log(currind)
                if(Number(currind) !== player.index){
                    
                    if(Allskelly[gh].Skellyxpos !==0 && Allskelly[gh].Skellyypos!== 0){
                       image(skellyImg,Allskelly[gh].Skellyxpos,Allskelly[gh].Skellyypos,80,80)
                    }              
                }

                
            }
            
        }
         
        player.ypos = BigCar[player.index - 1].y;
        player.xpos = BigCar[player.index - 1].x;
        player.updateDetails();     
                                
        BigCar[player.index - 1].collide(edges[0]);   
        BigCar[player.index - 1].collide(edges[1]);   
        BigCar[player.index - 1].collide(edges[2]);   
        BigCar[player.index - 1].collide(edges[3]);   
            
       
    }
    endGame()
    {
        Player.getplayerinfo();
        var highscore =0;
        var index;
        if(AllPlayers !== undefined){
                       
           
            for(var P in AllPlayers){
          //finding who is the winner     
                if(highscore< AllPlayers[P].score){
                    highscore = AllPlayers[P].score;
                    index = P;
                    index = index.slice(6)
                    
                }
               }              
                
           
            }
            if(player.index === Number(index)){
                console.log(player.index);
                
                fill("white")
                text("You are the winner", displayWidth/2, displayHeight/2)
            }else{
                fill("white")
                console.log(player.index);
                text("OOf, you suck at this game, get better", displayWidth/2, displayHeight/2)
            }
        
       
    }
     


}