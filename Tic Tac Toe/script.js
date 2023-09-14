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
  XsAndOs.map((e)=>{
    console.log(e)
  })
}


function logic () {
  Verticle_Zero   ("X")
  Verticle_One    ("X")
  Verticle_Two    ("X")
  Horizontal_Zero ("X")
  Horizontal_One  ("X")
  Horizontal_Two  ("X")
  Left_Angle      ("X")
  Right_Angle     ("X")
}

function Verticle_Zero (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][0]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Verticle_Zero')
}

function Verticle_One (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][1]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Verticle_One')
}

function Verticle_Two (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][2]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Verticle_Two')
}

function Horizontal_Zero (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[0][i]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Horizontal_Zero')
}

function Horizontal_One (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[1][i]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Horizontal_One')
}

function Horizontal_Two (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[2][i]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Horizontal_Two')
}

function Left_Angle (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[i][i]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Left_Angle')
}

function Right_Angle (key) {
  count = 0;
  for (let i=0; i<3; i++) {
    if (XsAndOs[2-i][i]===key) count ++;
  }
  if (count==2) console.log(key + ' Can Won from Right_Angle')
}




document.addEventListener("mousedown", function (event) {
  let canvasPosition = canvas.getBoundingClientRect();

  let x = ((event.clientX-canvasPosition.left) - ((event.clientX-canvasPosition.left) % 100)) / 100;
  let y = ((event.clientY-canvasPosition.top) - ((event.clientY-canvasPosition.top) % 100)) / 100;
  
  if (XsAndOs[y][x]==null) {
    if (admin_mode) {
      insertImage("O", x, y)
    
    } else {
      insertImage("X", x, y)
    }
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