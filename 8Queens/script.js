const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

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
  let x = (event.clientX - (event.clientX % 50)) / 50;
  let y = (event.clientY - (event.clientY % 50)) / 50;

  if(x < 8 && y < 8){ // for place a queen
    if (cells[y][x] != true) {
      ctx.fillStyle = "red";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x * 50 + 25, y * 50 + 25, 20, 0, Math.PI * 2);
      ctx.fill();
      cells[y][x] = true;

    } else {          // for replace the queen
      if((x+y)%2==0) ctx.fillStyle = "black";
      else ctx.fillStyle = "yellow"
      ctx.fillRect(x*50, y*50, 50, 50);
      cells[y][x] = false;
    }
  }

  console.log(cells);
});
