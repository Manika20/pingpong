var check = false;
var rods = document.getElementsByClassName('rod');
var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
var operator1;
var operator2;
var incre =1;
var arr = ['-','+'];
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight; 

function changeDirection(string)
{
      console.log(string);
      operator1 = arr[(Math.floor(Math.random() * arr.length))];
      operator2 = arr[(Math.floor(Math.random() * arr.length))];
      if(string=="topHit")
      {
        operator2 = '+';
      }
      else if(string=="bottomHit")
      {
        operator2=  '-';
      }
      else if(string=="leftHit")
      {
        operator1 ='+';
      }
      else{
        operator1='-';
      }
}
function reset(string)
{
    var rod1C =  rod1.getBoundingClientRect();
    var rod2C =  rod2.getBoundingClientRect();
     if(string=="top")
     {
        var left = windowWidth/2;
        var rodLeft1 = windowWidth/2 - rod1.offsetWidth/2;
        rod1.style.left = rodLeft1+"px"; 
        var ballTop = rod1C.top +ball.offsetHeight;
        ball.style.top= ballTop+"px";
        ball.style.left = left +"px";
        var rodLeft2 = windowWidth/2 - rod2.offsetWidth/2;
        rod2.style.left = rodLeft2+"px";
        operator1 = arr[(Math.floor(Math.random() * arr.length))]; 
        operator2 = '+'
        }
else
     {
        var left = windowWidth/2;
        var rodLeft2 = windowWidth/2 - rod2.offsetWidth/2;
        rod2.style.left = rodLeft2+"px"; 
        var ballTop = rod2C.top - ball.offsetHeight;
        ball.style.top= ballTop +"px";
        ball.style.left = left +"px";
        var rodLeft1 = windowWidth/2 - rod1.offsetWidth/2;
        rod1.style.left = rodLeft1+"px"; 
        operator1 = arr[(Math.floor(Math.random() * arr.length))];
        operator2 = '-';
     } 
     
}
reset("bottom");
function gameOver(string)
{
        if(string=="top")
        {
            localStorage.setItem("winner","player1");
            alert('Player1 Won!! Press Enter to continue' )
            console.log("player1 won the game.");
        }
        else{
            localStorage.setItem("winner","player2");
            alert('Player2 Won!! Press Enter to continue' )
            console.log("player2 won the game.")
        }
        check =false;
}
function moveBall()
{
    var interval = setInterval(function()
    {
           var rod1C =  rod1.getBoundingClientRect();
           var rod2C =  rod2.getBoundingClientRect();
           var ballC =  ball.getBoundingClientRect();
           var ballTop = rod2C.top - ball.offsetHeight;
           var string1 = ballC.left + operator1 + incre;
           var string2 = ballC.top + operator2 + incre;
           var left =  eval(string1);
           var top =   eval(string2);
           ball.style.left = left+"px";
           ball.style.top = top + "px";
           if(ballC.top -2 <= rod1C.bottom  && ballC.left >= rod1C.left && ballC.right<=rod1C.right)
           {

                   console.log("hit");
                   changeDirection("topHit");
        
           }
           else if(ballC.top +1 >=ballTop && ballC.left >= rod2C.left && ballC.right<=rod2C.right)
           {
                  changeDirection("bottomHit");
                  
           }
           else if(ballC.right+2>=windowWidth )
           {
                     changeDirection("rightHit");
                    
           }
           else if(ballC.left-2<=0)
           {
                   changeDirection("leftHit");
           }
           else if(ballC.top-2<=0)
           {
                    reset("top");
                    gameOver("bottom");
                    clearInterval(interval);
           }
           else if(ballC.bottom+2>=windowHeight)
           {
                    reset("bottom");
                    gameOver("top");
                    clearInterval(interval);
           }
    },10
    )
}
function moveRodLeft()
{
   for(var i=0;i<rods.length;i++)
   {
      var cordinates = rods[i].getBoundingClientRect();
      if(cordinates.left-5>=0)
      {
      var left = cordinates.left - 5;
      rods[i].style.left= left+"px";
      //console.log(rods[i].style.left);
      }
   }
}
function moveRodRight()
{
    for(var i=0;i<rods.length;i++)
    {
       var cordinates = rods[i].getBoundingClientRect();
       //console.log(windowWidth);
       if(cordinates.right+5<=windowWidth)
       {
       var right = cordinates.left + 5;
       rods[i].style.left= right+"px";
       //console.log(rods[i].style.left);
       }
    }
}
function startGame()
{
    if(localStorage.getItem('winner')=="player1" )
    {
    alert('Player1 was winner of previous game. Press Enter to start. Press a to move left and d to move right');
    }
    else if(localStorage.getItem('winner')=="player2")
    {
    alert('Player2 was winner of previous game. Press Enter to start. Press a to move left and d to move right');
    }
    else{
        alert('Press Enter to start. Press a to move left and d to move right');
    }
}
startGame();
document.addEventListener('keypress',function(e)
{
    
    var key = e.key;
    if(key=='a')
    {
        if(check==true)
        {
            //console.log(e.key);
            moveRodLeft();
        }
        else{
            console.log("press enter to start");
        }
        
    }
    else if(key=='d')
    {
        if(check==true)
        {
            //console.log(e.key);
            moveRodRight();
        }
        else{
            console.log("press enter to start");
        }
    }
    else if(key=='Enter')
    {
        //console.log(e.key);
        check= true;
        moveBall();

    }
    else{
        console.log("You have entered wrong key!");
    }

})