if (typeof document !== 'undefined') {
    const chessboard = document.getElementById('chessboard');
    const btnStart = document.getElementById('startChessGame');
    const btnReset = document.getElementById('resetChessGame');
    const txtPlayerName = document.getElementById('playerName');
    const btnSubmit = document.getElementById('submitResult');
    const resultMsg = document.getElementById('result');

    const chessboardSize = 8;
    let board;
    let currentPlayer = '';
    let moves = 0;

    // Knight's possible moves
    const knightMoves = [
        [-2, 1], [-2, -1], [2, 1], [2, -1],
        [-1, 2], [1, 2], [-1, -2], [1, -2]
    ];

    // Initialize the chessboard
    function initializeChessboard() {
        board = Array.from({ length: chessboardSize }, () => Array(chessboardSize).fill(0));
    }

    // Create the chessboard
    function createChessboard() {
        chessboard.innerHTML = '';
        for (let i = 0; i < chessboardSize; i++) {
            for (let j = 0; j < chessboardSize; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = i;
                square.dataset.col = j;
                square.textContent = board[i][j];
                chessboard.appendChild(square);
            }
        }

        // Add click event listener to each square
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', handleSquareClick);
        });
    }

    // Check if the move is valid
    function isValidMove(x, y) {
        return x >= 0 && x < chessboardSize && y >= 0 && y < chessboardSize && board[x][y] === 0;
    }

    // Solve the Knight's Tour problem using backtracking
    function solveProblem(x, y, move) {
        if (move === chessboardSize * chessboardSize) {
            return true; // All squares visited
        }

        for (let i = 0; i < knightMoves.length; i++) {
            const newX = x + knightMoves[i][0];
            const newY = y + knightMoves[i][1];

            if (isValidMove(newX, newY)) {
                board[newX][newY] = move + 1;
                if (solveProblem(newX, newY, move + 1)) {
                    return true;
                }
                board[newX][newY] = 0; // Backtrack
            }
        }

        return false;
    }

    // Handle square click
    function handleSquareClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        if (isValidMove(row, col)) {
            moves++;
            board[row][col] = moves;
            createChessboard();

            if (moves === chessboardSize * chessboardSize) {
                submitSolution();
            }
        }
    }

    // Start a new game
    function startGame() {
        initializeChessboard();
        const randomRow = Math.floor(Math.random() * chessboardSize);
        const randomCol = Math.floor(Math.random() * chessboardSize);
        const playerName = txtPlayerName.value.trim();
        currentPlayer = playerName !== '' ? playerName : 'Player';
        moves = 1;

        board[randomRow][randomCol] = moves;
        createChessboard();
    }

    // Reset the game
    function resetGame() {
        initializeChessboard();
        createChessboard();
        txtPlayerName.value = '';
        currentPlayer = '';
        moves = 0;
        resultMsg.textContent = '';
    }

    // Handle submission of the solution
    function submitSolution() {
        if (moves === chessboardSize * chessboardSize && currentPlayer !== '') {
            localStorage.setItem(currentPlayer, 'Solved');

            const data = {
                playerName: currentPlayer,
                moves: board.slice() // Copy the board to store moves
            };

            fetch('/storeMoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            resultMsg.textContent = `${currentPlayer} solved the Knight's Tour problem!`;
        } else {
            resultMsg.textContent = 'Invalid submission. Complete the tour first.';
        }
    }


    btnStart.addEventListener('click', startGame);
    btnReset.addEventListener('click', resetGame);
    btnSubmit.addEventListener('click', submitSolution);

    initializeChessboard();
    createChessboard();
}
