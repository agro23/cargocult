var mapLayout = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+
'xtttt________________________________________uuuux'+
'xttt__________________________________________uuux'+
'xtt____________________________________________uux'+
'xt______________________________________________ux'+
'x________________________________________________x'+
'x________________!_______________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x____!___________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x___________________________________________!____x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x_______!________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x__________________________________________!_____x'+
'x________________________________________________x'+
'x________________________________________________x'+
'xv______________________________________________wx'+
'xvv____________________________________________wwx'+
'xvvv__________________________________________wwwx'+
'xvvvv_____________8__________________________wwwwx'+
'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

function Player(xCoord, yCoord, facing) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.currentSpot = 2018;
  this.nextSpot = "";
  this.facing = "up";
  this.pause = false;
  this.nextX = xCoord;
  this.nextX2 = xCoord-1;
  this.nextY = yCoord;
  this.nextY2 = yCoord;
}

function Robot(xCoord, yCoord, facing) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.currentSpot = "";
  this.nextSpot = "";
  this.status = true;
  this.facing = "top";
  this.sight = "nothing";
  this.nextX = xCoord;
  this.nextX2 = xCoord-1;
  this.nextY = yCoord;
  this.nextY2 = yCoord;
  this.randomStore = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  this.randomZero = 0;
  this.isFunctional = true;
}

function goal(number, color) {
  this.number = number;
  this.color = color;
}

function cargo(id, xCoord, yCoord, heading, points, speed, color) {
  this.id = id;
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.heading = heading;
  this.points = points;
  this.speed = speed;
  this.color = color;
}

var player1 = new Player(18,39, "up");

var robot1 = new Robot(5,10);
var robot2 = new Robot(44,23);
var robot3 = new Robot(8,30);
var robot4 = new Robot(43,33);

var location =0;

var xCoord = 0;
var yCoord = 0;
var colorArray = ["red", "chartreuse", "purple", "yellow"];
var cargoArray = [];
var pointsArray = [1,3,5,10];
for (var i = 1; i < 10; i++){
  xCoord =  Math.floor(Math.random()*50);
  yCoord =  Math.floor(Math.random()*42);
  points = pointsArray[Math.floor(Math.random()*4)];
  color = colorArray[Math.floor(Math.random()*4)];
  myCargo = new cargo(i, xCoord, yCoord, 0, points, 1, color);
  cargoArray.push(myCargo);
  location = passConvertCoordinates(xCoord, yCoord);
  console.log("location-1 " + location-1);
  // mapLayout = mapLayout.replaceAt(location-1, 'C');
}

