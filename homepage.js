//for the canvas
var canvas;
var body;
var ctx;

var boardWidth = 10;
var boardHeight = 16;

var playing = true;
var pKey = [false, false, false, false];

var playerPos = [10, 10];

function Player(position, size, ) {
  this.name = name; //name of map
  this.map = map; //made of map width, board width, map string
  this.iPos = iPos; //made of initial map x, initial map y, initial board xy
}

/*
0 - empty
1 - red block
2 - blue block
3 - green block
4 - yellow block
5 - controlled block
*/
document.addEventListener('DOMContentLoaded', function() { //load everything
  canvas = document.createElement('canvas');
  canvas.id = "CursorLayer";
  canvas.width = boardWidth * 50;
  canvas.height = boardHeight * 50;
  canvas.style.top = "10px";
  canvas.style.left = ((window.screen.width / 2) - (canvas.width / 2)) + "px";
  canvas.style.position = "absolute";
  canvas.style.borderWidth = "10px";
  body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
  //drawUI();
  setInterval(updateScreen, 10);
});

function drawUI() { //draw the screen
  
}

function updateScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(playerPos[0] - 5, playerPos[1] - 5, 10, 10);
  move();
  drawUI();
}

function move() {
  if (pKey[0] == true && pKey[2] == false) { //if going up and not down
    playerPos[1] -= 1;
  }
  if (pKey[0] == false && pKey[2] == true) { //if going down and not up
    playerPos[1] += 1
  }
  if (pKey[1] == true && pKey[3] == false) { //if going left and not right
    playerPos[0] -= 1;
  }
  if (pKey[1] == false && pKey[3] == true) { //if going right and not left
    playerPos[0] += 1;
  }
}



function checkInput(key, event) {
  if (event == "down") {
    if (key == "w") { //up
      pKey[0] = true;
    }
    if (key == "a") { //left
      pKey[1] = true;
    }
    if (key == "s") { //down
      pKey[2] = true;
    }
    if (key == "d") { //right
      pKey[3] = true;
    }
  } else {
    if (key == "w") { //up
      pKey[0] = false;
    }
    if (key == "a") { //left
      pKey[1] = false;
    }
    if (key == "s") { //down
      pKey[2] = false;
    }
    if (key == "d") { //right
      pKey[3] = false;
    }
  }
}

function keydown(event) {
  checkInput(event.key, "down");
}

function keyup(event) {
  checkInput(event.key, "up");
}