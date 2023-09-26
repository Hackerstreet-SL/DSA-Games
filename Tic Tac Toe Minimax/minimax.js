// Tic-Tac-Toe board represented as an array (3x3 grid)
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  // Function to check if the game is over
  function isGameOver(board) {
    // Check for a win
    // Implement your win condition checks here
  
    // Check for a draw
    if (board.flat().every(cell => cell !== '')) {
      return true; // Game is a draw
    }
  
    return false; // Game is not over yet
  }
  
  // Function to evaluate the score of the board for the minimax algorithm
  function evaluate(board) {
    // Implement your evaluation logic here
    // Return a positive value if the current player is winning,
    // a negative value if the opponent is winning, and 0 for a draw.
  }
  
  // Minimax algorithm function
  function minimax(board, depth, isMaximizingPlayer) {
    if (isGameOver(board)) {
      const score = evaluate(board);
      return score;
    }
  
    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            const eval = minimax(board, depth + 1, false);
            board[i][j] = '';
            maxEval = Math.max(maxEval, eval);
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            const eval = minimax(board, depth + 1, true);
            board[i][j] = '';
            minEval = Math.min(minEval, eval);
          }
        }
      }
      return minEval;
    }
  }
  
  // Example usage to find the best move for the computer (AI)
  function findBestMove(board) {
    let bestMove = { row: -1, col: -1 };
    let bestEval = -Infinity;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'X';
          const eval = minimax(board, 0, false);
          board[i][j] = '';
          
          if (eval > bestEval) {
            bestEval = eval;
            bestMove.row = i;
            bestMove.col = j;
          }
        }
      }
    }
  
    return bestMove;
  }
  
  // Example usage
  const bestMove = findBestMove(board);
  console.log('Best Move:', bestMove); // Output the best move for the computer
  