Robot.prototype.checkForPlayers = function() {
  // robot finds players
  this.currentSpot = passConvertCoordinates(this.xCoord,this.yCoord);
  var spotSelector = this.currentSpot+1;


  if (this.randomZero < 5){
    this.randomZero++;
  } else {
    this.randomStore = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    this.randomZero = 0;
  }

  if (this.randomStore == 1) {
  //right
    this.facing = "right";
    while (this.nextX < 48) {
      this.nextX = this.nextX+1;
      replaceSpot = passConvertCoordinates(this.nextX,this.yCoord);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextX = 48; //48
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextX = this.xCoord;
  }
  if (this.randomStore == 2) {
    //left
    this.facing = "left";
    while (this.nextX2 > 1) {
      this.nextX2 = this.nextX2-1;
      replaceSpot = passConvertCoordinates(this.nextX2,this.yCoord);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextX2 = 1;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextX2 = this.xCoord;
  }
  if (this.randomStore == 3) {
    //up
    this.facing = "top";
    while (this.nextY > 1) {
      this.nextY = this.nextY-1;
      replaceSpot = passConvertCoordinates(this.xCoord,this.nextY);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextY = 1;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextY = this.yCoord;
  }
  if (this.randomStore == 4) {
    //down
    this.facing = "bottom";
    while (this.nextY2 < 40) {
      this.nextY2 = this.nextY2+1;
      replaceSpot = passConvertCoordinates(this.xCoord,this.nextY2);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextY2 = 40;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextY2 = this.yCoord;
  }
  $("span:nth-of-type("+spotSelector+")").css('border-'+this.facing, '5px solid black');
}

Robot.prototype.move = function() {
// Robot movement

  this.currentSpot = passConvertCoordinates(this.xCoord,this.yCoord);

  var spotSelector = this.currentSpot+1;
  $("span:nth-of-type("+spotSelector+")").css('background', 'red');

  if (this.status == true) {
    if (this.yCoord < player1.yCoord) {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1)}
    if (this.yCoord > player1.yCoord) {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1)}
    if (mapLayout.charAt(this.nextSpot) == "_" || mapLayout.charAt(this.nextSpot) == "*") {
      mapLayout = mapLayout.replaceAt(this.currentSpot, "_");
      mapLayout = mapLayout.replaceAt(this.nextSpot, "!");
      this.currentSpot = this.nextSpot;
      this.nextSpot = "";
      if (this.yCoord < player1.yCoord) {
        this.yCoord = this.yCoord+1;
        this.facing = "bottom";
      }
      if (this.yCoord > player1.yCoord) {
        this.yCoord = this.yCoord-1;
        this.facing = "top";
      }
      else {this.yCoord = this.yCoord}
    } else {
      this.status = false;
    }
  }
  else {
    if (this.xCoord < player1.xCoord) {this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord)}
    if (this.xCoord > player1.xCoord) {this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord)}
    if (mapLayout.charAt(this.nextSpot) == "_" || mapLayout.charAt(this.nextSpot) == "*") {
      mapLayout = mapLayout.replaceAt(this.currentSpot, "_");
      mapLayout = mapLayout.replaceAt(this.nextSpot, "!");
      this.currentSpot = this.nextSpot;
      this.nextSpot = "";
      if (this.xCoord < player1.xCoord) {
        this.xCoord = this.xCoord+1;
        this.facing = "right";
      }
      if (this.xCoord > player1.xCoord) {
        this.xCoord = this.xCoord-1;
        this.facing = "left";
      }
      else {this.xCoord = this.xCoord}
    }
    else {
      this.status = true;
    }
  }
  $("span:nth-of-type("+spotSelector+")").css('border-'+this.facing, '10px solid black');

}

// var bullets = [];
// var bulletsNumber = 0;
//
// function Bullet(xCoord, yCoord, facing) {
//   this.xCoord = xCoord;
//   this.yCoord = yCoord;
//   this.facing = facing;
//   this.nextX = this.xCoord;
//   this.nextY = this.xCoord;
// }
//
// Bullet.prototype.changeX = function() {this.xCoord = player1.xCoord}
// Bullet.prototype.changeY = function() {this.yCoord = player1.yCoord}
// Bullet.prototype.changeFacing = function() {this.facing = player1.facing}
//
// var moveCount = 0;

// Player.prototype.shoot = function() {
//
//   bullets[bulletsNumber] = new Bullet(this.xCoord, 2, "up");
//   bullets[bulletsNumber].changeX();
//   bullets[bulletsNumber].changeY();
//   bullets[bulletsNumber].changeFacing();
//   //bulletsNumber = bulletsNumber + 1;
//
//   // console.log(bullets[0].xCoord);
//   //test
//   if (bullets[bulletsNumber].facing == "right") {
//     while (bullets[bulletsNumber].nextX < 48) {
//       // console.log(bullets[bulletsNumber].nextX);
//       bullets[bulletsNumber].nextX = bullets[bulletsNumber].nextX+2;
//       replaceSpot = passConvertCoordinates(bullets[bulletsNumber].nextX,this.yCoord);
//       replacePrevious = replaceSpot;
//       if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
//         bullets[bulletsNumber].nextX = 48;
//       }
//       else {
//         mapLayout = mapLayout.replaceAt(replaceSpot, "b");
//         //mapLayout = mapLayout.replaceAt(replacePrevious, "_");
//       }
//     }
//     bullets[bulletsNumber].nextX = bullets[bulletsNumber].xCoord;
//   }
//
//
// }

