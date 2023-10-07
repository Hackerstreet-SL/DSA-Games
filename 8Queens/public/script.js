if (typeof document !== "undefined") {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const submit_button = document.getElementById("submit");
  const game_status = document.getElementById("game_status");
  const txt_player_name = document.getElementById("player-name");

  let board_size = 8;

  const cells = new Array(8).fill(null).map(() => new Array(8).fill(false));
  console.log(cells);
  let queens = new Array(8).fill(null);
  let markedCount = 0;

  let color = true;

  for (let i = 0; i < 400; i += 50) {
    for (let j = 0; j < 400; j += 50) {
      if (color) ctx.fillStyle = "black";
      else ctx.fillStyle = "yellow";
      ctx.fillRect(i, j, 50, 50);
      color = !color;
    }
    color = !color;
  }

  document.addEventListener("mousedown", function (event) {
    let canvasPosition = canvas.getBoundingClientRect();

    let x =
      (event.clientX -
        canvasPosition.left -
        ((event.clientX - canvasPosition.left) % 50)) /
      50;
    let y =
      (event.clientY -
        canvasPosition.top -
        ((event.clientY - canvasPosition.top) % 50)) /
      50;

    if (x < 8 && y < 8) {
      if (cells[y][x] != true) {
        // for place the queen
        ctx.fillStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(x * 50 + 25, y * 50 + 25, 20, 0, Math.PI * 2);
        ctx.fill();
        cells[y][x] = true;
        queens[y] = x;
        markedCount++;
      } else {
        // for replace the queen
        if ((x + y) % 2 == 0) ctx.fillStyle = "black";
        else ctx.fillStyle = "yellow";
        ctx.fillRect(x * 50, y * 50, 50, 50);
        cells[y][x] = false;
        queens[y] = null;
        markedCount--;
      }
    }

    // console.log(cells);
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "Alt") {
      console.log(solutions(0));
    }
  });

  submit_button.addEventListener("click", function () {
    console.log("Submit");
    let isSafe = true;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (cells[i][j] == true) {
          if (!isDiagonalSafe(i, j) || !isStraightSafe(i, j)) {
            isSafe = false;
            break;
          }
        }
      }
      if (!isSafe) break;
    }
    if (markedCount === 8) {
      console.log("Is safe:", isSafe);
      if (isSafe === true) {
        const playerName = txt_player_name.value;
        const moves = queens;

        checkExistMoves(playerName, moves);
        //game_status.textContent = 'You Won !' + txt_player_name.value;
      } else game_status.textContent = "Try Again" + txt_player_name.value;
    } else {
      game_status.textContent = "You need to mark 8 queens to click submit";
      console.log("Is safe:", isSafe);
    }
  });

  function checkExistMoves(playerName, moves) {
    fetch("/storeQueenMoves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerName: playerName,
        moves: moves,
      }),
    })
      .then((response) => {
        if (response.status === 409) {
          return response.json().then((data) => {
            // throw new Error(data.message);
            console.log(data.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.message);
        game_status.textContent = "Data saved successfully for " + playerName;
        getPlayerData();
      })
      .catch((error) => {
        console.error("Error:", error);
        //game_status.textContent = 'Failed to save data for ' + playerName;
        game_status.textContent = "Moves already exist for another player";
      });
  }

  // function storePlayerData(playerName, moves) {
  //     fetch('/storeQueenMoves', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //             playerName: playerName,
  //             moves: moves,
  //         }),
  //     })
  //         .then((response) => response.json())
  //         .then((data) => {
  //             console.log(data.message);
  //             game_status.textContent = 'Data saved successfully for ' + playerName;
  //             getPlayerData();
  //         })
  //         .catch((error) => {
  //             console.error('Error:', error);
  //             game_status.textContent = 'Failed to save data for ' + playerName;
  //         });
  // }

  function getPlayerData() {
    fetch("/getQueenMoves")
      .then((response) => response.json())
      .then((data) => {
        const players = data.players;
        console.log("Player data:", players);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function solutions(row) {
    let allPossibleCases = [];

    if (row === board_size) {
      // Found a solution, clone the queens array and add it to allPossibleCases
      allPossibleCases.push([...queens]);
      return allPossibleCases;
    }

    for (let col = 0; col < board_size; col++) {
      if (isSafe(row, col)) {
        queens[row] = col;
        const solutionsForNextRow = solutions(row + 1);
        allPossibleCases.push(...solutionsForNextRow);
        queens[row] = null;
      }
    }

    return allPossibleCases;
  }

  function isSafe(row, col) {
    return isDiagonalSafe(row, col) && isStraightSafe(row, col);
  }

  function isDiagonalSafe(row, col) {
    for (let i = 0; i < row; i++) {
      if (
        queens[i] !== null &&
        Math.abs(row - i) === Math.abs(col - queens[i])
      ) {
        return false;
      }
    }
    return true;
  }

  function isStraightSafe(row, col) {
    // Check horizontally
    for (let i = 0; i < col; i++) {
      if (queens[row] !== null && queens[row] === i) {
        return false;
      }
    }

    // Check vertically
    for (let i = 0; i < row; i++) {
      if (queens[i] !== null && queens[i] === col) {
        return false;
      }
    }

    return true;
  }
}
