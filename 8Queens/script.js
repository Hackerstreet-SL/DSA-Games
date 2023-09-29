import { createConnection } from 'mysql';

// Configure MySQL Database Connection
const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eightqueens'
});

// Connect to the eightsqueen database 
db.connect((error) => {
  if (error) {
    console.error('Cannot connect to the Database', error);
    return;
  }
  console.log('Connect to the Database Successfully');
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let board_size = 8;

const cells = new Array(8).fill(null).map(() => new Array(8).fill(false));
console.log(cells);

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

  let x = ((event.clientX - canvasPosition.left) - ((event.clientX - canvasPosition.left) % 50)) / 50;
  let y = ((event.clientY - canvasPosition.top) - ((event.clientY - canvasPosition.top) % 50)) / 50;

  if (
    N_isSafe(y, x) &&
    NE_isSafe(y, x) &&
    E_isSafe(y, x) &&
    SE_isSafe(y, x) &&
    S_isSafe(y, x) &&
    SW_isSafe(y, x) &&
    W_isSafe(y, x) &&
    NW_isSafe(y, x)
  ) {
    if (x < 8 && y < 8) {
      if (cells[y][x] != true) {
        
        // Insert the queen moves into queens_moves
        const query = 'INSERT INTO queens_moves (x, y) VALUES (?, ?)';
        db.query(query, [x, y], (error, results)=>{
          if(error){
            console.error('Cannot insert data into queens_moves table:',error);
          } else{
            console.log('Insert into queens_moves table successfully',results);
          }
        });

        // for place the queen
        ctx.fillStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(x * 50 + 25, y * 50 + 25, 20, 0, Math.PI * 2);
        ctx.fill();
        cells[y][x] = true;
      } else {
        // for replace the queen
        if ((x + y) % 2 == 0) ctx.fillStyle = "black";
        else ctx.fillStyle = "yellow";
        ctx.fillRect(x * 50, y * 50, 50, 50);
        cells[y][x] = false;
      }
    }
  }

  console.log(cells);
});

function N_isSafe(y, x) {
  for (let i = y; i >= 0; i--) {
    if (cells[i][x] == true) {
      console.log("North is not safe");
      return false;
      break;
    }
  }
  return true;
}
function NE_isSafe(y, x) {
  for (let i = 0; i < board_size; i++) {
    if (y - i < 0 || x + i > board_size) break;
    if (cells[y - i][x + i] == true) {
      console.log("NorthEast is not safe");
      return false;
      break;
    }
  }
  return true;
}
function E_isSafe(y, x) {
  for (let i = x; i < board_size; i++) {
    if (cells[y][i] == true) {
      console.log("East is not safe");
      return false;
      break;
    }
  }
  return true;
}
function SE_isSafe(y, x) {
  for (let i = 0; i < board_size; i++) {
    if (x + i >= board_size || y + i >= board_size) break;
    if (cells[y + i][x + i] == true) {
      console.log("SouthEast is not safe");
      return false;
      break;
    }
  }
  return true;
}
function S_isSafe(y, x) {
  for (let i = y; i < board_size; i++) {
    if (cells[i][x] == true) {
      console.log("South is not safe");
      return false;
      break;
    }
  }
  return true;
}
function SW_isSafe(y, x) {
  for (let i = 0; i < board_size; i++) {
    if (y + i >= board_size || x - i < 0) break;
    if (cells[y + i][x - i] == true) {
      console.log("SouthWest is not safe");
      return false;
      break;
    }
  }
  return true;
}
function W_isSafe(y, x) {
  for (let i = x; i >= 0; i--) {
    if (cells[y][i] == true) {
      console.log("West is not safe");
      return false;
      break;
    }
  }
  return true;
}
function NW_isSafe(y, x) {
  for (let i = 0; i < board_size; i++) {
    if (y - i < 0 || x - i < 0) break;
    if (cells[y - i][x - i] == true) {
      console.log("NorthWest is not safe");
      return false;
      break;
    }
  }
  return true;
}

// Close the database connection 
process.on('exit',()=>{
  db.end();
})