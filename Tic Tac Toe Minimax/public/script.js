const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const game_status_txt = document.getElementById("game_status")

admin_mode = false;
const XsAndOs = new Array(3).fill(null).map(() => new Array(3).fill(null));
console.log(XsAndOs);

let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

let winner_pos = []

// borders of the game

ctx.strokeStyle = "black";                          // Set the line color
ctx.lineWidth = 2;                                  // Set the line width
ctx.beginPath();
ctx.moveTo(0, 100);                                  // Starting point (x, y)
ctx.lineTo(300, 100);                                // Ending point (x, y)
ctx.stroke();                                        // Stroke the line

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
  let board = XsAndOs;
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == null) {
        board[i][j] = 'X'
        let score = minimax(board, 0, false);
        board[i][j] = null
        if (score > bestScore) {
          bestScore = score;
          move = { x: j, y: i };
        }
      }
    }
  }
  console.log(move);
  insertImage("X", move.x, move.y);
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner(board);
  if (result != null) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == null) {
          board[i][j] = "X";
          let score = minimax(board, depth + 1, false);
          board[i][j] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == null) {
          board[i][j] = "O";
          let score = minimax(board, depth + 1, true);
          board[i][j] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function equals(a, b, c) {
  return a == b && b == c && a != null;
}
function checkWinner(board) {

  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (equals(board[i][0], board[i][1], board[i][2])) {
      winner_pos = [[[i],[0]],[[i],[2]]];
      winner = board[i][0];
      break;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (equals(board[0][i], board[1][i], board[2][i])) {
      winner_pos = [[[0],[i]],[[2],[i]]];
      winner = board[0][i];
      break;
    }
  }

  if (equals(board[0][0], board[1][1], board[2][2])) {
    winner_pos = [[[0],[0]],[[2],[2]]];
    winner = board[0][0];
  }

  if (equals(board[2][0], board[1][1], board[0][2])) {
    winner_pos = [[[2],[0]],[[0],[2]]];
    winner = board[2][0];
  }

  if (winner == null && boardIsFull(board)) {
    return 'tie';
  } else {
    return winner;
  }
}

function boardIsFull(board) {
  let unfilled_count = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cell === null) {
        unfilled_count.push([[i, j]]);
      }
    }
  }
  return unfilled_count.length === 0;
}

// Function to send game result to the server
function sendGameResult(playerName, result) {
  const data = {
      playerName: playerName,
      result: result,
  };

  fetch('/storeResults', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((data) => {
          console.log(data.message);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
}

// Function to handle game over and send game result to the server
function handleGameOver(result) {
  // Display game result to the user
  game_status_txt.textContent = result;

  if (result.includes("Winner")) {
      drawLine(winner_pos);
  }

  const playerName = prompt('Enter your name:');

  if (playerName) {
      sendGameResult(playerName, result);
  }
}

/**
 * @param {string} imageType should be X or O 
 * @param {number} x horizontal position
 * @param {number} y vertical position
 */
function insertImage (imageType, x, y) {

  const icon = new Image();

  if (imageType == 'X') {
    icon.src = './assets/icon-x.png';
    icon.onload = function() {
      ctx.drawImage(icon, 15, 12, 100, 110, x*100+25, y*100+25, 150, 150, 0, 0);  
    }
    XsAndOs[y][x] = 'X';

  } else if (imageType == 'O') {
    icon.src = './assets/icon-o.png';
    icon.onload = function() {
      ctx.drawImage(icon, 5, 1, 160, 170, x*100+25, y*100+25, 150, 150, 0, 0);  
    }
    XsAndOs[y][x] = 'O';
  }
}

function drawLine (cells) {
  const from = cells[0]
  const to = cells[1]

  console.log('from', from, 'to', to)

  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(from[1]*100+50, from[0]*100+50);
  ctx.lineTo(to[1]*100+50, to[0]*100+50);
  ctx.stroke(); 
}

document.addEventListener("mousedown", function (event) {
  let canvasPosition = canvas.getBoundingClientRect();

  let x = ((event.clientX-canvasPosition.left) - ((event.clientX-canvasPosition.left) % 100)) / 100;
  let y = ((event.clientY-canvasPosition.top) - ((event.clientY-canvasPosition.top) % 100)) / 100;

  let result = checkWinner(XsAndOs);
  if (result == null) {
    if (XsAndOs[y][x]==null) {
      if (admin_mode) {
        insertImage("X", x, y)
      
      } else {
        insertImage("O", x, y)
      }
      bestMove();
      console.log(XsAndOs)
    }
    result = checkWinner(XsAndOs);
    if(result != null) {
      game_status_txt.textContent = `Winner is ${result}`
      drawLine(winner_pos);
      handleGameOver(`Winner is ${result}`)
    }
  } else { 
    game_status_txt.textContent = `Winner is ${result}`
    drawLine(winner_pos)
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
    // logic();
  }
})
