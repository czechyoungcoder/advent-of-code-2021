const fs = require("fs");
const input = fs.readFileSync("input.in", "utf-8").trim().split("\r\n");

const winning = input[0].split(",");
let boards = [];
for (let line = 1; line < input.length; line++) {
  if (input[line] == "") boards.push([]);
  else {
    boards[boards.length - 1].push(input[line].split(" ").map(Number));
  }
}
