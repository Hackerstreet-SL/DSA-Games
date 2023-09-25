const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

admin_mode = false;
let game_over = false;
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

/**
 * After player make his move
 * This function will executes
 */
function computersTime () {
  win_position = logic();
  console.log(win_position)
  if ( win_position!=null || win_position != undefined ) {
    insertImage("O", win_position[0], win_position[1])
    logic();

  } else if (win_position == undefined ) {
    unfilled_count = boardIsFull()
    console.log(unfilled_count.length)
    if ( unfilled_count.length!=9 && unfilled_count.length!=0 ) {
      const random = Math.floor(Math.random() * unfilled_count.length)
      let random_cell = unfilled_count[random][0]
      insertImage("O", random_cell[1], random_cell[0])
      logic();
    }
    else if ( unfilled_count.length==9 ) {
      game_over=true;
    }
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

  // XsAndOs[y][x] = icon;
  // XsAndOs.map((e)=>{
  //   console.log(e)
  // })
}

function drawLine (cells) {
  const from = cells[0]
  const to = cells[2]
  game_over = true

  console.log('from', from, 'to', to)

  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(from[0]*100+50, from[1]*100+50);
  ctx.lineTo(to[0]*100+50, to[1]*100+50);
  ctx.stroke(); 
}


function logic () {
  let win_position = []

  win_position = Verticle_Zero("O")
  if( win_position != null )
    return win_position;
  win_position = Verticle_One("O")
  if ( win_position != null )
    return win_position;
  win_position = Verticle_Two("O")
  if ( win_position != null )
    return win_position;
  win_position = Horizontal_Zero("O")
  if ( win_position != null )
    return win_position
  win_position = Horizontal_One("O")
  if ( win_position != null )
    return win_position
  win_position = Horizontal_Two("O")
  if ( win_position != null )
    return win_position
  win_position = Left_Angle("O")
  if ( win_position != null )
    return win_position
  win_position = Right_Angle("O")
  if ( win_position != null )
    return win_position

  win_position = Verticle_Zero("X")
  if( win_position != null )
    return win_position;
  win_position = Verticle_One("X")
  if ( win_position != null )
    return win_position;
  win_position = Verticle_Two("X")
  if ( win_position != null )
    return win_position;
  win_position = Horizontal_Zero ("X")
  if ( win_position != null )
    return win_position
  win_position = Horizontal_One  ("X")
  if ( win_position != null )
    return win_position
  win_position = Horizontal_Two  ("X")
  if ( win_position != null )
    return win_position
  win_position = Left_Angle      ("X")
  if ( win_position != null )
    return win_position
  win_position = Right_Angle     ("X")
  if ( win_position != null )
    return win_position
}

// return array cell


function Verticle_Zero (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][0]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][0]==null) return [0,i]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][0]!=null) line_cells.push([0,i])
    }
    drawLine(line_cells)
  }
  return null
}

function Verticle_One (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][1]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][1]==null) return [1,i]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][1]!=null) line_cells.push([1,i])
    }
    drawLine(line_cells)
  }
  return null
}

function Verticle_Two (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][2]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][2]==null) return [2,i]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][2]!=null) line_cells.push([2,i])
    }
    drawLine(line_cells)
  }
  return null
}

function Horizontal_Zero (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[0][i]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[0][i]==null) return [i,0]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[0][i]!=null) line_cells.push([i,0])
    }
    drawLine(line_cells)
  }
  return null
}

function Horizontal_One (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[1][i]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[1][i]==null) return [i,1]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[1][i]!=null) line_cells.push([i,1])
    }
    drawLine(line_cells)
  }
  return null
}

function Horizontal_Two (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[2][i]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[2][i]==null) return [i,2]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[2][i]!=null) line_cells.push([i,2])
    }
    drawLine(line_cells)
  }
  return null
}

function Left_Angle (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][i]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][i]==null) return [i,i]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[i][i]!=null) line_cells.push([i,i])
    }
    drawLine(line_cells)
  }
  return null
}

function Right_Angle (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[2-i][i]===key) count ++;
  }
  if (count==2) {
    for (let i=0; i<3; i++) {
      if (XsAndOs[2-i][i]==null) return [i,2-i]
    }

  } else if (count==3) {
    const line_cells = []
    for (let i=0; i<3; i++) {
      if (XsAndOs[2-i][i]!=null) line_cells.push([i,2-i])
    }
    drawLine(line_cells)
  }
}





document.addEventListener("mousedown", function (event) {
  let canvasPosition = canvas.getBoundingClientRect();

  let x = ((event.clientX-canvasPosition.left) - ((event.clientX-canvasPosition.left) % 100)) / 100;
  let y = ((event.clientY-canvasPosition.top) - ((event.clientY-canvasPosition.top) % 100)) / 100;
  
  if (XsAndOs[y][x]==null && !game_over) {
    if (admin_mode) {
      insertImage("O", x, y)
    
    } else {
      insertImage("X", x, y)
    }
    computersTime();
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