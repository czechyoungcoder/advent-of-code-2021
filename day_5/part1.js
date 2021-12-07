const fs = require("fs");
const { addListener } = require("process");

let input = fs.readFileSync("input.in", "utf-8").split("\r\n");
input = input.map((line) => line.split(" -> "));
const obj = {};
let overlaps = new Set();

function addLine(x1, y1, x2, y2) {
  if (x1 !== x2 && y1 !== y2) return;

  let verticalLine = false;
  if (x1 === x2) verticalLine = true;

  const start = verticalLine ? Math.min(y1, y2) : Math.min(x1, x2);
  const end = verticalLine ? Math.max(y1, y2) : Math.max(x1, x2);

  for (let point = start; point <= end; point++) {
    if (verticalLine) {
      if (obj[point]) {
        if (obj[point].includes(x1)) {
          overlaps.add(`${point}-${x1}`);
        }
        obj[point].push(x1);
      } else {
        obj[point] = [x1];
      }
    } else {
      if (obj[y1]) {
        if (obj[y1].includes(point)) {
          overlaps.add(`${y1}-${point}`);
        }
        obj[y1].push(point);
      } else {
        obj[y1] = [point];
      }
    }
  }
}

for (let line = 0, len = input.length; line < len; line++) {
  const [x1, y1, x2, y2] = [...input[line][0].split(","), ...input[line][1].split(",")].map(Number);
  addLine(x1, y1, x2, y2);
}

console.log(overlaps.size);