Player.prototype.checkForRobots = function() {
  // Robot is next to player
  if (mapLayout.charAt(passConvertCoordinates(this.xCoord,this.yCoord+1)) == "!" ||
      mapLayout.charAt(passConvertCoordinates(this.xCoord,this.yCoord-1)) == "!" ||
      mapLayout.charAt(passConvertCoordinates(this.xCoord+1,this.yCoord)) == "!" ||
      mapLayout.charAt(passConvertCoordinates(this.xCoord-1,this.yCoord)) == "!") {
    //console.log("game over");
    $(".test").html("game over");
  } else {
    $(".test").html("");
  }
}

Player.prototype.interact = function(interactWith) {

  if (interactWith == "talk") {


    //check if space where you are facing is a npc and if so then alert or w/e
    var way = player1.facing;

    if (way == "left") {this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord);}
    if (way == "up") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1);}
    if (way == "right") {this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord);}
    if (way == "down") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1);}
    if(mapLayout.charAt(this.nextSpot) == "&") {console.log("hello");}
    if(mapLayout.charAt(this.nextSpot) == "t") {
      console.log("terminal");
    }
    //console.log(this.nextSpot+" "+getConvertCoordinates(this.nextSpot));
    player1.pause = true;
  }
}

Player.prototype.move = function(way) {

  //collision detection
  if (way == "left") {this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord);}
  if (way == "up") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1);}
  if (way == "right") {this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord);}
  if (way == "down") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1);}
  //console.log(mapLayout.charAt(this.nextSpot));
  this.facing = way;

  this.currentSpot = passConvertCoordinates(this.xCoord,this.yCoord);
  if (way == "left") {
    this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord);
  }
  if (way == "up") {
    this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1);
  }
  if (way == "right") {
    this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord);
  }
  if (way == "down") {
    this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1);
  }

  if (mapLayout.charAt(this.nextSpot) !== "_" && mapLayout.charAt(this.nextSpot) !== "*") {
    this.nextSpot = "";
  }
  else {
    if (way == "left") {
      this.xCoord = this.xCoord-1;
    }
    if (way == "up") {
      this.yCoord = this.yCoord-1;
    }
    if (way == "right") {
      this.xCoord = this.xCoord+1;
    }
    if (way == "down") {
      this.yCoord = this.yCoord+1;
    }
    mapLayout = mapLayout.replaceAt(this.currentSpot, "_");
    mapLayout = mapLayout.replaceAt(this.nextSpot, "8");
    this.currentSpot = this.nextSpot;
    this.nextSpot = "";
    return this.currentSpot;
  }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}



function cleanScreen() {
  var coords = 0;
  var matches = mapLayout.match(/(.*?)\!/g);
  for (i=0; i<matches.length; i++) {
    coords = coords+matches[i].length;
    var questionsMarkXCoord = getXConvertCoordinates(coords-1);
    var questionsMarkYCoord = getYConvertCoordinates(coords-1);
    //console.log(questionsMarkXCoord+" "+questionsMarkYCoord);

    //if x and y coordinates are equal to each robot coordinates
    if (questionsMarkXCoord == robot1.xCoord && questionsMarkYCoord == robot1.yCoord ||
        questionsMarkXCoord == robot2.xCoord && questionsMarkYCoord == robot2.yCoord ||
        questionsMarkXCoord == robot3.xCoord && questionsMarkYCoord == robot3.yCoord ||
        questionsMarkXCoord == robot4.xCoord && questionsMarkYCoord == robot4.yCoord) {} else {mapLayout = mapLayout.replaceAt(coords-1, "_");}

  }
  //alert(coords);

  //
  // var testlength = 0;
  // mapLayout.match(/(.*?)\!/g).forEach(function(element,index){
  //   //console.log(element);
  //   console.log(element[0]);
  //   testlength++
  // });
  // testlength = 0;
}


