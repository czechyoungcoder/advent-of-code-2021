const fs = require("fs");
const { addListener } = require("process");

let input = fs.readFileSync("input.in", "utf-8").split("\r\n");
input = input.map((line) => line.split(" -> "));
const obj = {};
let overlaps = new Set();

function addLine(x1, y1, x2, y2) {
  if (x1 !== x2 && y1 !== y2) {
    const range = Math.abs(x1 - x2);
    for (let i = 0; i <= range; i++) {
      const newX = Math.max(x1, x2) === x1 ? x1 - i : x1 + i;
      const newY = Math.max(y1, y2) === y1 ? y1 - i : y1 + i;
      if (obj[newY]) {
        if (obj[newY].includes(newX)) {
          overlaps.add(`${newY}-${newX}`);
        }
        obj[newY].push(newX);
      } else {
        obj[newY] = [newX];
      }
    }
  } else {
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
}

for (let line = 0, len = input.length; line < len; line++) {
  const [x1, y1, x2, y2] = [...input[line][0].split(","), ...input[line][1].split(",")].map(Number);
  addLine(x1, y1, x2, y2);
}

console.log(overlaps.size);
