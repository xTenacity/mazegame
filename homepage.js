var lineWidth = 1;
var playing = true;
var boardSize = 600;
var turn = 0;
var board = [["", "", ""], ["", "", ""], ["", "", ""]];




var canvas = document.createElement('canvas');
canvas.id = "CursorLayer";
canvas.width = boardSize + (lineWidth * 3);
canvas.height = boardSize + (lineWidth * 3);
canvas.style.top = "100px";
canvas.style.left = ((window.screen.width / 2) - (canvas.width / 2)) + "px";
canvas.style.position = "absolute";

var resetButton = document.createElement("button");
resetButton.id = "resetButton";
resetButton.innerHTML = "reset";
resetButton.style.position = "absolute";
resetButton.style.top = (canvas.height + parseInt(canvas.style.top) + 10) + "px";
resetButton.style.left = ((canvas.width / 2) - 50 + parseInt(canvas.style.left)) + "px";
resetButton.style.width = "100px";
resetButton.style.height = "50px";

var turnLabel = document.createElement("h1");
turnLabel.id = "turnLabel";
turnLabel.innerHTML = "X's Turn";
turnLabel.style.position = "absolute";
turnLabel.style.top = "10px";
turnLabel.style.left = ((canvas.width / 2) - 50 + parseInt(canvas.style.left)) + "px";
turnLabel.style.width = "200px";
turnLabel.style.height = "50px";

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
body.appendChild(resetButton);
body.appendChild(turnLabel);
var ctx = canvas.getContext("2d");
createBoard();


function createBoard(color) {
  ctx.fillStyle = color;
  for (var i = 0; i < 2; i++) {
    ctx.fillRect(0, (canvas.height / 3) * (i + 1), canvas.height, lineWidth);
    ctx.fillRect((canvas.width / 3) * (i + 1), 0, lineWidth, canvas.width);
  }
}

function updateScreen(x, y) {
  ctx.fillStyle = randColor();
  if (board[x][y] == "x") {
    //draw X
    ctx.beginPath();          // Start a new path
    ctx.moveTo(25 + (x * 200), 25 + (y * 200));       // Move the cursor to (50, 50)
    ctx.lineTo(175 + (x * 200), 175 + (y * 200));      // Draw a line to (150, 50)
    ctx.moveTo(175 + (x * 200), 25 + (y * 200));     // Draw a line to (150, 100)
    ctx.lineTo(25 + (x * 200), 175 + (y * 200));      // Draw a line to (50, 100)
    ctx.closePath();           // Close the path (optional)
    ctx.strokeStyle = randColor(); // Set the line color
    ctx.lineWidth = 10;        // Set the line width
    ctx.stroke();
  } else if (board[x][y] == "o") {
    ctx.beginPath();
    ctx.arc(100 + (x * 200), 100 + (y * 200), 75, 0, 2 * Math.PI, false);
    ctx.closePath();           // Close the path (optional)
    ctx.strokeStyle = randColor(); // Set the line color
    ctx.lineWidth = 10;        // Set the line width
    ctx.stroke();
  }
}

function clearCanvas() {
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.fillRect(0, 0, boardSize + 3, boardSize + 3);
}

function checkWin() {
  ctx.beginPath();
  var winner = "";
  for (var i = 0; i < 3; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != "") { //columns
      ctx.moveTo(100 + (i * 200), 0);
      ctx.lineTo(100 + (i * 200), boardSize);
      winner = board[i][0]
    } else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != "") { //rows
      ctx.moveTo(0, 100 + (i * 200));
      ctx.lineTo(boardSize, 100 + (i * 200));
      winner = board[0][i]
    }
  }
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "") {
    ctx.moveTo(0, 0);
    ctx.lineTo(boardSize, boardSize);
    winner = board[0][0]
  } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "") {
    ctx.moveTo(boardSize, 0);
    ctx.lineTo(0, boardSize);
    winner = board[0][2];
  }
  ctx.closePath();           // Close the path (optional)
  ctx.strokeStyle = randColor();
  ctx.lineWidth = 20;        // Set the line width
  ctx.stroke();
  if (winner != "") {
    setTimeout(() => alert(winner + " wins!"), 0);
    playing = false;
  } else if (turn == 9) {
    setTimeout(() => alert("It was a tie!"), 0);
    playing = false;
  }
}

addEventListener("click", function(event) {
  if (playing == true) {
    if ((event.clientX < (boardSize + parseInt(canvas.style.left)) && (event.clientX > parseInt(canvas.style.left))) &&
      (event.clientY < (boardSize + parseInt(canvas.style.top)) && (event.clientY > parseInt(canvas.style.top)))) {
      var x = Math.floor((event.clientX - parseInt(canvas.style.left)) / 200);
      var y = Math.floor((event.clientY - parseInt(canvas.style.top)) / 200);
      if (board[x][y] == "") {
        if (turn % 2 == 0) {
          board[x][y] = "x";
          turnLabel.innerHTML = "O's Turn";
        } else {
          board[x][y] = "o";
          turnLabel.innerHTML = "X's Turn";
        }
        turn++;
        checkWin();
        updateScreen(x, y);

      }
    }
  }
});
resetButton.addEventListener("click", function() {
  playing = true;
  turn = 0;
  turnLabel.innerHTML = "X's Turn";
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  clearCanvas();
  createBoard(randColor());
});


function randColor() {
  return "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", 1)";
}