var moveCount = 0;
function drawScreen() {

  var map1Layout = mapLayout;

  map1Layout = map1Layout.replace(/_/g, 'o')
    .replace(/\[\]/g, 'cc')
    .replace(/8/g, 'p')
    .replace(/&/g, 'n')
    .replace(/@/g, 't')
    .replace(/=/g, 'd')
    .replace(/!/g, 'r')
    .replace(/\*/g, 's');

    // console.log(map1Layout);

  $("#display").html("");
  //draw the screen
  var character = 0;
  for (var i = 0; i < 42; i++) {
    //row
    for (var x = 0; x < 50; x++) {
// ***************
      if (map1Layout.charAt(character) == "p") {
        $("#display").append("<span class='"+map1Layout.charAt(character)+" "+player1.facing+" pixels'>"+"</span>");
      }
      else {
        $("#display").append("<span class='"+map1Layout.charAt(character)+" pixels'>"+"</span>");
       }
        character++;
    }
    $("#display").append("<br>");
  }
    if (player1.pause == false) {
      player1.checkForRobots();
      if (robot1.sight !== "player") {robot1.checkForPlayers()}
      else {if (moveCount == 2) {robot1.move()}}
      if (robot2.sight !== "player") {robot2.checkForPlayers()}
      else {if (moveCount == 2) {robot2.move()}}
      if (robot3.sight !== "player") {robot3.checkForPlayers()}
      else {if (moveCount == 2) {robot3.move()}}
      if (robot4.sight !== "player") {robot4.checkForPlayers()}
      else {if (moveCount == 2) {robot4.move()}}

      if (moveCount == 2) {
        moveCount = 0;
      }
      moveCount++;

    }

    // character = 0;
    // for (var i = 0; i < 42; i++) {
    //   //row
    //   for (var x = 0; x < 50; x++) {
    //     $(".test").append(mapLayout.charAt(character));
    //       character++;
    //   }
    //   $(".test").append("<br>");
    // }

    //map1Layout = map1Layout.match(/^(.*?)\!/g);

    //var myRegexp = /\!(.*?)\!/g;

    // var match = myRegexp.match(mapLayout);
    //console.log(match);
    //console.log(mapLayout.match(myRegexp).length);//outputs the number of matches
    // for (i=0; i<match.length; i++) {
    //    alert(i+" "+match[i]);
    // }
    //console.log(match[2]);
}

// cargo_handler
  // cargo stats
// goal_lighter
  // goal object

function getXConvertCoordinates(longCoord) {
  var y = Math.floor(longCoord/50);
  var x = longCoord - (y * 50);
  //console.log("x: "+x+" "+"y: "+y);
  return x;
}

function getYConvertCoordinates(longCoord) {
  var y = Math.floor(longCoord/50);
  var x = longCoord - (y * 50);
  //console.log("x: "+x+" "+"y: "+y);
  return y;
}

function passConvertCoordinates(xcoord,ycoord) {
  var y = ycoord * 50;
  return xcoord+y;
}

var Game = {};

if (player1.pause == true) {Game.fps = 0; console.log("0")}
else {Game.fps = 60;}


Game.run = function() {
  drawScreen();
  cleanScreen();
};

var change = {
  37: {
    left: "-=1"
  },

  38: {
    top: "-=1"
  },

  39: {
    left: "+=1"
  },

  40: {
    top: "+=1"
  },
}
$(document).on({
  keydown: keydown,
  keyup: keyup
})

var movement = []

function keydown(e) {
  var key = e.which
  var animation = change[key];
  if (!movement[key]) { // watch out for repeating keys!
      movement[key] = setInterval(keepGoing)

  }
  //  console.log("down", key, movement[key])
  function keepGoing() {
    //console.log(animation)
    if (player1.pause == false) {
      if (key == 37) {player1.move("left")}
      if (key == 38) {player1.move("up")}
      if (key == 39) {player1.move("right")}
      if (key == 40) {player1.move("down")}
      if (key == 84) {player1.interact("talk")}
      if (key == 32) {player1.shoot()}
  }

  }
}

function keyup(e) {
  var key = e.which
  movement[key] = clearInterval(movement[key])
}

$(document).ready(function() {



    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);

})
