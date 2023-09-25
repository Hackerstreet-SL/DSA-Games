const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

admin_mode = false;
const XsAndOs = new Array(3).fill(null).map(() => new Array(3).fill(null));
console.log(XsAndOs)

// borders of the game

ctx.strokeStyle = "black";  // Set the line color
ctx.lineWidth = 2;          // Set the line width
ctx.beginPath();
ctx.moveTo(0, 100);         // Starting point (x, y)
ctx.lineTo(300, 100);       // Ending point (x, y)
ctx.stroke();               // Stroke the line

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(0, 200);
ctx.lineTo(300, 200);
ctx.stroke(); 

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(100, 0);
ctx.lineTo(100, 300);
ctx.stroke(); 

ctx.strokeStyle = "black"; 
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(200, 0);
ctx.lineTo(200, 300);
ctx.stroke(); 

function bestMove() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (XsAndOs[j][i]== null) {
        XsAndOs[j][i] = 'X'
        let score = minimax();
        XsAndOs[j][i] = null
        if (score > bestScore) {
          bestScore = score;
          bestMove = { x:i, y:j };
        }
      } 
    }
  }
  console.log(bestMove)
  insertImage('X', bestMove.x, bestMove.y)
  currentPlayer = 'O';
}

function minimax() {
  return 1;
}

function checkWinner () {

  function equals (a, b, c) {
    return (a==b && b==c && a!=null)
  }

  let winner = null;
  
  for (let i = 0; i < 3; i++) {
    if (XsAndOs[i][0] == XsAndOs[i][1] == XsAndOs[i][2]) {
      winner = XsAndOs[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (XsAndOs[0][i] == XsAndOs[0][i] == XsAndOs[0][i]) {
      winner = XsAndOs[0][i];
    }
  }

  if (equals(XsAndOs[0][0], XsAndOs[1][1], XsAndOs[2][2])) {
    winner = XsAndOs[0][0];
  }

  if (equals(XsAndOs[2][0], XsAndOs[1][1], XsAndOs[2][0])) {
    winner = XsAndOs[2][0];
  }

  if (winner == null) {
    return 'tie'
  } else {
    return winner
  }
  
}

function boardIsFull () {
  let unfilled_count = []
  for (let i = 0; i < XsAndOs.length; i++) {
    const row = XsAndOs[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cell === null) {
        unfilled_count.push([[i,j]])
        console.log
      }
    }
  }
  return unfilled_count;
}

/**
 * @param {string} imageType should be X or O 
 * @param {number} x horizontal position
 * @param {number} y vertical position
 */
function insertImage (imageType, x, y) {

  const icon = new Image();

  if (imageType == 'X') {
    icon.src = './Images/icon-x.png';
    icon.onload = function() {
      ctx.drawImage(icon, 15, 12, 100, 110, x*100+25, y*100+25, 150, 150, 0, 0);  
    }
    XsAndOs[y][x] = 'X';

  } else if (imageType == 'O') {
    icon.src = './Images/icon-o.png';
    icon.onload = function() {
      ctx.drawImage(icon, 5, 1, 160, 170, x*100+25, y*100+25, 150, 150, 0, 0);  
    }
    XsAndOs[y][x] = 'O';
  }
}

function drawLine (cells) {
  const from = cells[0]
  const to = cells[2]

  console.log('from', from, 'to', to)

  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(from[0]*100+50, from[1]*100+50);
  ctx.lineTo(to[0]*100+50, to[1]*100+50);
  ctx.stroke(); 
}


document.addEventListener("mousedown", function (event) {
  let canvasPosition = canvas.getBoundingClientRect();

  let x = ((event.clientX-canvasPosition.left) - ((event.clientX-canvasPosition.left) % 100)) / 100;
  let y = ((event.clientY-canvasPosition.top) - ((event.clientY-canvasPosition.top) % 100)) / 100;
  
  if (XsAndOs[y][x]==null) {
    if (admin_mode) {
      insertImage("X", x, y)
    
    } else {
      insertImage("O", x, y)
    }
    bestMove();
    console.log(XsAndOs)
  }
})

document.addEventListener("keydown", function (event) {
  if(event.key == 'Control') {
    admin_mode = true
  }
})

document.addEventListener("keyup", function (event) {
  if(event.key == 'Control') {
    admin_mode = false
  }
})

document.addEventListener("keyup", function (event) {
  if(event.key == 'Alt') {
    logic();
  }
})
