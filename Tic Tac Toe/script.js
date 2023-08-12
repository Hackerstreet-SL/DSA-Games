const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const icon_x = new Image();
icon_x.src = './Images/icon-x.png';

icon_x.onload = function() {
  ctx.drawImage(icon_x, 15, 12, 100, 110, 25, 25, 150, 150, 0, 0);  
}

const icon_o = new Image();
icon_o.src = './Images/icon-o.png';

icon_o.onload = function() {
  ctx.drawImage(icon_o, 5, 1, 160, 170, 225, 225, 150, 150, 0, 0);  
}

ctx.strokeStyle = "black"; // Set the line color
ctx.lineWidth = 2; // Set the line width
ctx.beginPath();
ctx.moveTo(0, 100);     // Starting point (x, y)
ctx.lineTo(300, 100);   // Ending point (x, y)
ctx.stroke();           // Stroke the line

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